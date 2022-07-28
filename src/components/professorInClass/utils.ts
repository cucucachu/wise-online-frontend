import { CourseSession, EngagementData, StudentCourseSession } from './types';

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
        [studentId: string]: StudentCourseSession[],
    },
};

function* createTimePointIterator(startingTimePoint: Date, endTimePoint: Date, bucketSizeInSeconds: number) {
    for (let timePoint = startingTimePoint.getTime(); timePoint <= endTimePoint.getTime(); timePoint += bucketSizeInSeconds * 1000) {
        yield timePoint;
    }

    return;
};

export const createEmptyEngagementPoints = (startingTimePoint: Date, endTimePoint: Date, bucketSizeInSeconds: number): EngagementData[] => {
    const bucketedData: EngagementData[] = [];

    for (let timePoint of createTimePointIterator(startingTimePoint, endTimePoint, bucketSizeInSeconds)) {
        bucketedData.push({
            time: timePoint,
            disconnects: 0,
            mobilesConnected: 0,
            desktopsConnected: 0,
        });
    }

    return bucketedData;
};
// 
export const transformIndividualStudentSessionsIntoPoints = (studentSessions: StudentCourseSession[], isDesktop: boolean, startingTimePoint: Date, endTimePoint: Date, bucketSizeInSeconds: number): EngagementData[] => {
    const connectedRanges: Array<{ start: Date, end?: Date }> = [];
    for (let session of studentSessions) {
        const start = clampDateToBucket(new Date(session.connectedTime), bucketSizeInSeconds);
        const end = session.disconnectedTime ? clampDateToBucket(new Date(session.disconnectedTime), bucketSizeInSeconds) : undefined;

        const lastRange = connectedRanges[connectedRanges.length - 1];
        if (lastRange?.end && end && lastRange.end > end) {
            connectedRanges[connectedRanges.length - 1].end = end;
        } else {
            connectedRanges.push({ start, end });
        }
    }

    const bucketedData: EngagementData[] = [];
    let connectedRangePointer = 0;
    let hasConnected = false;
    for (let timePoint of createTimePointIterator(startingTimePoint, endTimePoint, bucketSizeInSeconds)) {
        const range = connectedRanges[connectedRangePointer];
        if (!range || timePoint < range.start.getTime()) {
            bucketedData.push({
                time: timePoint,
                disconnects: hasConnected ? 1 : 0,
                mobilesConnected: 0,
                desktopsConnected: 0,
            });
        } else if (timePoint > Date.now()) {
            bucketedData.push({
                time: timePoint,
                disconnects: 0,
                mobilesConnected: 0,
                desktopsConnected: 0,
            });
        } else if (
            range.start.getTime() <= timePoint &&
            (
              !range.end ||
              timePoint <= range.end.getTime()
            )
        ) {
            hasConnected = true;
            bucketedData.push({
                time: timePoint,
                disconnects: 0,
                mobilesConnected: isDesktop ? 0 : 1,
                desktopsConnected: isDesktop ? 1 : 0,
            });
        }

        if (range && range.end?.getTime() === timePoint) {
            connectedRangePointer++;
        }
    }

    return bucketedData;
};

export const flattenAndTotalEngagmentData = (bucketedData: EngagementData[][]): EngagementData[] => {
    return bucketedData[0].map((firstPoint, index) => {
        return bucketedData.map(l => l[index]).reduce((accum, point) => {
            accum.disconnects += point.disconnects;
            accum.mobilesConnected += point.mobilesConnected;
            accum.desktopsConnected += point.desktopsConnected;

            return accum;
        }, {
            ...firstPoint,
            disconnects: 0,
            mobilesConnected: 0,
            desktopsConnected: 0,
        });
    });
};

const ONE_HOUR = 1000 * 60 * 60;
export const createEngagementPointsForCourseSession = (courseSession: CourseSession, bucketSizeInSeconds: number = 0.25 * 60): EngagementData[] => {
    const firstStartSessionStart = clampDateToBucket(new Date(courseSession.startTime), bucketSizeInSeconds);
    let endDate = new Date(Math.max(firstStartSessionStart.getTime() + ONE_HOUR, Date.now()));
    if (courseSession.endTime) {
        endDate = new Date(courseSession.endTime);
    }

    const clampedLastSessionEnd = clampDateToBucket(endDate, bucketSizeInSeconds);

  if (courseSession.studentCourseSessions.length === 0) {
    return createEmptyEngagementPoints(firstStartSessionStart, clampedLastSessionEnd, bucketSizeInSeconds);
  }

  const copy = [...courseSession.studentCourseSessions].map(x => ({ ...x, epoch: (new Date(x.connectedTime).getTime()) }));
  copy.sort((a, b) => {
    return a.epoch - b.epoch;
  });

  const courseSessionsByDeviceAndStudent = courseSession.studentCourseSessions.reduce((byDeviceAndStudent: ByDeviceAndStudentId, studentCourseSession) => {
    if (!byDeviceAndStudent[studentCourseSession.device]) {
      byDeviceAndStudent[studentCourseSession.device] = {};
    }

    if (!byDeviceAndStudent[studentCourseSession.device][studentCourseSession.student]) {
      byDeviceAndStudent[studentCourseSession.device][studentCourseSession.student] = [];
    }

    byDeviceAndStudent[studentCourseSession.device][studentCourseSession.student].push(studentCourseSession);

    return byDeviceAndStudent;
  }, {});
  console.log(courseSessionsByDeviceAndStudent);
    // Devices are hard coded, could be dynamic
    const bucketedStatusesForWeb = Object.values(courseSessionsByDeviceAndStudent['web'] ?? {}).map(sessions => transformIndividualStudentSessionsIntoPoints(sessions, true, firstStartSessionStart, clampedLastSessionEnd, bucketSizeInSeconds));
    const bucketedStatusesForMobile = Object.values(courseSessionsByDeviceAndStudent['mobile'] ?? {}).map(sessions => transformIndividualStudentSessionsIntoPoints(sessions, false, firstStartSessionStart, clampedLastSessionEnd, bucketSizeInSeconds));
    // console.log(bucketedStatusesForWeb);
    // console.log(bucketedStatusesForMobile, '\n\n');
    const combinedStatuses = [...bucketedStatusesForWeb, ...bucketedStatusesForMobile];
    if (combinedStatuses.length === 0) {
        return createEmptyEngagementPoints(firstStartSessionStart, clampedLastSessionEnd, bucketSizeInSeconds);
    }

    return flattenAndTotalEngagmentData(combinedStatuses)
};
