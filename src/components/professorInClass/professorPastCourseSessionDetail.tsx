import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { professorGetCourseSessionDetail } from "../../store/axios";
import { Card } from "../Resusable/Card";
import { GraphSeriesFilter } from "../Resusable/GraphSeriesFilter";
import { EngagementGraph } from "./EngagementGraph";
import { useEngagementGraphToggles } from "./hooks";
import { createEngagementPointsForCourseSession } from "./utils";
import { EngagementData, CourseSession } from "./types";
import { PastStudentTrackingTable } from "./InClass/PastStudentTrackingTable";

const editIcon = require("../../Assets/images/edit-icon.png");
//

type Props = RouteComponentProps<{
  courseId: string;
  sessionId: string;
}>;

export const ProfessorPastCourseSessionDetail: React.FC<Props> = ({
  match,
}) => {
  const [loading, setLoading] = React.useState(true);
  const [courseSession, setCourseSession] =
    React.useState<CourseSession | null>();
  const { courseId, sessionId } = match.params;

  React.useEffect(() => {
    const fetch = async () => {
      const { courseSession } = await professorGetCourseSessionDetail(
        courseId,
        sessionId
      );

      setCourseSession(courseSession);
      setLoading(false);
    };

    fetch();
  }, []);

  const studentNameById = React.useMemo(() => {
    if (courseSession) {
      return courseSession.students.reduce((accum, row) => {
        accum[row._id] = row;
        return accum;
      }, {} as any);
    }
  }, [courseSession]);

  const { onToggleGraphLine, selectedGraphLines } = useEngagementGraphToggles();

  const engagementPoints: EngagementData[] | undefined = React.useMemo(() => {
    if (courseSession) {
      return createEngagementPointsForCourseSession(courseSession);
    }
  }, [courseSession]);

  if (loading) {
    return (
      <div className="container">
        <img src={editIcon} className="page-icon" alt="login icon" />
        <div className="spacer-vertical" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <img src={editIcon} className="page-icon" alt="login icon" />
      <div className="spacer-vertical" />
      <Card>
        <Card.Header>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <h5>Student Engagement</h5>
              <p>Click to toggle chart filters</p>
            </div>
            <div style={{ maxWidth: "600px" }}>
              <GraphSeriesFilter
                selected={selectedGraphLines.includes("mobile")}
                color="blue"
                label="Mobiles connected"
                onToggle={(value) => onToggleGraphLine("mobile", value)}
              />
              <GraphSeriesFilter
                selected={selectedGraphLines.includes("connected")}
                color="green"
                label="Computers connected"
                onToggle={(value) => onToggleGraphLine("connected", value)}
              />
              <GraphSeriesFilter
                selected={selectedGraphLines.includes("disconnects")}
                color="red"
                label="Disconnects"
                onToggle={(value) => onToggleGraphLine("disconnects", value)}
              />
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <EngagementGraph
            data={engagementPoints}
            selectedSeries={selectedGraphLines}
          />
        </Card.Body>
      </Card>
      <div className="spacer-vertical" />
      <div className="row">
        <div className="col-sm">
          <PastStudentTrackingTable
            course={courseSession?.course}
            courseId={courseId}
            sessionId={courseSession?.id}
            students={courseSession?.students ?? []}
            studentCourseSessions={courseSession?.studentCourseSessions ?? []}
          />
        </div>
      </div>
      <div className="spacer-vertical" />
      <div className="row">
        <div className="col-sm">
          <div className="shadow">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Device</th>
                  <th>Connected Time</th>
                  <th>Disconnected Time</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {courseSession?.studentCourseSessions?.map(
                  (studentCourseSession) => (
                    <tr key={studentCourseSession._id}>
                      <td>
                        {studentNameById &&
                          [
                            studentNameById[studentCourseSession.student]
                              .firstName,
                            studentNameById[studentCourseSession.student]
                              .lastName,
                          ].join(" ")}
                      </td>
                      <td>{studentCourseSession.device}</td>
                      <td>
                        {new Date(
                          studentCourseSession.connectedTime
                        ).toLocaleString()}
                      </td>
                      <td>
                        {studentCourseSession.disconnectedTime &&
                          new Date(
                            studentCourseSession.disconnectedTime
                          ).toLocaleString()}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
          {/* <pre style={{ textAlign: 'left' }}>
                {JSON.stringify(courseSession, null, 2)}
                </pre> */}
        </div>
      </div>
    </div>
  );
};
