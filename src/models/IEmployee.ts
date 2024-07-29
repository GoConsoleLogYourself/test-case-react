export interface IEmployee {
  firstName: string;
  lastName: string;
  position: string;
  startDate: Date;
  email: string | null;
  subordinates: null | IEmployee[];
}
