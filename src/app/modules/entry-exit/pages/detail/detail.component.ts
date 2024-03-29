import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Store } from '@ngrx/store';
import { AppStateWithEntryExit } from '../../store/entry-exit.reducer';

import { EntryExit } from '../../interfaces/entry-exit';
import { Subscription } from 'rxjs';
import { EntryExitService } from '../../services/entry-exit.service';
import { OrderEntryPipe } from '../../pipes/order-entry.pipe';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, OrderEntryPipe],
  templateUrl: './detail.component.html',
  styles: [
    `
      .fs-11px {
        font-size: 11.3px;
      }

      .fw-500 {
        font-weight: 500;
      }
    `,
  ],
})
export class DetailComponent implements OnInit, OnDestroy {
  items: Array<EntryExit> = [];
  itemsSubs!: Subscription;
  success: boolean = false;
  constructor(
    private _store: Store<AppStateWithEntryExit>,
    private _entryExitService: EntryExitService
  ) {}

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
  delete(uidItem: string) {
    this._entryExitService
      .deleteExtryExitBy(uidItem)
      .then((res) => (this.success = true));
  }

  itemTrackBy(i: number, item: EntryExit) {
    return item.uid;
  }

  close() {
    this.success = false;
  }
}
