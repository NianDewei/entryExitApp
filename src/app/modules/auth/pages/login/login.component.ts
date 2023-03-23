import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { FormLoginUser } from '../../interfaces/credential-user.interface';
// Ngrx
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';
import * as ui from 'src/app/shared/ui.actions';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit, OnDestroy {
  // *properties
  loginForm!: FormLoginUser;
  loading: boolean = false;
  uiSubscription!: Subscription;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _store: Store<AppState>,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this._fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.uiSubscription = this._store
      .select('ui')
      .subscribe({ next: ({ isLoading }) => (this.loading = isLoading) });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this._store.dispatch(ui.isLoading());

    this._authService
      .signInUser(this.loginForm.getRawValue())
      .then((user) => {
        this._store.dispatch(ui.stopLoading());
        this._router.navigate(['/']);
      })
      .catch((err) => {
        this._store.dispatch(ui.stopLoading());
        if (err.code != 'auth/user-not-found') {
          console.log('Hubo un error: ', err.code);
          return;
        }

        console.log('usuario ya existe');
        this.loginForm.reset();
      });
  }
}
