import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import Swal from 'sweetalert2';
import { FormRegisterUser } from '../../interfaces/create-user.interface';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

// ngrx
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as ui from 'src/app/shared/ui.actions';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm!: FormRegisterUser;
  uiSubscription!: Subscription;
  loading: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _store: Store<AppState>,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this._fb.nonNullable.group({
      name: ['', Validators.required],
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

  register(): void {
    if (this.registerForm.invalid) {
      return;
    }
    this._store.dispatch(ui.isLoading());
    // Swal.fire({
    //   title: 'Espere por favor',
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // });

    this._authService
      .createUser(this.registerForm.getRawValue())
      .then((credential) => {
        this._store.dispatch(ui.stopLoading());
        // Swal.close();
        this._router.navigate(['/']);
      })
      .catch((err) => {
        this._store.dispatch(ui.stopLoading());
        // Swal.close();
        if (err.code != 'auth/email-already-in-use') {
          Swal.fire({
            icon: 'error',
            title: '',
            text: err.code,
          });
          return;
        }

        Swal.fire({
          icon: 'warning',
          title: 'Hola ' + this.registerForm.getRawValue().name,
          text: 'El correo que quieres registar, ya esta en uso.',
          confirmButtonColor: '#007bff',
        });
        this.registerForm.get('email')?.reset('');
      });
  }
}
