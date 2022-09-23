import * as React from "react";
import {
  getGrouppedFlaggedUrlsFromCourseSessions,
  getGroupedDeviceActivities,
} from "../utils";
import { format } from "date-fns";
import {
  GroupedFlaggedURLS,
  GroupedDeviceActivities,
  CourseSession,
} from "../types";
import { SortArrow } from "./SortArrow";

type WebsiteFlagRowProps = {
  flaggedActivity: GroupedFlaggedURLS;
  onClickInterval(screenshotDetailId: string): void;
};

const WebsiteFlagRow: React.FC<WebsiteFlagRowProps> = ({
  onClickInterval,
  flaggedActivity,
}) => {
  return (
    <tr>
      <td>{flaggedActivity.url}</td>
      <td>
        {flaggedActivity.intervals.map((interval) => (
          <div key={interval.screenshotDetailId}>
            <a onClick={() => onClickInterval(interval.screenshotDetailId)}>
              {format(new Date(interval.start), "M/d h:mmaaa")} -{" "}
              {format(new Date(interval.end), "h:mmaaa")}
            </a>
          </div>
        ))}
      </td>
    </tr>
  );
};

type DeviceFlagRowProps = {
  flaggedActivity: GroupedDeviceActivities;
};

const DeviceFlagRow: React.FC<DeviceFlagRowProps> = ({ flaggedActivity }) => {
  const title =
    flaggedActivity.device === "web"
      ? "Computer Disconnect(s)"
      : "Mobile Disconnect(s)";

  return (
    <tr>
      <td>{title}</td>
      <td>
        {flaggedActivity.intervals.map((interval) => (
          <div key={interval.start.toISOString()}>
            <div>
              {format(new Date(interval.start), "M/d h:mmaaa")} -{" "}
              {format(new Date(interval.end), "h:mmaaa")}
            </div>
          </div>
        ))}
      </td>
    </tr>
  );
};

type IndividualStudentGroupedFlagTableProps = {
  courseSession: CourseSession;
  onClickInterval(screenshotDetailId: string): void;
};

type SortOrder = "asc" | "desc";
type SortField = "activity" | "duration";

export const IndividualStudentGroupedFlagTable: React.FC<
  IndividualStudentGroupedFlagTableProps
> = ({ onClickInterval, courseSession }) => {
  const [sortOrder, setSortOrder] = React.useState<SortOrder>("asc");
  const [sortField, setSortField] = React.useState<SortField>("activity");

  const groupedFlags = React.useMemo(() => {
    const deviceFlags = getGroupedDeviceActivities(
      courseSession,
      courseSession.studentCourseSessions
    );
    const urlFlags = getGrouppedFlaggedUrlsFromCourseSessions(
      courseSession.studentCourseSessions
    );
    if (sortField === "activity") {
      urlFlags.sort((a, b) => {
        return a.url.localeCompare(b.url);
      });

      const finalList = [...deviceFlags, ...urlFlags];
      if (sortOrder === "desc") {
        finalList.reverse();
      }

      return finalList;
    } else {
      const finalList = [...deviceFlags, ...urlFlags];
      finalList.sort((a, b) => {
        if (sortOrder === "desc") {
          return b.intervals[0].end.getTime() - a.intervals[0].end.getTime();
        } else {
          return a.intervals[0].start.getTime() - b.intervals[0].start.getTime();
        }  
      });

      return finalList;
    }
  }, [courseSession, sortOrder, sortField]);

  const onClickField = React.useCallback(
    (field: SortField) => {
      if (field === sortField) {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      } else {
        setSortField(field);
        setSortOrder("asc");
      }
    },
    [sortOrder, sortField, setSortOrder, setSortField]
  );

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th style={{ width: "70%" }} onClick={() => onClickField("activity")}>
            Flagged Activity
            {sortField === "activity" && <SortArrow direction={sortOrder} />}
          </th>
          <th onClick={() => onClickField("duration")}>
            Duration
            {sortField === "duration" && <SortArrow direction={sortOrder} />}
          </th>
        </tr>
      </thead>
      <tbody>
        {groupedFlags?.map((flaggedActivity) =>
          flaggedActivity.flagType === "blocked-url" ? (
            <WebsiteFlagRow
              key={flaggedActivity.url}
              flaggedActivity={flaggedActivity}
              onClickInterval={onClickInterval}
            />
          ) : (
            <DeviceFlagRow
              key={flaggedActivity.device}
              flaggedActivity={flaggedActivity}
            />
          )
        )}
      </tbody>
    </table>
  );
};
