import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TicketService } from './ticket.service';

@Component({
  standalone: true,
  selector: 'app-ticket-create',
  template: `
    <div class="p-6 max-w-xl mx-auto">
      <h2 class="text-xl font-bold mb-4">Create New Ticket</h2>
      <form [formGroup]="form" (ngSubmit)="submit()">
        <input
          formControlName="title"
          placeholder="Title"
          class="w-full mb-3 p-2 border rounded"
        />
        <textarea
          formControlName="description"
          placeholder="Description"
          class="w-full mb-3 p-2 border rounded"
        ></textarea>
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">
          Create
        </button>
      </form>
    </div>
  `,
  imports: [CommonModule, ReactiveFormsModule],
})
export class TicketCreateComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private ticketService = inject(TicketService);

  form = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
  });

  submit() {
    if (this.form.valid) {
      const ticketData = {
        title: this.form.value.title ?? '',
        description: this.form.value.description ?? '',
      };
      this.ticketService.createTicket(ticketData).subscribe(() => {
        this.router.navigate(['/tickets']);
      });
    }
  }
}
