import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {
    // Initialize with sample data or fetch from service
    this.loadDashboardStats();
  }

  loadDashboardStats() {
    // TODO: Replace with actual service calls
    this.totalTickets = 120;
    this.openTickets = 45;
    this.closedTickets = 75;
  }
}
