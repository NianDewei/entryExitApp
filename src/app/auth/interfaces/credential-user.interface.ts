import { FormGroup, FormControl } from '@angular/forms';
import { User } from './user.interface';
export interface Credential extends Omit<User, 'uid' | 'name'> {
  password: string;
}

export interface FormLoginUser
  extends FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }> {}
