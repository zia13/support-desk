import { Injectable, signal, computed } from '@angular/core';
import { Ticket } from '../core/models/ticket.model';
import { TicketService } from './ticket.service';

@Injectable({ providedIn: 'root' })
export class TicketStore {
  private tickets = signal<Ticket[]>([]);
  private loading = signal(false);

  readonly allTickets = computed(() => this.tickets());
  readonly isLoading = computed(() => this.loading());

  constructor(private ticketService: TicketService) {}

  loadTickets() {
    this.loading.set(true);
    this.ticketService.getTickets().subscribe({
      next: (tickets) => this.tickets.set(tickets),
      complete: () => this.loading.set(false),
    });
  }
}
