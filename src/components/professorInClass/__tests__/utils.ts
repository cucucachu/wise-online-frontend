import {createEngagementPointsForCourseSession} from '../utils';

describe('createEngagementPointsForCourseSession', () => {
  it('should return the correct points for one studnet session', () => {
    const courseSession = {
        "id": "62dee14c2f2e99cc87b63b34",
        "classId": "HEMC303",
        "keyCode": "6270",
        "allowedUrls": [],
        "startTime": "2022-07-25T19:00:36.270Z",
        "endTime": "2022-07-25T19:10:36.270Z",
        "course": {
            "name": "HEMC303",
            "classId": "HEMC303",
            "isInSession": true,
            "accessCode": "9090",
            "defaultAttendanceTrackingDelay": 1,
            "defaultAttendanceThreshold": 99,
            "professor": "6295104e179a36471be6642c",
            "term": "6295104e179a36471be6642b",
            "students": [
                "6295104f179a36471be66436"
            ],
            "courseSessions": [
                "62dee14c2f2e99cc87b63b34"
            ],
            "_id": "62dee0862f2e99cc87b63b33"
        },
        "students": [
            {
                "studentId": "WA2student1",
                "firstName": "Student",
                "lastName": "WAO1",
                "agreedToTerms": true,
                "email": "student1@wiseattend2.com",
                "school": "6295104e179a36471be66429",
                "courses": [
                    "62a4e7ddc52e250a6de88eb3",
                    "62a7dbaca0e11b3eaaa71f1f",
                    "62decfb46899e35d684e98c6",
                    "62ded42fed944cb1a3135ee7",
                    "62dedc7b2f2e99cc87b63b32",
                    "62dee0862f2e99cc87b63b33"
                ],
                "_id": "6295104f179a36471be66436"
            }
        ],
        "studentCourseSessions": [
            {
                "socketId": "v8-15T7foM5FAVpnAAAB",
                "connectedTime": "2022-07-25T19:02:03.581Z",
                "disconnectedTime": "2022-07-25T19:08:39.647Z",
                "device": "web",
                "courseSession": "62dee14c2f2e99cc87b63b34",
                "student": "6295104f179a36471be66436",
                "_id": "62dee9232f2e99cc87b63b35"
            }
        ]
    };

    const result = createEngagementPointsForCourseSession(courseSession);
    expect(result).toEqual([
      {
        "time": 1658775630000,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0
      },
      {
        "time": 1658775645000,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0
      },
      {
        "time": 1658775660000,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0
      },
      {
        "time": 1658775675000,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0
      },
      {
        "time": 1658775690000,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0
      },
      {
        "time": 1658775705000,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0
      },
      {
        "time": 1658775720000,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 1
      },
      {
        "time": 1658775735000,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 1
      },
      {
        "time": 1658775750000,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 1
      },
      {
        "time": 1658775765000,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 1
      },
      {
        "time": 1658775780000,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 1
      },
      {
        "time": 1658775795000,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 1
      },
      {
        "time": 1658775810000,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 1
      },
      {
        "time": 1658775825000,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 1
      },
      {
        "time": 1658775840000,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 1
      },
      {
        "time": 1658775855000,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 1
      },
      {
        "time": 1658775870000,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 1
      },
      {
        "time": 1658775885000,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 1
      },
      {
        "time": 1658775900000,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 1
      },
      {
        "time": 1658775915000,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 1
      },
      {
        "time": 1658775930000,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 1
      },
      {
        "time": 1658775945000,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 1
      },
      {
        "time": 1658775960000,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 1
      },
      {
        "time": 1658775975000,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 1
      },
      {
        "time": 1658775990000,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 1
      },
      {
        "time": 1658776005000,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 1
      },
      {
        "time": 1658776020000,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 1
      },
      {
        "time": 1658776035000,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 1
      },
      {
        "time": 1658776050000,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 1
      },
      {
        "time": 1658776065000,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 1
      },
      {
        "time": 1658776080000,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 1
      },
      {
        "time": 1658776095000,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 1
      },
      {
        "time": 1658776110000,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 1
      },
      {
        "time": 1658776125000,
        "disconnects": 1,
        "mobilesConnected": 0,
        "desktopsConnected": 0
      },
      {
        "time": 1658776140000,
        "disconnects": 1,
        "mobilesConnected": 0,
        "desktopsConnected": 0
      },
      {
        "time": 1658776155000,
        "disconnects": 1,
        "mobilesConnected": 0,
        "desktopsConnected": 0
      },
      {
        "time": 1658776170000,
        "disconnects": 1,
        "mobilesConnected": 0,
        "desktopsConnected": 0
      },
      {
        "time": 1658776185000,
        "disconnects": 1,
        "mobilesConnected": 0,
        "desktopsConnected": 0
      },
      {
        "time": 1658776200000,
        "disconnects": 1,
        "mobilesConnected": 0,
        "desktopsConnected": 0
      },
      {
        "time": 1658776215000,
        "disconnects": 1,
        "mobilesConnected": 0,
        "desktopsConnected": 0
      },
      {
        "time": 1658776230000,
        "disconnects": 1,
        "mobilesConnected": 0,
        "desktopsConnected": 0
      },
    ]);
  });

  it('should return the correct points for one student session for an in-progress class', () => {
    const startDate = new Date();
    startDate.setMinutes(startDate.getMinutes() - 5, 0, 0);

    const studentStartDate = new Date(startDate);
    studentStartDate.setMinutes(studentStartDate.getMinutes() + 2);

    const courseSession = {
        "id": "62dee14c2f2e99cc87b63b34",
        "classId": "HEMC303",
        "keyCode": "6270",
        "allowedUrls": [],
        "startTime": startDate.toISOString(),
        "course": {
            "name": "HEMC303",
            "classId": "HEMC303",
            "isInSession": true,
            "accessCode": "9090",
            "defaultAttendanceTrackingDelay": 1,
            "defaultAttendanceThreshold": 99,
            "professor": "6295104e179a36471be6642c",
            "term": "6295104e179a36471be6642b",
            "students": [
                "6295104f179a36471be66436"
            ],
            "courseSessions": [
                "62dee14c2f2e99cc87b63b34"
            ],
            "_id": "62dee0862f2e99cc87b63b33"
        },
        "students": [
            {
                "studentId": "WA2student1",
                "firstName": "Student",
                "lastName": "WAO1",
                "agreedToTerms": true,
                "email": "student1@wiseattend2.com",
                "school": "6295104e179a36471be66429",
                "courses": [
                    "62a4e7ddc52e250a6de88eb3",
                    "62a7dbaca0e11b3eaaa71f1f",
                    "62decfb46899e35d684e98c6",
                    "62ded42fed944cb1a3135ee7",
                    "62dedc7b2f2e99cc87b63b32",
                    "62dee0862f2e99cc87b63b33"
                ],
                "_id": "6295104f179a36471be66436"
            }
        ],
        "studentCourseSessions": [
            {
                "socketId": "v8-15T7foM5FAVpnAAAB",
                "connectedTime": studentStartDate.toISOString(),
                "device": "web",
                "courseSession": "62dee14c2f2e99cc87b63b34",
                "student": "6295104f179a36471be66436",
                "_id": "62dee9232f2e99cc87b63b35"
            }
        ]
    };

    const result = createEngagementPointsForCourseSession(courseSession, 60).map(r => {
      return {
        ...r,
        time: (r.time - startDate.getTime()) / 1000,
      }
    });

    expect(result).toEqual([
      {
        "time": 0,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 60,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 120,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 1,
      },
      {
        "time": 180,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 1,
      },
      {
        "time": 240,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 1,
      },
      {
        "time": 300,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 1,
      },
      {
        "time": 360,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 420,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 480,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 540,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 600,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 660,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 720,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 780,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 840,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 900,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 960,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 1020,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 1080,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 1140,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 1200,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 1260,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 1320,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 1380,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 1440,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 1500,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 1560,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 1620,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 1680,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 1740,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 1800,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 1860,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 1920,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 1980,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 2040,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 2100,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 2160,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 2220,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 2280,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 2340,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 2400,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 2460,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 2520,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 2580,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 2640,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 2700,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 2760,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 2820,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 2880,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 2940,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 3000,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 3060,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 3120,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 3180,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 3240,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 3300,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 3360,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 3420,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 3480,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 3540,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      },
      {
        "time": 3600,
        "disconnects": 0,
        "mobilesConnected": 0,
        "desktopsConnected": 0,
      }
    ]);
  });
});
