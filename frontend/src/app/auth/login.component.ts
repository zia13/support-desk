import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  template: `
    <div class="max-w-md mx-auto mt-10 p-6 shadow-md border rounded">
      <h2 class="text-2xl font-bold mb-4">Login</h2>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
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
          [disabled]="loginForm.invalid"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  `,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      if (typeof email === 'string' && typeof password === 'string') {
        this.authService.login({ email, password });
        this.router.navigate(['/tickets']);
      }
    }
  }
}
