import { Hospital } from "./hospital.model";

interface doctorUser {
  id?: number;
  name?: string;
  image?: string;
}

export class Doctor {
  constructor(
    public id?: number,
    public name?: string,
    public image?: string,
    public user?: doctorUser,
    public hospital?: Hospital
  ) { }
}
