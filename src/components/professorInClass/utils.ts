import { EngagementData, StudentCourseSession } from './types';

export const GRAPH_BUCKET_TIME_SIZE = 0.25 * 60 * 1000;

export const clampDateToBucket = (d: Date): Date => {
    const remainder = d.getTime() % GRAPH_BUCKET_TIME_SIZE;
    return new Date(d.getTime() - remainder);
};

export const findLatestDisconnectTime = (sessions: StudentCourseSession[]): Date | undefined => {
    let last: Date | undefined = undefined;
    for (let session of sessions) {
        if (session.disconnectedTime) {
            const disconnectTime = new Date(session.disconnectedTime);
            if (!last) {
                last = disconnectTime;
            } else if (disconnectTime.getTime() > last.getTime()) {
                last = disconnectTime;
            }
        }
    }

    return last;
};

export type ByDeviceAndStudentId = {
    [device: string]: {
      [studentId: string]: StudentCourseSession[],
    },
  };

export const transformIndividualStudentSessionsIntoPoints = (studentSessions: StudentCourseSession[], isDesktop: boolean, startingTimePoint: Date, endTimePoint: Date): EngagementData[] => {

    const connectedRanges: Array<{ start: Date, end?: Date }> = [];
    for (let session of studentSessions) {
        const start = clampDateToBucket(new Date(session.connectedTime));
        const end = session.disconnectedTime ? clampDateToBucket(new Date(session.disconnectedTime)) : undefined;

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

    for (let timePoint = startingTimePoint.getTime(); timePoint <= endTimePoint.getTime(); timePoint += GRAPH_BUCKET_TIME_SIZE) {
        const range = connectedRanges[connectedRangePointer];
        if (!range || timePoint < range.start.getTime()) {
            bucketedData.push({
                time: timePoint,
                disconnects: !hasConnected ? 1 : 0,
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

        if (range && (!range.end || range.end.getTime() === timePoint)) {
            connectedRangePointer++;
        }
    }
    console.log(bucketedData);
    return bucketedData;
};

export const flattenAndTotalEngagmentData = (bucketedData: EngagementData[][]): EngagementData[] => {
    return bucketedData[0].map((firstPoint, index) => {
        return bucketedData.map(l => l[index]).reduce((accum, point) => {
            accum.disconnects += point.disconnects;
            accum.mobilesConnected += point.mobilesConnected;
            accum.desktopsConnected += point.desktopsConnected;

            return point;
        }, {
            ...firstPoint,
        });
    });
};
