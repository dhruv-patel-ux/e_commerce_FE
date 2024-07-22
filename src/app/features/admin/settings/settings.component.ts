import { Component, inject, PLATFORM_ID } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSelectModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  personalInfoForm!: FormGroup;
  securityForm!: FormGroup;
  notificationForm!: FormGroup;
  siteSettingsForm!: FormGroup;

  constructor(private fb: FormBuilder) { }
  platform_id = inject(PLATFORM_ID);
  ngOnInit(): void {
    this.personalInfoForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.pattern('^[0-9]{10}$')]
    });
    if (isPlatformBrowser(this.platform_id)) {
      const local = localStorage.getItem('user')
      if (local) {
        const user = JSON.parse(local)
        this.personalInfoForm.patchValue(user)
      }
    }
    // this.securityForm = this.fb.group({
    //   currentPassword: ['', Validators.required],
    //   newPassword: ['', [Validators.required, Validators.minLength(8)]],
    //   confirmPassword: ['', Validators.required]
    // }, { validator: this.checkPasswords });

    this.notificationForm = this.fb.group({
      emailNotifications: [true],
      smsNotifications: [false],
      marketingEmails: [true]
    });

    this.siteSettingsForm = this.fb.group({
      language: ['en'],
      currency: ['USD'],
      timezone: ['UTC']
    });
  }

  checkPasswords(group: FormGroup) {
    const pass = group?.get('newPassword')?.value;
    const confirmPass = group?.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  onPersonalInfoSubmit() {
    if (this.personalInfoForm.valid) {
      console.log('Personal Info Updated:', this.personalInfoForm.value);
      // Implement API call to update personal info
    }
  }

  onSecuritySubmit() {
    if (this.securityForm.valid) {
      console.log('Security Settings Updated:', this.securityForm.value);
      // Implement API call to update password
    }
  }

  onNotificationSubmit() {
    if (this.notificationForm.valid) {
      console.log('Notification Preferences Updated:', this.notificationForm.value);
      // Implement API call to update notification preferences
    }
  }

  onSiteSettingsSubmit() {
    if (this.siteSettingsForm.valid) {
      console.log('Site Settings Updated:', this.siteSettingsForm.value);
      // Implement API call to update site settings
    }
  }
}
