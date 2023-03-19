import { Injectable } from '@angular/core';
// firebase
import firebase from 'firebase/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { CreateUser } from '../interfaces/create-user.interface';
import { Credential } from '../interfaces/credential-user.interface';
import { User } from '../model/user.model';

// ngrx
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as authActions from '../store/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // create a behaviorSubject to store the data
  private _isActiveSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  // create an observable to expose the behaviorSubject as an observable
  private readonly isActive: Observable<boolean> =
    this._isActiveSubject.asObservable();

  private _authState!: Subscription;
  constructor(
    public _authFire: AngularFireAuth,
    private _fireStore: AngularFirestore,
    private _store: Store<AppState>
  ) {}

  initAuthListener() {
    this._authState = this._authFire.authState.subscribe({
      next: (fUser) => {
        if (fUser === null) {
          this._store.dispatch(authActions.unSetUser());
          return;
        }

        const path = fUser?.uid + '/user';
        this._fireStore
          .doc(path)
          .valueChanges()
          .subscribe({
            next: (fireStoreUser) => {
              const user = User.fromFirebase(fireStoreUser);
              this._store.dispatch(authActions.setUser({ user }));
            },
          });
      },
      complete: () => {
        this._authState.unsubscribe();
      },
    });
  }

  async createUser({
    email,
    password,
    name,
  }: CreateUser): Promise<firebase.auth.UserCredential> {
    const userCredential = await this._authFire
      .createUserWithEmailAndPassword(email, password)
      .then((dataUser) => {
        const { user } = dataUser;
        const newUser = new User(user?.uid || '', user?.email || '', name);
        const path = user?.uid + '/user';

        this._fireStore.doc(path).set({ ...newUser });
        return dataUser;
      });

    return userCredential;
  }

  async signInUser({
    email,
    password,
  }: Credential): Promise<firebase.auth.UserCredential> {
    const userCredential = await this._authFire.signInWithEmailAndPassword(
      email,
      password
    );

    if (!userCredential) {
      this._isActiveSubject.next(false);
      return userCredential;
    }

    this._isActiveSubject.next(true);
    return userCredential;
  }

  async signOutUser(): Promise<void> {
    this._isActiveSubject.next(false);
    this._store.dispatch(authActions.unSetUser());
    this._authFire.signOut();
  }

  verifyIsAuth(): Observable<boolean> {
    return this.isActive.pipe(
      switchMap((isActive) => {
        if (!isActive) {
          return of(false);
        }
        return of(true);
      })
    );
  }
}
