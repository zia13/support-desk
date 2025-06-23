import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: any; // Replace `any` with actual User model if available
}

@Injectable({
  providedIn: 'root',
})
export class AuthContextStore {
  private readonly initialState: AuthState = {
    isAuthenticated: false,
    token: null,
    user: null,
  };

  private authSubject = new BehaviorSubject<AuthState>(this.initialState);

  readonly authState$: Observable<AuthState> = this.authSubject.asObservable();

  constructor() {
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.setAuthState({ isAuthenticated: true, token, user: null }); // optionally fetch user info
    }
  }

  setAuthState(state: AuthState) {
    this.authSubject.next(state);
    if (state.token) {
      localStorage.setItem('auth_token', state.token);
    } else {
      localStorage.removeItem('auth_token');
    }
  }

  clearAuthState() {
    this.authSubject.next(this.initialState);
    localStorage.removeItem('auth_token');
  }

  getCurrentAuthState(): AuthState {
    return this.authSubject.getValue();
  }
}
