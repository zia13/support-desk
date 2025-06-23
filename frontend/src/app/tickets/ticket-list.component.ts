import {Component, computed, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TicketStore } from './ticket.store';
import { Ticket } from '../core/models/ticket.model';
import {FormsModule} from "@angular/forms";

@Component({
  standalone: true,
  selector: 'app-ticket-list',
  styleUrls: ['./ticket-list.component.css'],
  templateUrl: './ticket-list.component.html',
  imports: [CommonModule, RouterModule, FormsModule],
})
export class TicketListComponent implements OnInit {
  store = inject(TicketStore);
  selectedStatus = '';
  statuses = ['New', 'Assigned', 'In Progress', 'Resolved', 'Closed'];

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
