import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Ticket} from '../core/models/ticket.model';
import {AppConstants} from "../_helpers/app.constants";
import {TicketCreateComponent} from "./ticket-create.component";
import {catchError} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class TicketService {
  private TICKET_API = AppConstants.API_BASE_URL + '/tickets';

  constructor(private http: HttpClient) {
  }

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.TICKET_API);
  }

  getTicketsByUser(userId: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.TICKET_API}?assignedTo=${encodeURIComponent(userId)}`);
  }

  createTicket(ticket: {
    title: string;
    description: string;
    assignedTo: string;
    status: string;
    comments: any[];
    createdBy: string;
    createdAt: Date;
    updatedAt: Date
  }): Observable<Ticket> {
    return this.http.post<Ticket>(this.TICKET_API, ticket).pipe(
      catchError(() => of({...ticket, id: ''} as Ticket))
    );

  }

  updateTicket(id: string, changes: Partial<Ticket>): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.TICKET_API}/${id}`, changes);
  }
}
