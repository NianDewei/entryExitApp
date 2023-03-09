import { Injectable } from '@angular/core';
import {
  Auth,
  UserCredential,
  NextOrObserver,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';

import { CreateUser } from '../interfaces/create-user.interface';
import { Credential } from '../interfaces/credential-user.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _active: boolean = false;
  constructor(public _authFire: Auth) {}

  initAuthListener() {
    this._authFire.onAuthStateChanged((stateUser) => console.log(stateUser));
  }

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

  isAuth(): Observable<boolean> {
    this._authFire.onAuthStateChanged(
      (state) => (this._active = state?.uid != undefined)
    );

    return of(this._active);
  }
}
