package com.objectdata.supportdesk.security.services;

import com.objectdata.supportdesk.models.Ticket;

import java.util.List;

public interface TicketService {
    Ticket saveTicket(Ticket ticket);
    Ticket getTicketById(long id);
    void deleteTicket(long id);
    List<Ticket> getAllTickets();
}

