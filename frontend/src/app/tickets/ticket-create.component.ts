import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TicketService } from './ticket.service';

@Component({
  standalone: true,
  selector: 'app-ticket-create',
  template: `
    <div class="min-h-screen bg-gray-50 flex items-center justify-center">
      <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl">
        <h2 class="text-2xl font-bold mb-6 text-gray-800 text-center">Create New Ticket</h2>
        <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-5">
          <div>
            <label class="block mb-2 font-semibold text-gray-700">Title</label>
            <input
              formControlName="title"
              placeholder="Title"
              class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <div *ngIf="form.get('title')?.invalid && form.get('title')?.touched" class="text-red-600 text-sm mt-1">
              Title is required.
            </div>
          </div>
          <div>
            <label class="block mb-2 font-semibold text-gray-700">Description</label>
            <textarea
              formControlName="description"
              placeholder="Description"
              rows="4"
              class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            ></textarea>
            <div *ngIf="form.get('description')?.invalid && form.get('description')?.touched"
                 class="text-red-600 text-sm mt-1">
              Description is required.
            </div>
          </div>
          <div>
            <label class="block mb-2 font-semibold text-gray-700">Status</label>
            <select formControlName="status" class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition">
              <option value="">Select status</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
            <div *ngIf="form.get('status')?.invalid && form.get('status')?.touched" class="text-red-600 text-sm mt-1">
              Status is required.
            </div>
          </div>
          <div>
            <label class="block mb-2 font-semibold text-gray-700">Created By</label>
            <input
              formControlName="createdBy"
              placeholder="Created By"
              class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <div *ngIf="form.get('createdBy')?.invalid && form.get('createdBy')?.touched" class="text-red-600 text-sm mt-1">
              Created By is required.
            </div>
          </div>
          <div>
            <label class="block mb-2 font-semibold text-gray-700">Assigned To</label>
            <input
              formControlName="assignedTo"
              placeholder="Assigned To"
              class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <div>
            <label class="block mb-2 font-semibold text-gray-700">Created At</label>
            <input
              type="datetime-local"
              formControlName="createdAt"
              class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <div *ngIf="form.get('createdAt')?.invalid && form.get('createdAt')?.touched" class="text-red-600 text-sm mt-1">
              Created At is required.
            </div>
          </div>
          <div>
            <label class="block mb-2 font-semibold text-gray-700">Updated At</label>
            <input
              type="datetime-local"
              formControlName="updatedAt"
              class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <div *ngIf="form.get('updatedAt')?.invalid && form.get('updatedAt')?.touched" class="text-red-600 text-sm mt-1">
              Updated At is required.
            </div>
          </div>
          <div>
            <label class="block mb-2 font-semibold text-gray-700">Comments</label>
            <textarea
              formControlName="comments"
              placeholder="Comments (comma separated)"
              rows="2"
              class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            ></textarea>
          </div>
          <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 font-semibold py-3 rounded transition disabled:opacity-50"
            [disabled]="form.invalid"
          >
            Create
          </button>
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
