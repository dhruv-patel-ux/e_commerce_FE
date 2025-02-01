import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../../core/services/api.service';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-address-model',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterLink,
    MatRadioModule
  ],
  templateUrl: './address-model.component.html',
  styleUrl: './address-model.component.scss'
})
export class AddressModelComponent {
  addressForm!: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private fb: FormBuilder, private apiService: ApiService, private _snackBar: MatSnackBar, private router: Router) { }
  ngOnInit() {
    this.addressForm = this.fb.group({
      address: ['', [Validators.required]],
      house_no: ['', [Validators.required]],
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required, Validators.email]],
      zip: ['', [Validators.required,]]
    });
  }
  onSubmit() { }
}
