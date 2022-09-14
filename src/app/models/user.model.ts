export class User {

  constructor(
    public name: string,
    public lastName: string,
    public email: string,
    public password?: string,
    public id?: number,
    public image?: string,
    public role?: string,
    public google?: boolean,
  ) { }

}


