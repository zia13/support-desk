import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../core/models/user.model';
import {AppConstants} from "../_helpers/app.constants";

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = AppConstants.API_BASE_URL;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  updateUser(id: string, updates: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.baseUrl}/${id}`, updates);
  }
}
