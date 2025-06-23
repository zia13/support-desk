import {Component, computed, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormBuilder, Validators, FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { TicketService } from './ticket.service';
import {Ticket} from "../core/models/ticket.model";
import {TicketStore} from "./ticket.store";

@Component({
  standalone: true,
  selector: 'app-ticket-create',
  styleUrls: ['./ticket-create.component.css'],
  templateUrl: './ticket-create.component.html',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class TicketCreateComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private ticketService = inject(TicketService);
  selectedStatus = '';
  statuses = ['New', 'Assigned', 'In Progress', 'Resolved', 'Closed'];
  store = inject(TicketStore);

  form = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    status: ['', Validators.required],
    createdBy: ['', Validators.required],
    assignedTo: [''],
    createdAt: [new Date(), Validators.required],
    updatedAt: [new Date(), Validators.required],
    comments: [[]],
  });

  submit() {
    if (this.form.valid) {
      const ticketData = {
        title: this.form.value.title ?? '',
        description: this.form.value.description ?? '',
        status: this.form.value.status ?? '',
        createdBy: this.form.value.createdBy ?? '',
        assignedTo: this.form.value.assignedTo ?? '',
        createdAt: this.form.value.createdAt ?? new Date(),
        updatedAt: this.form.value.updatedAt ?? new Date(),
        comments: this.form.value.comments ?? [],
      };
      this.ticketService.createTicket(ticketData).subscribe(() => {
        this.router.navigate(['/tickets']);
      });
    }
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
    ];

    if (all.length === 0) {
      all = dummyTickets;
    }
    return this.selectedStatus ? all.filter(t => t.status === this.selectedStatus) : all;
  });
}
