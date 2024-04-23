//AÑADIR AQUI FUNCIONES ÚTILES PARA LA APP

import { AbstractControl } from '@angular/forms';

export const confirmPassword = (control: AbstractControl) => {
  if (control.value == control.root.value['password']) {
    return null;
  } else {
    return { confirmed: false };
  }
};
