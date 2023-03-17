import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { FormLoginUser } from '../../interfaces/credential-user.interface';
// Ngrx
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { Subscription } from 'rxjs';
import * as ui from 'src/app/shared/ui.actions';

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
    // Swal.fire({
    //   title: 'Accediendo...',
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // });

    this._authService
      .signInUser(this.loginForm.getRawValue())
      .then((user) => {
        this._store.dispatch(ui.stopLoading());
        // Swal.close();
        this._router.navigate(['/']);
      })
      .catch((err) => {
        // Swal.close();
        this._store.dispatch(ui.stopLoading());
        if (err.code != 'auth/user-not-found') {
          Swal.fire({
            icon: 'error',
            title: '',
            text: err.code,
          });
          return;
        }

        Swal.fire({
          icon: 'warning',
          title: 'Aviso',
          text: 'Correo y/o contraseña incorrecta.',
          confirmButtonColor: '#007bff',
        });
        this.loginForm.reset();
      });
  }
}
