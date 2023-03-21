import { Injectable } from '@angular/core';

import firebase from 'firebase/compat';
import 'firebase/firestore';
import {
  AngularFirestore,
  DocumentReference,
} from '@angular/fire/compat/firestore';

import { AuthService } from '../../auth/services/auth.service';
import { EntryExitModel } from '../model/entry-exit.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { EntryExit } from '../interfaces/entry-exit';

@Injectable({
  providedIn: 'root',
})
export class EntryExitService {
  constructor(
    private _authService: AuthService,
    private _fireStore: AngularFirestore
  ) {}

  regiterEntryExit(
    data: EntryExitModel
  ): Promise<DocumentReference<firebase.firestore.DocumentData>> {
    const uid = this._authService.user?.uid;
    const path = `${uid}/entry-exit`;

    return this._fireStore
      .doc(path)
      .collection('items')
      .add({ ...data });
  }

  initEntryExitListener({
    uid,
  }: {
    uid: string;
  }): Observable<Array<EntryExit>> {
    const path = `${uid}/entry-exit/items`;
    return this._fireStore
      .collection(path)
      .snapshotChanges()
      .pipe(
        map((shapshot) =>
          shapshot.map((doc) => ({
            uid: doc.payload.doc.id,
            ...(doc.payload.doc.data() as Omit<EntryExit, 'uid'>),
          }))
        )
      );
  }

  deleteExtryExitBy(uidItem: string): Promise<void> {
    const uid = this._authService.user?.uid;
    const path = `${uid}/entry-exit/items/${uidItem}`;

    return this._fireStore.doc(path).delete();
  }
}
