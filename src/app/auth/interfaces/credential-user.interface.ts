import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../model/user.model';
export interface Credential extends Omit<User, 'uuid' | 'name'> {
  password: string;
}

export interface FormLoginUser
  extends FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }> {}
