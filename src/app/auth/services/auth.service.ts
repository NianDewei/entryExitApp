import { Injectable } from '@angular/core';
import {
  Auth,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';

import { CreateUser } from '../interfaces/create-user.interface';
import { Credential } from '../interfaces/credential-user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public _authFire: Auth) {}

  async createUser({ email, password }: CreateUser): Promise<UserCredential> {
    const userCredential = await createUserWithEmailAndPassword(
      this._authFire,
      email,
      password
    );

    return userCredential;
  }

  async signInUser({ email, password }: Credential): Promise<UserCredential> {
    const userCredential = await signInWithEmailAndPassword(
      this._authFire,
      email,
      password
    );
    return userCredential;
  }

  async signOutUser(): Promise<void> {
    const userCredential = await signOut(this._authFire);
  }
}
