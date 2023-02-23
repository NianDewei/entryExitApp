import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import Swal from 'sweetalert2';
import { FormRegisterUser } from '../interfaces/create-user.interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormRegisterUser;
  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this._fb.nonNullable.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  register(): void {
    if (this.registerForm.invalid) {
      return;
    }

    Swal.fire({
      title: 'Espere por favor',
      didOpen: () => {
        Swal.showLoading();
      },
    });

    this._authService
      .createUser(this.registerForm.getRawValue())
      .then((credential) => {
        Swal.close();
        this._router.navigate(['/']);
      })
      .catch((err) => {
        Swal.close();
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
