import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  signupForm!: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private fb: FormBuilder, private apiService: ApiService, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required,]],
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notSame: true };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.apiService.createUser(this.signupForm.getRawValue()).subscribe((res: any) => {
        console.log(res);
        localStorage.setItem('user', JSON.stringify(res.data))
        localStorage.setItem('access_token', res.accessToken)
        this.router.navigate(['./'])
        this.openSnackBar(res.message)
      }, (e: any) => {
        this.openSnackBar(e.message)
      })
      console.log('Form submitted:', this.signupForm.value);
      // Here you would typically call a service to register the user
    } else {
      this.signupForm.markAllAsTouched()
      return
    }
  }
  openSnackBar(message: any) {
    this._snackBar.open(message, '', { duration: 3000 });
  }
}
