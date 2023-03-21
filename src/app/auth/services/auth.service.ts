import firebase from 'firebase/compat';
import { Injectable } from '@angular/core';
// firebase
import 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Observable, of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { CreateUser } from '../interfaces/create-user.interface';
import { Credential } from '../interfaces/credential-user.interface';
import { User } from '../model/user.model';

// ngrx
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as authActions from '../store/auth.actions';
import * as entryExitActions from 'src/app/entry-exit/store/entry-exit.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // !properties
  private _userSubscription!: Subscription;
  private _user: User | null = null;

  constructor(
    public _authFire: AngularFireAuth,
    private _fireStore: AngularFirestore,
    private _store: Store<AppState>
  ) {}

  initAuthListener() {
    this._authFire.authState.subscribe({
      next: (fUser) => {
        if (fUser) {
          const path = fUser?.uid + '/user';
          this._userSubscription = this._fireStore
            .doc(path)
            .valueChanges()
            .subscribe({
              next: (fireStoreUser) => {
                const user = User.fromFirebase(fireStoreUser);
                this._user = user;
                this._store.dispatch(authActions.setUser({ user }));
              },
            });
          return;
        }

        if (this._userSubscription) {
          this._userSubscription.unsubscribe();
        }

        this._user = null;
        this._store.dispatch(authActions.unSetUser());
        this._store.dispatch(entryExitActions.unSetItems());
      },
    });
  }

  get user() {
    return this._user;
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

    return userCredential;
  }

  async signOutUser(): Promise<void> {
    this._authFire.signOut();
  }

  verifyIsAuth(): Observable<boolean> {
    return this._authFire.authState.pipe(
      switchMap((isActive) => of(isActive != null))
    );
  }
}
