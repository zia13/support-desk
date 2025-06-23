import { Injectable, signal } from '@angular/core';
import { User } from '../core/models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user = signal<User | null>(null);

  login(credentials: { email: string; password: string }) {
    // fake login logic
    const dummyUser: User = {
      id: '1',
      email: credentials.email,
      fullName: 'Demo User',
      role: 'user',
    };
    this.user.set(dummyUser);
  }

  logout() {
    this.user.set(null);
  }

  getUser() {
    return this.user();
  }

  getUserRole(): string {
    return this.user()?.role ?? '';
  }
}
