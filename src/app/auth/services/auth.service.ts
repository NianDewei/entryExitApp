import { Injectable } from '@angular/core';
import {
  Auth,
  UserCredential,
  // NextOrObserver,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';

import { Firestore, doc, setDoc } from '@angular/fire/firestore';

import { CreateUser } from '../interfaces/create-user.interface';
import { Credential } from '../interfaces/credential-user.interface';
import { Observable, of } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _active: boolean = false;
  constructor(public _authFire: Auth, private _fireStore: Firestore) {}

  initAuthListener() {
    this._authFire.onAuthStateChanged((stateUser) => {
      console.log(stateUser?.uid);
      console.log(stateUser?.email);
      console.log(stateUser?.displayName);
    });
  }

  async createUser({
    email,
    password,
    name,
  }: CreateUser): Promise<UserCredential> {
    const userCredential = await createUserWithEmailAndPassword(
      this._authFire,
      email,
      password
    ).then((dataUser) => {
      const { user } = dataUser;

      const newUser = new User(user.uid, name, user.email || email);
      const path = user.uid + '/user';
      const ref = doc(this._fireStore, path);
      setDoc(ref, { ...newUser });
      return dataUser;
    });

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
