import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  standalone: true,
  selector: 'app-register',
  template: `
    <div class="max-w-md mx-auto mt-10 p-6 shadow-md border rounded">
      <h2 class="text-2xl font-bold mb-4">Register</h2>
      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
        <div class="mb-4">
          <label class="block font-medium mb-1">Full Name</label>
          <input
            formControlName="fullName"
            type="text"
            class="w-full px-3 py-2 border rounded"
            placeholder="John Doe"
          />
        </div>

        <div class="mb-4">
          <label class="block font-medium mb-1">Email</label>
          <input
            formControlName="email"
            type="email"
            class="w-full px-3 py-2 border rounded"
            placeholder="user@example.com"
          />
        </div>

        <div class="mb-4">
          <label class="block font-medium mb-1">Password</label>
          <input
            formControlName="password"
            type="password"
            class="w-full px-3 py-2 border rounded"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          [disabled]="registerForm.invalid"
          class="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Register
        </button>
      </form>
    </div>
  `,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit() {
    if (this.registerForm.valid) {
      const { fullName, email, password } = this.registerForm.value;
      // Dummy registration behavior
      this.authService.login({ email: email ?? '', password: password ?? '' });
      this.router.navigate(['/tickets']);
    }
  }
}
