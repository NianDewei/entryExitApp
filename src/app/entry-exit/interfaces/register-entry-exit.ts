import { FormControl, FormGroup } from '@angular/forms';

export interface EntryRegisterForm
  extends FormGroup<{
    description: FormControl<string>;
    amount: FormControl<number>;
    type: FormControl<string>;
  }> {}
