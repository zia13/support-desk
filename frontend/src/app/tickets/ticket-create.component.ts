import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TicketService } from './ticket.service';

@Component({
  standalone: true,
  selector: 'app-ticket-create',
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div class="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-2xl">
        <h2 class="text-3xl font-bold mb-8 text-center text-gray-800">🎫 Create New Ticket</h2>
        <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-6">

          <!-- Title -->
          <div>
            <label class="block text-gray-700 font-medium mb-2">Title</label>
            <input
              formControlName="title"
              placeholder="Enter title"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            />
            <p *ngIf="form.get('title')?.invalid && form.get('title')?.touched" class="text-red-600 text-sm mt-1">
              Title is required.
            </p>
          </div>

          <!-- Description -->
          <div>
            <label class="block text-gray-700 font-medium mb-2">Description</label>
            <input
              formControlName="description"
              placeholder="Enter description"
              rows="4"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            />
            <p *ngIf="form.get('description')?.invalid && form.get('description')?.touched" class="text-red-600 text-sm mt-1">
              Description is required.
            </p>
          </div>

          <!-- Status -->
          <div>
            <label class="block text-gray-700 font-medium mb-2">Status</label>
            <select
              formControlName="status"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            >
              <option value="">Select status</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
            <p *ngIf="form.get('status')?.invalid && form.get('status')?.touched" class="text-red-600 text-sm mt-1">
              Status is required.
            </p>
          </div>

          <!-- Created By -->
          <div>
            <label class="block text-gray-700 font-medium mb-2">Created By</label>
            <input
              formControlName="createdBy"
              placeholder="Enter creator's name"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            />
            <p *ngIf="form.get('createdBy')?.invalid && form.get('createdBy')?.touched" class="text-red-600 text-sm mt-1">
              Created By is required.
            </p>
          </div>

          <!-- Assigned To -->
          <div>
            <label class="block text-gray-700 font-medium mb-2">Assigned To</label>
            <input
              formControlName="assignedTo"
              placeholder="Enter assignee's name"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            />
          </div>

          <!-- Created At -->
          <div>
            <label class="block text-gray-700 font-medium mb-2">Created At</label>
            <input
              type="datetime-local"
              formControlName="createdAt"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            />
            <p *ngIf="form.get('createdAt')?.invalid && form.get('createdAt')?.touched" class="text-red-600 text-sm mt-1">
              Created At is required.
            </p>
          </div>

          <!-- Updated At -->
          <div>
            <label class="block text-gray-700 font-medium mb-2">Updated At</label>
            <input
              type="datetime-local"
              formControlName="updatedAt"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            />
            <p *ngIf="form.get('updatedAt')?.invalid && form.get('updatedAt')?.touched" class="text-red-600 text-sm mt-1">
              Updated At is required.
            </p>
          </div>

          <!-- Comments -->
          <div>
            <label class="block text-gray-700 font-medium mb-2">Comments</label>
            <textarea
              formControlName="comments"
              placeholder="Add comments (comma separated)"
              rows="3"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            ></textarea>
          </div>

          <!-- Submit Button -->
          <div>
            <button
              type="submit"
              class="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
              [disabled]="form.invalid"
            >
              🚀 Create Ticket
            </button>
          </div>

        </form>
      </div>
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
}
