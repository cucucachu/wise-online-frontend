
export type Course = {
  _id: string;
  id: string;
  classId: string;
  name: string;
  integrationId: string;
  attendances: any[];
  tests: any[];
  isInSession: boolean;
  accessCode: string | null;
  students?: any[];
  allowedUrls?: string[];
  professor: Professor;

  defaultAttendanceTrackingDelay?: number;
  defaultAttendanceThreshold?: number;
  defaultAttendanceFlags?: string[];
};
type Professor = {
  firstName: string;
  lastName: string;
}
