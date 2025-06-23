import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TicketStore } from './ticket.store';
import { Ticket } from '../core/models/ticket.model';

@Component({
  standalone: true,
  selector: 'app-ticket-detail',
  template: `
    <div class="p-6" *ngIf="ticket">
      <h2 class="text-xl font-bold mb-2">{{ ticket.title }}</h2>
      <p class="mb-2">{{ ticket.description }}</p>
      <p class="text-sm text-gray-600">Status: {{ ticket.status }}</p>
      <p class="text-sm text-gray-500">
        Updated: {{ ticket.updatedAt | date : 'short' }}
      </p>
    </div>
  `,
  imports: [CommonModule],
})
export class TicketDetailComponent {
  private route = inject(ActivatedRoute);
  private store = inject(TicketStore);
  ticket: Ticket | undefined = {
    id: '55',
    title: 'Ticket Title',
    description: 'Does this work?',
    status: 'new',
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: '',
    comments: [],
  };

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    this.store.loadTickets();
    // this.ticket = this.store.allTickets().find((t) => t.id === id!);
  }
}
