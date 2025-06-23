import {Component, OnInit, signal} from '@angular/core';
import {TicketService} from "../tickets/ticket.service";
import {Ticket} from "../core/models/ticket.model";

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // Example properties to show in dashboard
  totalTickets: number = 0;
  openTickets: number = 0;
  closedTickets: number = 0;
  private tickets = signal<Ticket[]>([]);


  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.loadDashboardStats();
  }

  loadDashboardStats() {
    // this.totalTickets = 120;
    // this.openTickets = 45;
    // this.closedTickets = 75;

    const userId = localStorage.getItem('userId');
    this.ticketService.getTickets().subscribe({
      next: (tickets) => {
        this.totalTickets = tickets.length
        this.openTickets = tickets.filter(ticket => ticket.status === 'open').length;
        this.closedTickets = tickets.filter(ticket => ticket.status === 'closed').length;
      },
    });

  }
}
