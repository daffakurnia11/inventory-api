export interface Admin {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  gender: "Male" | "Female" | "Other";
  password: string;
}
