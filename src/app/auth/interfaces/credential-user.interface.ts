import { FormGroup, FormControl } from '@angular/forms';
import { IUser } from './user.interface';
export interface Credential extends Omit<IUser, 'uid' | 'name'> {
  password: string;
}

export interface FormLoginUser
  extends FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }> {}
