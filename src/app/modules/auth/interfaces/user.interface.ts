export interface IUser {
  uid: string;
  name: string;
  email: string;
}

export interface UserFireStore extends Omit<IUser, 'name'> {
  displayName: string;
}
