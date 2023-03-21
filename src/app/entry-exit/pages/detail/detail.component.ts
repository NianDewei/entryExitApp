import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';

import { EntryExit } from '../../interfaces/entry-exit';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.component.html',
  styles: [
    `
      .fs-11px {
        font-size: 11.3px;
      }

      .fw-500 {
        font-weight: 500
      }
    `,
  ],
})
export class DetailComponent implements OnInit, OnDestroy {
  items: Array<EntryExit> = [];
  itemsSubs!: Subscription;
  constructor(private _store: Store<AppState>) {}

  ngOnInit(): void {
    this.itemsSubs = this._store
      .select('entryExit')
      .subscribe(({ items }) => (this.items = items as Array<EntryExit>));
  }

  ngOnDestroy(): void {
    if (this.itemsSubs) {
      this.itemsSubs.unsubscribe;
    }
  }

  //! methods
  delete(uid: string) {
    console.log(uid);
  }

  itemTrackBy(i: number, item: EntryExit) {
    return item.uid;
  }
}
