import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TicketStore } from './ticket.store';
import { Ticket } from '../core/models/ticket.model';

@Component({
  standalone: true,
  selector: 'app-ticket-list',
  template: `
    <div class="p-6">
      <h2 class="text-xl font-semibold mb-4">Your Tickets</h2>

      <div *ngIf="store.isLoading()" class="text-gray-500">
        Loading tickets...
      </div>

      <div
        *ngIf="!store.isLoading() && store.allTickets().length === 0"
        class="text-gray-500"
      >
        No tickets found.
      </div>

      <ul *ngIf="!store.isLoading()" class="space-y-2">
        <li
          *ngFor="let ticket of store.allTickets(); trackBy: trackById"
          class="border rounded p-4 shadow"
        >
          <div class="font-medium text-lg">{{ ticket.title }}</div>
          <div class="text-sm text-gray-600">Status: {{ ticket.status }}</div>
          <div class="text-sm text-gray-500">
            Created: {{ ticket.createdAt | date : 'short' }}
          </div>
        </li>
      </ul>
    </div>
  `,
  imports: [CommonModule, RouterModule],
})
export class TicketListComponent implements OnInit {
  store = inject(TicketStore);

  ngOnInit() {
    this.store.loadTickets();
  }

  trackById(index: number, ticket: Ticket) {
    return ticket.id;
  }
}
