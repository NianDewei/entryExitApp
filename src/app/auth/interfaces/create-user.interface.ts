import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../model/user.model';

export interface CreateUser extends Omit<User, 'uuid'> {
  password: string;
}

export interface FormRegisterUser
  extends FormGroup<{
    name: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
  }> {}
