import { UserFireStore } from './../interfaces/user.interface';
export class User {
  static fromFirebase({ uid, displayName, email }: any): UserFireStore {
    return new User(uid, displayName, email);
  }

  constructor(
    public uid: string,
    public displayName: string,
    public email: string
  ) {}
}
