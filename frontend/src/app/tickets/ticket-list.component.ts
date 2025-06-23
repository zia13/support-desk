import {Component, computed, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TicketStore } from './ticket.store';
import { Ticket } from '../core/models/ticket.model';
import {FormsModule} from "@angular/forms";

@Component({
  standalone: true,
  selector: 'app-ticket-list',
  template: `
    <div class="p-6">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold">Tickets</h1>
        <button
          routerLink="/tickets/create"
          class="bg-blue-600 px-4 py-2 rounded">
          Create New Ticket
        </button>
      </div>


      <div *ngIf="store.isLoading()" class="text-gray-500">
        Loading tickets...
      </div>

      <div
        *ngIf="!store.isLoading() && store.allTickets().length === 0"
        class="text-gray-500"
      >
        No tickets found.
      </div>

      <label class="block mb-2 font-medium">Filter by Status:</label>
      <select [(ngModel)]="selectedStatus" (ngModelChange)="filteredTickets()" class="mb-4 p-2 border rounded">
        <option value="">All</option>
        <option *ngFor="let s of statuses" [value]="s">{{ s }}</option>
      </select>

      <table class="min-w-full border">
        <thead>
        <tr class="bg-gray-100">
          <th class="border px-4 py-2 text-left">ID</th>
          <th class="border px-4 py-2 text-left">Title</th>
          <th class="border px-4 py-2 text-left">Description</th>
          <th class="border px-4 py-2 text-left">Status</th>
          <th class="border px-4 py-2 text-left">Created At</th>
          <th class="border px-4 py-2 text-left">Updated At</th>
        </tr>
        </thead>
        <tbody>
        <tr *ngFor="let ticket of filteredTickets(); trackBy: trackById">
          <td class="border px-4 py-2">{{ ticket.title }}</td>
          <td class="border px-4 py-2">{{ ticket.title }}</td>
          <td class="border px-4 py-2">{{ ticket.title }}</td>
          <td class="border px-4 py-2">{{ ticket.status }}</td>
          <td class="border px-4 py-2">{{ ticket.createdAt | date:'short' }}</td>
          <td class="border px-4 py-2">{{ ticket.updatedAt | date:'short' }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  `,
  imports: [CommonModule, RouterModule, FormsModule],
})
export class TicketListComponent implements OnInit {
  store = inject(TicketStore);
  selectedStatus = '';
  statuses = ['new', 'assigned', 'in_progress', 'resolved', 'closed'];

  ngOnInit() {
    this.store.loadTickets();
  }

  trackById(index: number, ticket: Ticket) {
    return ticket.id;
  }

  filteredTickets = computed(() => {
    let all = this.store.allTickets();
    const dummyTickets: Ticket[] = [
      {
        id: '1',
        title: 'Ticket Title',
        description: 'Does this work?',
        status: 'new',
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: '',
        comments: [],
      },
      {
        id: '2',
        title: 'Ticket Title',
        description: 'Does this work?',
        status: 'closed',
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: '',
        comments: [],
      },
      // Add more dummy tickets here
    ];

    if (all.length === 0) {
      all = dummyTickets;
    }
    return this.selectedStatus ? all.filter(t => t.status === this.selectedStatus) : all;
  });
}
