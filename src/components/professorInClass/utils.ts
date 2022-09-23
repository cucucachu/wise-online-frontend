import { differenceInMinutes, addMinutes } from "date-fns";
import { InClassFlagAction } from "../../types";
import {
  GroupedDeviceActivities,
  CourseSession,
  EngagementData,
  StudentCourseSession,
  StudentCourseSessionScreenshotDetail,
  GroupedFlaggedURLS,
} from "./types";

export const getGroupedDeviceActivities = (
  courseSession: CourseSession,
  studentCourseSessions: StudentCourseSession[]
): GroupedDeviceActivities[] => {
  const groupedByDevice = studentCourseSessions.reduce(
    (accum, studentCourseSession) => {
      if (!accum[studentCourseSession.device]) {
        accum[studentCourseSession.device] = [];
      }

      accum[studentCourseSession.device].push(studentCourseSession);

      return accum;
    },
    {} as { [device: string]: StudentCourseSession[] }
  );

  return Object.entries(groupedByDevice).map(
    ([device, studentCourseSessions]) => {
      const sortedStudentCourseSessions = [...studentCourseSessions].sort(
        (a, b) => {
          return (
            new Date(a.connectedTime).getTime() -
            new Date(b.connectedTime).getTime()
          );
        }
      );

      const disconnectIntervals: GroupedDeviceActivities["intervals"] = [];
      let [prevStudentCourseSession, ...restStudentCourseSessions] =
        sortedStudentCourseSessions;
      if (prevStudentCourseSession) {
        for (let studentCourseSession of restStudentCourseSessions) {
          const prevDisconnectedTime = prevStudentCourseSession.disconnectedTime
            ? new Date(prevStudentCourseSession.disconnectedTime)
            : undefined;
          if (
            prevDisconnectedTime!.getTime() <
            new Date(studentCourseSession.connectedTime).getTime()
          ) {
            disconnectIntervals.push({
              start: prevDisconnectedTime!,
              end: new Date(studentCourseSession.connectedTime),
            });

            prevStudentCourseSession = studentCourseSession;
          }
        }

        if (
          prevStudentCourseSession.disconnectedTime &&
          new Date(prevStudentCourseSession.disconnectedTime).getTime() <
            new Date(courseSession.endTime!).getTime()
        ) {
          disconnectIntervals.push({
            start: new Date(prevStudentCourseSession.disconnectedTime),
            end: new Date(courseSession.endTime!),
          });
        }
      }

      return {
        flagType: "device-disconnect",
        device,
        intervals: disconnectIntervals,
      };
    }
  );
};

export const getGrouppedFlaggedUrlsFromCourseSessions = (
  studentCourseSessions: StudentCourseSession[]
): GroupedFlaggedURLS[] => {
  const screenshotDetails = studentCourseSessions.reduce(
    (grouppedList, studentCourseSession) => {
      return grouppedList.concat(
        studentCourseSession.screenshotDetails.filter((detail) => {
          return !!detail.unknownDomains;
        })
      );
    },
    [] as StudentCourseSessionScreenshotDetail[]
  );

  const groupedScreenshotDetails = screenshotDetails.reduce(
    (accum, screenshotDetail) => {
      for (let url of screenshotDetail.unknownDomains) {
        if (!accum[url]) {
          accum[url] = [];
        }

        accum[url].push(screenshotDetail);
      }

      return accum;
    },
    {} as { [url: string]: StudentCourseSessionScreenshotDetail[] }
  );

  return Object.entries(groupedScreenshotDetails).map(
    ([url, screenshotDetails]) => {
      screenshotDetails.sort((a, b) => {
        return (
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
      });

      return {
        flagType: "blocked-url",
        url,
        intervals: screenshotDetails.reduce(
          (finalIntervals, screenshotDetail) => {
            const screenshotTimeStamp = new Date(screenshotDetail.timestamp);

            const previousEntry = finalIntervals[finalIntervals.length - 1];
            if (
              previousEntry &&
              differenceInMinutes(screenshotTimeStamp, previousEntry.end) < 2
            ) {
              previousEntry.end = screenshotTimeStamp;
            } else {
              finalIntervals.push({
                screenshotDetailId: screenshotDetail._id,
                start: screenshotTimeStamp,
                end: addMinutes(screenshotTimeStamp, 1),
              });
            }

            return finalIntervals;
          },
          [] as GroupedFlaggedURLS["intervals"]
        ),
      };
    }
  );
};

const clampDateToBucket = (d: Date, bucketSizeInSeconds: number): Date => {
  const remainder = d.getTime() % (bucketSizeInSeconds * 1000);
  return new Date(d.getTime() - remainder);
};

// const findLatestDisconnectTime = (sessions: StudentCourseSession[]): Date | undefined => {
//     let last: Date | undefined = undefined;
//     for (let session of sessions) {
//         if (session.disconnectedTime) {
//             const disconnectTime = new Date(session.disconnectedTime);
//             if (!last) {
//                 last = disconnectTime;
//             } else if (disconnectTime.getTime() > last.getTime()) {
//                 last = disconnectTime;
//             }
//         }
//     }

//     return last;
// };

export type ByDeviceAndStudentId = {
  [device: string]: {
    [studentId: string]: StudentCourseSession[];
  };
};

function* createTimePointIterator(
  startingTimePoint: Date,
  endTimePoint: Date,
  bucketSizeInSeconds: number
) {
  for (
    let timePoint = startingTimePoint.getTime();
    timePoint <= endTimePoint.getTime();
    timePoint += bucketSizeInSeconds * 1000
  ) {
    yield timePoint;
  }

  return;
}

export const createEmptyEngagementPoints = (
  startingTimePoint: Date,
  endTimePoint: Date,
  bucketSizeInSeconds: number
): EngagementData[] => {
  const bucketedData: EngagementData[] = [];

  for (let timePoint of createTimePointIterator(
    startingTimePoint,
    endTimePoint,
    bucketSizeInSeconds
  )) {
    bucketedData.push({
      time: timePoint,
      disconnects: 0,
      mobilesConnected: 0,
      desktopsConnected: 0,
      flaggedStudents: [],
    });
  }

  return bucketedData;
};
//
export const transformIndividualStudentSessionsIntoPoints = (
  flaggedActions: InClassFlagAction[] | undefined,
  studentId: string,
  studentSessions: StudentCourseSession[],
  isDesktop: boolean,
  startingTimePoint: Date,
  endTimePoint: Date,
  bucketSizeInSeconds: number
): EngagementData[] => {
  const connectedRanges: Array<{
    start: Date;
    end?: Date;
    hasFlaggedScreenshots: boolean;
  }> = [];
  for (let session of studentSessions) {
    const start = clampDateToBucket(
      new Date(session.connectedTime),
      bucketSizeInSeconds
    );
    const end = session.disconnectedTime
      ? clampDateToBucket(
          new Date(session.disconnectedTime),
          bucketSizeInSeconds
        )
      : undefined;

    const lastRange = connectedRanges[connectedRanges.length - 1];
    if (lastRange?.end && end && lastRange.end > end) {
      connectedRanges[connectedRanges.length - 1].end = end;
    } else {
      connectedRanges.push({
        start,
        end,
        hasFlaggedScreenshots: (session.screenshotViolations?.length ?? 0) > 0,
      });
    }
  }

  let flagDisconnects =
    (isDesktop &&
      flaggedActions?.includes(InClassFlagAction.computerDisconnected)) ||
    (!isDesktop &&
      flaggedActions?.includes(InClassFlagAction.phoneDisconnected));

  const bucketedData: EngagementData[] = [];
  let connectedRangePointer = 0;
  let hasConnected = false;
  for (let timePoint of createTimePointIterator(
    startingTimePoint,
    endTimePoint,
    bucketSizeInSeconds
  )) {
    const range = connectedRanges[connectedRangePointer];
    if (timePoint > Date.now()) {
      bucketedData.push({
        time: timePoint,
        disconnects: 0,
        mobilesConnected: 0,
        desktopsConnected: 0,
        flaggedStudents: [],
      });
    } else if (!range || timePoint < range.start.getTime()) {
      bucketedData.push({
        time: timePoint,
        disconnects: hasConnected ? 1 : 0,
        mobilesConnected: 0,
        desktopsConnected: 0,
        flaggedStudents: flagDisconnects && hasConnected ? [studentId] : [],
      });
    } else if (
      range.start.getTime() <= timePoint &&
      (!range.end || timePoint <= range.end.getTime())
    ) {
      hasConnected = true;
      bucketedData.push({
        time: timePoint,
        disconnects: 0,
        mobilesConnected: isDesktop ? 0 : 1,
        desktopsConnected: isDesktop ? 1 : 0,
        flaggedStudents: range.hasFlaggedScreenshots ? [studentId] : [],
      });
    }

    if (range && range.end?.getTime() === timePoint) {
      connectedRangePointer++;
    }
  }

  return bucketedData;
};

export const flattenAndTotalEngagmentData = (
  bucketedData: EngagementData[][]
): EngagementData[] => {
  return bucketedData[0].map((firstPoint, index) => {
    return bucketedData
      .map((l) => l[index])
      .reduce(
        (accum, point) => {
          accum.disconnects = point.disconnects > 0 ? 1 : 0;
          accum.mobilesConnected += point.mobilesConnected;
          accum.desktopsConnected += point.desktopsConnected;
          accum.flaggedStudents = accum.flaggedStudents.concat(
            point.flaggedStudents
          );

          return accum;
        },
        {
          ...firstPoint,
          disconnects: 0,
          mobilesConnected: 0,
          desktopsConnected: 0,
          flaggedStudents: [],
        }
      );
  });
};

const ONE_HOUR = 1000 * 60 * 60;
export const createEngagementPointsForCourseSession = (
  courseSession: CourseSession,
  bucketSizeInSeconds: number = 0.25 * 60
): EngagementData[] => {
  const firstStartSessionStart = clampDateToBucket(
    new Date(courseSession.startTime),
    bucketSizeInSeconds
  );
  let endDate = new Date(
    Math.max(firstStartSessionStart.getTime() + ONE_HOUR, Date.now())
  );
  if (courseSession.endTime) {
    endDate = new Date(courseSession.endTime);
  }

  const clampedLastSessionEnd = clampDateToBucket(endDate, bucketSizeInSeconds);

  if (courseSession.studentCourseSessions.length === 0) {
    return createEmptyEngagementPoints(
      firstStartSessionStart,
      clampedLastSessionEnd,
      bucketSizeInSeconds
    );
  }

  const copy = [...courseSession.studentCourseSessions].map((x) => ({
    ...x,
    epoch: new Date(x.connectedTime).getTime(),
  }));
  copy.sort((a, b) => {
    return a.epoch - b.epoch;
  });

  const courseSessionsByDeviceAndStudent =
    courseSession.studentCourseSessions.reduce(
      (byDeviceAndStudent: ByDeviceAndStudentId, studentCourseSession) => {
        if (!byDeviceAndStudent[studentCourseSession.device]) {
          byDeviceAndStudent[studentCourseSession.device] = {};
        }

        if (
          !byDeviceAndStudent[studentCourseSession.device][
            studentCourseSession.student
          ]
        ) {
          byDeviceAndStudent[studentCourseSession.device][
            studentCourseSession.student
          ] = [];
        }

        byDeviceAndStudent[studentCourseSession.device][
          studentCourseSession.student
        ].push(studentCourseSession);

        return byDeviceAndStudent;
      },
      {}
    );

  // Devices are hard coded, could be dynamic
  const bucketedStatusesForWeb = Object.entries(
    courseSessionsByDeviceAndStudent["web"] ?? {}
  ).map(([studentId, sessions]) => {
    return transformIndividualStudentSessionsIntoPoints(
      courseSession.flagTriggers,
      studentId,
      sessions,
      true,
      firstStartSessionStart,
      clampedLastSessionEnd,
      bucketSizeInSeconds
    );
  });
  const bucketedStatusesForMobile = Object.entries(
    courseSessionsByDeviceAndStudent["mobile"] ?? {}
  ).map(([studentId, sessions]) => {
    return transformIndividualStudentSessionsIntoPoints(
      courseSession.flagTriggers,
      studentId,
      sessions,
      false,
      firstStartSessionStart,
      clampedLastSessionEnd,
      bucketSizeInSeconds
    );
  });
  // console.log(bucketedStatusesForWeb);
  // console.log(bucketedStatusesForMobile, '\n\n');
  const combinedStatuses = [
    ...bucketedStatusesForWeb,
    ...bucketedStatusesForMobile,
  ];
  if (combinedStatuses.length === 0) {
    return createEmptyEngagementPoints(
      firstStartSessionStart,
      clampedLastSessionEnd,
      bucketSizeInSeconds
    );
  }

  return flattenAndTotalEngagmentData(combinedStatuses);
};
