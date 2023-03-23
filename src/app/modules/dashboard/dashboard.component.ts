import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Store } from '@ngrx/store';

import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { EntryExitService } from '../entry-exit/services/entry-exit.service';
import * as entryExitActions from '../entry-exit/store/entry-exit.actions';
import { AppState } from 'src/app/app.reducer';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styles: [],
  imports: [CommonModule, RouterModule, SharedModule],
})
export class DashboardComponent implements OnInit, OnDestroy {
  userActiveSub!: Subscription;
  entryExitSub!: Subscription;
  constructor(
    private _store: Store<AppState>,
    private _entryExitService: EntryExitService
  ) {}

  ngOnInit(): void {
    this.userActiveSub = this._store
      .select('auth')
      .pipe(filter((auth) => auth?.user != null))
      .subscribe(
        ({ user }) =>
          (this.entryExitSub = this._entryExitService
            .initEntryExitListener({ uid: user!.uid })
            .subscribe((items) =>
              this._store.dispatch(entryExitActions.setItems({ items: items }))
            ))
      );
  }

  ngOnDestroy(): void {
    if (this.userActiveSub) {
      this.userActiveSub.unsubscribe();
    }
    if (this.entryExitSub) {
      this.entryExitSub.unsubscribe();
    }
  }
}
