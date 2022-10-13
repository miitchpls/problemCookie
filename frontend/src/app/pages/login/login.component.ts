import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'login-page',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  public form: UntypedFormGroup = this.formBuilder.group({
    username: new UntypedFormControl('', [Validators.required]),
    password: new UntypedFormControl('', [Validators.required]),
  });

  constructor(
    private apiService: ApiService,
    private formBuilder: UntypedFormBuilder,
    private router: Router
  ) {}

  public login(): void {
    console.log('Start loading');

    this.apiService
      .post('login', this.form.value)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err: any) => {
          console.error(err);
        },
      })
      .add(() => {
        console.log('Stop loading');
      });
  }
}
