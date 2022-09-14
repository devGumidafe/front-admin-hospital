interface hospitalUser {
  id: number;
  name: string;
  image: string;
}

export class Hospital {
  constructor(
    public id?: number,
    public name?: string,
    public image?: string,
    public user?: hospitalUser
  ) { }
}
