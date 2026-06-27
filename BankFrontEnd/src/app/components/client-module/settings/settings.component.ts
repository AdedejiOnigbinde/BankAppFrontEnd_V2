import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/app/services/auth-state/auth-state.service';
import { ClientService } from '../services/client/client.service';
import { clientDto } from '../types';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  profileForm: FormGroup;
  passwordForm: FormGroup;

  profile: clientDto | null = null;

  // Edit mode
  isEditing = false;

  // Loading & feedback — profile
  profileLoading = false;
  profileSubmitted = false;
  profileSuccess = '';
  profileError = '';

  // Loading & feedback — password
  passwordLoading = false;
  passwordSubmitted = false;
  passwordSuccess = '';
  passwordError = '';
  showOldPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  // Danger zone
  showDeleteModal = false;
  deleteLoading = false;
  deleteError = '';

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private authState: AuthStateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buildForms();
    this.loadProfile();
  }

  private buildForms(): void {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName:  ['', Validators.required],
      address:   ['', Validators.required],
      photoUrl:  ['']
    });

    this.passwordForm = this.fb.group({
      oldPassword:     ['', Validators.required],
      newPassword:     ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  private passwordMatchValidator(group: FormGroup): { mismatch: true } | null {
    const newPw  = group.controls['newPassword']?.value;
    const confirm = group.controls['confirmPassword']?.value;
    return newPw && confirm && newPw !== confirm ? { mismatch: true } : null;
  }

  loadProfile(): void {
    this.clientService.getProfileData().subscribe({
      next: (res: clientDto) => {
        this.profile = res;
        this.profileForm.patchValue({
          firstName: res.firstName,
          lastName:  res.lastName,
          address:   res.address,
          photoUrl:  res.photoUrl || ''
        });
      },
      error: () => { this.profileError = 'Failed to load profile.'; }
    });
  }

  get initials(): string {
    if (!this.profile) return '';
    return (
      (this.profile.firstName?.charAt(0) ?? '') +
      (this.profile.lastName?.charAt(0) ?? '')
    ).toUpperCase();
  }

  get displayName(): string {
    if (!this.profile) return '';
    const cap = (s: string) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';
    return `${cap(this.profile.firstName)} ${cap(this.profile.lastName)}`;
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.profileSubmitted = false;
    this.profileError = '';
    this.profileSuccess = '';
    if (this.profile) {
      this.profileForm.patchValue({
        firstName: this.profile.firstName,
        lastName:  this.profile.lastName,
        address:   this.profile.address,
        photoUrl:  this.profile.photoUrl || ''
      });
    }
  }

  saveProfile(): void {
    this.profileSuccess = '';
    this.profileError = '';
    this.profileSubmitted = true;
    if (this.profileForm.invalid) return;

    this.profileLoading = true;
    const payload: clientDto = this.profileForm.value;

    this.clientService.updateProfile(payload).subscribe({
      next: (res: clientDto) => {
        this.profileLoading = false;
        this.profileSubmitted = false;
        this.isEditing = false;
        this.profile = res;
        this.profileSuccess = 'Profile updated successfully.';
      },
      error: (err) => {
        this.profileLoading = false;
        this.profileError = err.error || 'Failed to update profile.';
      }
    });
  }

  changePassword(): void {
    this.passwordSuccess = '';
    this.passwordError = '';
    this.passwordSubmitted = true;
    if (this.passwordForm.invalid) return;

    this.passwordLoading = true;
    const { oldPassword, newPassword } = this.passwordForm.value;

    this.clientService.changePassword({ oldPassword, newPassword }).subscribe({
      next: (res: string) => {
        this.passwordLoading = false;
        this.passwordSubmitted = false;
        this.passwordSuccess = res || 'Password changed successfully.';
        this.passwordForm.reset();
      },
      error: (err) => {
        this.passwordLoading = false;
        this.passwordError = err.error || 'Incorrect current password.';
      }
    });
  }

  confirmDeleteAccount(): void {
    this.deleteError = '';
    this.deleteLoading = true;

    this.clientService.deleteAccount().subscribe({
      next: () => {
        this.authState.clear();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.deleteLoading = false;
        this.deleteError = err.error || 'Failed to delete account. Please try again.';
      }
    });
  }
}
