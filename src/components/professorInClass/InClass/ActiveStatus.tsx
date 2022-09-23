import { IndicatorDot } from "../../Resusable/IndicatorDot";

export type StudentDeviceStatus = "disconnected" | "online" | "notEntered";

export const ActiveStatus: React.FC<{ status: StudentDeviceStatus }> = ({
  status,
}) => {
  if (status === "disconnected") {
    return (
      <div>
        <IndicatorDot color="red" />
        Disconnected
      </div>
    );
  }

  if (status === "online") {
    return (
      <div>
        <IndicatorDot color="green" />
        Online
      </div>
    );
  }

  return (
    <div>
      <IndicatorDot color="gray" />
      Not entered
    </div>
  );
};
