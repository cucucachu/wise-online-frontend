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

  it('should return the correct data with mobile and web', () => {
    const coureSession = {
      "courseSession": {
          "id": "62e1c612391ffe02d181e366",
          "classId": "HEMC303",
          "keyCode": "4115",
          "allowedUrls": [],
          "startTime": "2022-07-27T23:11:14.115Z",
          "endTime": null,
          "course": {
              "name": "HEMC303",
              "classId": "HEMC303",
              "isInSession": true,
              "accessCode": "9090",
              "defaultAttendanceTrackingDelay": 1,
              "defaultAttendanceThreshold": 99,
              "defaultAttendanceFlags": [
                  "computer-disconnected",
                  "phone-disconnected"
              ],
              "professor": "6295104e179a36471be6642c",
              "term": "6295104e179a36471be6642b",
              "students": [
                  "6295104f179a36471be66436"
              ],
              "courseSessions": [
                  "62dee14c2f2e99cc87b63b34",
                  "62e02c772f2e99cc87b63b8d",
                  "62e1c273391ffe02d181e35f",
                  "62e1c612391ffe02d181e366"
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
                  "socketId": "GxmXXEfm6u7s_xCCAAAD",
                  "connectedTime": "2022-07-27T23:11:48.645Z",
                  "disconnectedTime": "2022-07-27T23:12:14.579Z",
                  "device": "web",
                  "screenshots": 2,
                  "courseSession": "62e1c612391ffe02d181e366",
                  "student": "6295104f179a36471be66436",
                  "screenshotDetails": [
                      "62e1c63e391ffe02d181e368",
                      "62e1c648391ffe02d181e369"
                  ],
                  "_id": "62e1c634391ffe02d181e367"
              },
              {
                  "socketId": "HreGf8bJN5xKnDI1AAAF",
                  "connectedTime": "2022-07-27T23:12:44.823Z",
                  "device": "web",
                  "screenshots": 125,
                  "courseSession": "62e1c612391ffe02d181e366",
                  "student": "6295104f179a36471be66436",
                  "screenshotDetails": [
                      "62e1c676391ffe02d181e36b",
                      "62e1c680391ffe02d181e36c",
                      "62e1c68a391ffe02d181e36d",
                      "62e1c695391ffe02d181e36e",
                      "62e1c69e391ffe02d181e36f",
                      "62e1c6a9391ffe02d181e370",
                      "62e1c6b2391ffe02d181e371",
                      "62e1c6bc391ffe02d181e372",
                      "62e1c6c7391ffe02d181e373",
                      "62e1c6d0391ffe02d181e374",
                      "62e1c6da391ffe02d181e375",
                      "62e1c6e4391ffe02d181e376",
                      "62e1c6ee391ffe02d181e377",
                      "62e1c6f8391ffe02d181e378",
                      "62e1c703391ffe02d181e379",
                      "62e1c70c391ffe02d181e37a",
                      "62e1c716391ffe02d181e37b",
                      "62e1c720391ffe02d181e37c",
                      "62e1c72a391ffe02d181e37d",
                      "62e1c735391ffe02d181e37e",
                      "62e1c73e391ffe02d181e37f",
                      "62e1c749391ffe02d181e380",
                      "62e1c753391ffe02d181e381",
                      "62e1c75d391ffe02d181e382",
                      "62e1c767391ffe02d181e383",
                      "62e1c771391ffe02d181e384",
                      "62e1c77b391ffe02d181e385",
                      "62e1c785391ffe02d181e386",
                      "62e1c78f391ffe02d181e387",
                      "62e1c799391ffe02d181e388",
                      "62e1c7a3391ffe02d181e389",
                      "62e1c7ad391ffe02d181e38a",
                      "62e1c7b7391ffe02d181e38b",
                      "62e1c7c1391ffe02d181e38c",
                      "62e1c7cb391ffe02d181e38d",
                      "62e1c7d5391ffe02d181e38e",
                      "62e1c7df391ffe02d181e38f",
                      "62e1c7e9391ffe02d181e390",
                      "62e1c7f3391ffe02d181e391",
                      "62e1c7fd391ffe02d181e392",
                      "62e1c807391ffe02d181e393",
                      "62e1c811391ffe02d181e394",
                      "62e1c81b391ffe02d181e395",
                      "62e1c825391ffe02d181e396",
                      "62e1c82f391ffe02d181e397",
                      "62e1c839391ffe02d181e398",
                      "62e1c843391ffe02d181e399",
                      "62e1c84d391ffe02d181e39a",
                      "62e1c857391ffe02d181e39b",
                      "62e1c861391ffe02d181e39c",
                      "62e1c86b391ffe02d181e39d",
                      "62e1c875391ffe02d181e39e",
                      "62e1c87f391ffe02d181e39f",
                      "62e1c889391ffe02d181e3a0",
                      "62e1c893391ffe02d181e3a1",
                      "62e1c89d391ffe02d181e3a2",
                      "62e1c8a7391ffe02d181e3a3",
                      "62e1c8b1391ffe02d181e3a4",
                      "62e1c8bb391ffe02d181e3a5",
                      "62e1c8c5391ffe02d181e3a6",
                      "62e1c8cf391ffe02d181e3a7",
                      "62e1c8d9391ffe02d181e3a8",
                      "62e1c8e3391ffe02d181e3a9",
                      "62e1c8ed391ffe02d181e3aa",
                      "62e1c8f7391ffe02d181e3ab",
                      "62e1c901391ffe02d181e3ac",
                      "62e1c90b391ffe02d181e3ad",
                      "62e1c915391ffe02d181e3ae",
                      "62e1c91f391ffe02d181e3af",
                      "62e1c929391ffe02d181e3b0",
                      "62e1c933391ffe02d181e3b1",
                      "62e1c93d391ffe02d181e3b2",
                      "62e1c947391ffe02d181e3b3",
                      "62e1c951391ffe02d181e3b4",
                      "62e1c95b391ffe02d181e3b5",
                      "62e1c965391ffe02d181e3b6",
                      "62e1c96f391ffe02d181e3b7",
                      "62e1c979391ffe02d181e3b8",
                      "62e1c983391ffe02d181e3b9",
                      "62e1c98d391ffe02d181e3ba",
                      "62e1c997391ffe02d181e3bb",
                      "62e1c9a1391ffe02d181e3bc",
                      "62e1c9ab391ffe02d181e3bd",
                      "62e1c9b5391ffe02d181e3be",
                      "62e1c9bf391ffe02d181e3bf",
                      "62e1c9ca391ffe02d181e3c0",
                      "62e1c9d4391ffe02d181e3c1",
                      "62e1c9e0391ffe02d181e3c2",
                      "62e1c9eb391ffe02d181e3c3",
                      "62e1c9f8391ffe02d181e3c4",
                      "62e1ca03391ffe02d181e3c5",
                      "62e1ca07391ffe02d181e3c6",
                      "62e1ca16391ffe02d181e3c7",
                      "62e1ca1a391ffe02d181e3c8",
                      "62e1ca24391ffe02d181e3c9",
                      "62e1ca2e391ffe02d181e3ca",
                      "62e1ca37391ffe02d181e3cb",
                      "62e1ca41391ffe02d181e3cc",
                      "62e1ca4c391ffe02d181e3cd",
                      "62e1ca56391ffe02d181e3ce",
                      "62e1ca61391ffe02d181e3cf",
                      "62e1ca6b391ffe02d181e3d0",
                      "62e1ca74391ffe02d181e3d1",
                      "62e1ca7e391ffe02d181e3d2",
                      "62e1ca88391ffe02d181e3d3",
                      "62e1ca91391ffe02d181e3d4",
                      "62e1ca9b391ffe02d181e3d5",
                      "62e1caa5391ffe02d181e3d6",
                      "62e1caaf391ffe02d181e3d7",
                      "62e1cab9391ffe02d181e3d8",
                      "62e1cac3391ffe02d181e3d9",
                      "62e1cacd391ffe02d181e3da",
                      "62e1cad7391ffe02d181e3db",
                      "62e1cae1391ffe02d181e3dc",
                      "62e1caec391ffe02d181e3dd",
                      "62e1caf6391ffe02d181e3de",
                      "62e1cb00391ffe02d181e3df",
                      "62e1cb0a391ffe02d181e3e0",
                      "62e1cb15391ffe02d181e3e1",
                      "62e1cb1e391ffe02d181e3e2",
                      "62e1cb28391ffe02d181e3e3",
                      "62e1cb32391ffe02d181e3e4",
                      "62e1cb3c391ffe02d181e3e6",
                      "62e1cb46391ffe02d181e3e7",
                      "62e1cb50391ffe02d181e3e8"
                  ],
                  "_id": "62e1c66c391ffe02d181e36a"
              },
              {
                  "socketId": "D4uQT5MmB1X1z5_jAAAH",
                  "connectedTime": "2022-07-27T23:33:11.789Z",
                  "device": "mobile",
                  "courseSession": "62e1c612391ffe02d181e366",
                  "student": "6295104f179a36471be66436",
                  "_id": "62e1cb37391ffe02d181e3e5"
              }
          ]
      }
    };

    const result = createEngagementPointsForCourseSession(coureSession.courseSession, 60);
    
  })
});

