import { Injectable } from '@angular/core';

import firebase from 'firebase/compat';
import 'firebase/firestore';
import {
  AngularFirestore,
  DocumentReference,
} from '@angular/fire/compat/firestore';

import { AuthService } from '../../auth/services/auth.service';
import { EntryExit } from '../model/entry-exit.model';

@Injectable({
  providedIn: 'root',
})
export class EntryExitService {
  constructor(
    private _authService: AuthService,
    private _fireStore: AngularFirestore
  ) {}

  regiterEntryExit(
    data: EntryExit
  ): Promise<DocumentReference<firebase.firestore.DocumentData>> {
    const uid = this._authService.user?.uid;
    const path = `${uid}/entry-exit`;
    console.log(path);

    return this._fireStore
      .doc(path)
      .collection('items')
      .add({ ...data });
  }
}
