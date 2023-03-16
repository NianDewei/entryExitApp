import { FormControl, FormGroup } from '@angular/forms';
import { User } from './user.interface';

export interface CreateUser extends Omit<User, 'uid'> {
  name: string;
  password: string;
}

export interface FormRegisterUser
  extends FormGroup<{
    name: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
  }> {}
