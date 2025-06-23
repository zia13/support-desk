import { Routes } from '@angular/router';
import { TicketListComponent } from './ticket-list.component';
import { TicketDetailComponent } from './ticket-detail.component';
import { TicketCreateComponent } from './ticket-create.component';

export const TICKET_ROUTES: Routes = [
  { path: '', component: TicketListComponent },
  { path: 'create', component: TicketCreateComponent },
  { path: ':id', component: TicketDetailComponent },
];
