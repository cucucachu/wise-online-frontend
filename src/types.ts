
export type Course = {
  _id: string;
  classId: string;
  name: string;
  integrationId: string;
  attendances: any[];
  tests: any[];
  isInSession: boolean;
  accessCode: string | null;
  students?: any[];
};
