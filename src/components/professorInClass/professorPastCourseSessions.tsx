import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { professorGetCourseSessions } from "../../store/axios";
import { paths } from "../../paths";
import { Course } from "../../types";

const editIcon = require("../../Assets/images/edit-icon.png");

type Props = RouteComponentProps<{
  courseId: string;
}>;

type PastCourseSession = {
  id: string;
  startTime: string;
  endTime: string;
  course: any;
  students: any;
};

const getMinuteDuration = (s1: string, s2: string): string => {
  const d1 = new Date(s1);
  const d2 = new Date(s2);
  const diff = d2.getTime() - d1.getTime();
  const diffInMinutes = Math.round(diff / 1000 / 60);
  return `${diffInMinutes} minutes`;
};

const calculateAttendancePercent = (
  course: Course,
  session: PastCourseSession
): number | null => {
  if (!course.students) {
    return null;
  }

  const presentStudents = new Set(session.students.map((s: any) => s._id));

  const presentCount = course.students
    .map((sId): number => (presentStudents.has(sId) ? 1 : 0))
    .reduce((total, count) => total + count, 0);
  return Math.round((presentCount / course.students.length) * 100);
};

const formatAttendancePercent = (value: number | null): string => {
  return value || value === 0 ? `${value}%` : "Unknown";
};

export const ProfessorPastCourseSessions: React.FC<Props> = ({ match }) => {
  const [loading, setLoading] = React.useState(true);
  const [course, setCourse] = React.useState<Course | null>();
  const [sessions, setSessions] = React.useState<PastCourseSession[] | null>();
  const { courseId } = match.params;

  React.useEffect(() => {
    const fetch = async () => {
      const { courseSessions } = await professorGetCourseSessions(courseId);
      if (courseSessions.length) {
        setCourse(courseSessions[0].course);
      }

      setSessions(courseSessions);
      setLoading(false);
    };

    fetch();
  }, []);

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
      <div className="row">
        <div className="col-sm">
          <h3>{course?.name} Past Classes</h3>
          <div className="shadow">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Duration</th>
                  <th>Attendance</th>
                </tr>
              </thead>
              <tbody>
                {sessions?.map((session) => (
                  <tr key={session.id}>
                    <td>
                      <Link
                        to={paths.professorInClassPastSessionDetail({
                          courseId,
                          sessionId: session.id,
                        })}
                      >
                        {new Date(session.startTime).toDateString()}
                      </Link>
                    </td>
                    <td>
                      {getMinuteDuration(session.startTime, session.endTime)}
                    </td>
                    <td>
                      {formatAttendancePercent(
                        calculateAttendancePercent(course!, session)
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
