export type Course = {
  _id: string;
  id?: string;
  classId: string;
  name: string;
  integrationId?: string;
  attendances?: any[];
  tests?: any[];
  isInSession: boolean;
  accessCode: string | null;
  students?: any[];
  allowedUrls?: string[];
  professor: Professor | string;

  defaultAttendanceTrackingDelay?: number;
  defaultAttendanceFlags?: InClassFlagAction[];
};

type Professor = {
  firstName: string;
  lastName: string;
};

export enum InClassFlagAction {
  phoneDisconnected = "phone-disconnected",
  nonAllowedUrl = "non-allowed-url",
  computerDisconnected = "computer-disconnected",
}

export type UserLoginData = {
  id: string;
  name: string;
  school: {
    name: string;
    id: string;
  };
  role: string;
}
