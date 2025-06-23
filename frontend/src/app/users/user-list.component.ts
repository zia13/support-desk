import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { User } from '../core/models/user.model';

@Component({
  standalone: true,
  selector: 'app-user-list',
  template: `
    <div class="p-6">
      <h2 class="text-xl font-bold mb-4">User List</h2>
      <ul class="space-y-2">
        <li *ngFor="let user of users" class="border p-4 rounded shadow">
          <div class="font-medium">{{ user.fullName }} ({{ user.role }})</div>
          <div class="text-sm text-gray-600">{{ user.email }}</div>
        </li>
      </ul>
    </div>
  `,
  imports: [CommonModule],
})
export class UserListComponent implements OnInit {
  private userService = inject(UserService);
  users: User[] = [];

  ngOnInit() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }
}
