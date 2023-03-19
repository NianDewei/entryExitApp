import { FormControl, FormGroup } from '@angular/forms';
import { IUser } from './user.interface';

export interface CreateUser extends Omit<IUser, 'uid'> {
  name: string;
  password: string;
}

export interface FormRegisterUser
  extends FormGroup<{
    name: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
  }> {}
