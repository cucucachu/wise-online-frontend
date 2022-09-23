import React from "react";
import { Link } from "react-router-dom";
//axios
import { Card } from "../../Resusable/Card";
import { paths } from "../../../paths";

import { ActiveStatus, StudentDeviceStatus } from "./ActiveStatus";
import { Student, GroupedSessions } from "../types";
import { SortArrow } from "./SortArrow";
import "./StudentTrackingTable.css";

type StudentTrackingTableProps = {
  courseId: string;
  sessionId?: string;
  students: Student[];
  sessionsByStudent: GroupedSessions;
};

type SortField = "name" | "computer" | "mobile" | "flags";
type SortDirection = "asc" | "desc";

const getFullName = (student: Student): string => {
  return `${student.firstName} ${student.lastName}`;
};

const DEVICE_STATUS_SORT_ORDER: StudentDeviceStatus[] = [
  "online",
  "disconnected",
  "notEntered",
];

const compareDeviceStatus = (
  a: StudentDeviceStatus,
  b: StudentDeviceStatus
): number => {
  return (
    DEVICE_STATUS_SORT_ORDER.indexOf(a) - DEVICE_STATUS_SORT_ORDER.indexOf(b)
  );
};

const COMPARATOR_FUNCS: {
  [field in SortField]: (
    a: ComputedStudentRow,
    b: ComputedStudentRow
  ) => number;
} = {
  name(a: ComputedStudentRow, b: ComputedStudentRow) {
    return a.name.localeCompare(b.name);
  },
  computer(a: ComputedStudentRow, b: ComputedStudentRow) {
    return compareDeviceStatus(a.webStatus, b.webStatus);
  },
  mobile(a: ComputedStudentRow, b: ComputedStudentRow) {
    return compareDeviceStatus(a.mobileStatus, b.mobileStatus);
  },
  flags(a: ComputedStudentRow, b: ComputedStudentRow) {
    return a.flags - b.flags;
  },
};

type ComputedStudentRow = {
  _id: string;
  name: string;
  webStatus: StudentDeviceStatus;
  mobileStatus: StudentDeviceStatus;
  flags: number;
};

type TrackingTableHeaderCellProps = React.PropsWithChildren<{
  field: SortField;
  direction: SortDirection;
  currentSortedField: SortField;
  onClick(field: SortField): void;
}>;

const TrackingTableHeaderCell: React.FC<TrackingTableHeaderCellProps> = ({
  field,
  direction,
  currentSortedField,
  onClick,
  children,
}) => {
  const onClickField = React.useCallback(() => {
    onClick(field);
  }, [field, onClick]);

  return (
    <th onClick={onClickField}>
      {children}
      {field === currentSortedField && <SortArrow direction={direction} />}
    </th>
  );
};

export const StudentTrackingTable: React.FC<StudentTrackingTableProps> = ({
  sessionsByStudent,
  courseId,
  sessionId,
  students,
}) => {
  const [sortedField, setSortedField] = React.useState<SortField>("name");
  const [sortedDirection, setSortedDirection] =
    React.useState<SortDirection>("asc");

  const computedData: ComputedStudentRow[] = React.useMemo(() => {
    return students.map((s) => {
      const studentSessions = sessionsByStudent[s._id];
      const sessionsForWeb = studentSessions?.byDevice["web"] ?? [];
      let webStatus: StudentDeviceStatus = "notEntered";

      if (sessionsForWeb?.length) {
        if (sessionsForWeb[sessionsForWeb.length - 1].disconnectedTime) {
          webStatus = "disconnected";
        } else {
          webStatus = "online";
        }
      }

      const sessionsForMobile = studentSessions?.byDevice["mobile"] ?? [];
      let mobileStatus: StudentDeviceStatus = "notEntered";

      if (sessionsForMobile?.length) {
        if (sessionsForMobile[sessionsForMobile.length - 1].disconnectedTime) {
          mobileStatus = "disconnected";
        } else {
          mobileStatus = "online";
        }
      }

      return {
        _id: s._id,
        name: getFullName(s),
        webStatus,
        mobileStatus,
        flags: sessionsByStudent[s._id]?.flags ?? 0,
      };
    });
  }, [sessionsByStudent, students]);

  const sortedData = React.useMemo(() => {
    const comparator = COMPARATOR_FUNCS[sortedField];
    const copy = [...computedData];
    copy.sort((a, b) => {
      return comparator(a, b) * (sortedDirection === "desc" ? -1 : 1);
    });

    return copy;
  }, [sortedField, sortedDirection, computedData]);

  const onClickField = React.useCallback(
    (field: SortField) => {
      if (field === sortedField) {
        setSortedDirection(sortedDirection === "asc" ? "desc" : "asc");
      } else {
        setSortedField(field);
      }
    },
    [sortedDirection, sortedField]
  );

  return (
    <Card>
      <Card.Body>
        <table className="table table-striped">
          <thead>
            <tr>
              <TrackingTableHeaderCell
                field="name"
                direction={sortedDirection}
                currentSortedField={sortedField}
                onClick={onClickField}
              >
                Student
              </TrackingTableHeaderCell>
              <TrackingTableHeaderCell
                field="computer"
                direction={sortedDirection}
                currentSortedField={sortedField}
                onClick={onClickField}
              >
                Computer
              </TrackingTableHeaderCell>
              <TrackingTableHeaderCell
                field="mobile"
                direction={sortedDirection}
                currentSortedField={sortedField}
                onClick={onClickField}
              >
                Mobile
              </TrackingTableHeaderCell>
              <TrackingTableHeaderCell
                field="flags"
                direction={sortedDirection}
                currentSortedField={sortedField}
                onClick={onClickField}
              >
                Flags
              </TrackingTableHeaderCell>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((student) => (
              <tr key={student._id}>
                <td>
                  <Link
                    to={paths.professorInClassViewStudent({
                      courseId: courseId!,
                      sessionId: sessionId!,
                      studentId: student._id,
                    })}
                  >
                    {student.name}
                  </Link>
                </td>
                <td>
                  <ActiveStatus status={student.webStatus} />
                </td>
                <td>
                  <ActiveStatus status={student.mobileStatus} />
                </td>
                <td>{student.flags}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card.Body>
    </Card>
  );
};
