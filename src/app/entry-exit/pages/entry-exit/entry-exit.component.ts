import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { EntryRegisterForm } from '../../interfaces/register-entry-exit';
import { EntryExitService } from '../../services/entry-exit.service';
// ngrx
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { Subscription } from 'rxjs';
import * as uiActions from '../../../shared/ui.actions';

@Component({
  selector: 'app-entry-exit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './entry-exit.component.html',
  styles: [],
})
export class EntryExitComponent implements OnInit, OnDestroy {
  entryForm!: EntryRegisterForm;
  loading: boolean = false;
  private _loadingSubs!: Subscription;
  type: string = 'entry';

  constructor(
    private _fb: FormBuilder,
    private _entryExitService: EntryExitService,
    private _store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.entryForm = this._fb.nonNullable.group({
      description: ['', Validators.required],
      amount: [{} as number, [Validators.required, Validators.min(1)]],
      type: [this.type, Validators.required],
    });

    this._store
      .select('ui')
      .subscribe({ next: ({ isLoading }) => (this.loading = isLoading) });
  }

  ngOnDestroy(): void {
    if (this._loadingSubs) {
      this._loadingSubs.unsubscribe();
    }
  }

  save(): void {
    if (this.entryForm.invalid) {
      return;
    }
    this._store.dispatch(uiActions.isLoading());
    this.entryForm.get('type')?.patchValue(this.type);
    const data = this.entryForm.getRawValue();

    this._entryExitService.regiterEntryExit(data).then((response) => {
      this._store.dispatch(uiActions.stopLoading());
      this.type = 'entry';
      this.entryForm.reset();
    });
  }
}
