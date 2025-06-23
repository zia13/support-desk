package com.objectdata.supportdesk.security.services;

import com.objectdata.supportdesk.models.Ticket;
import com.objectdata.supportdesk.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketServiceImpl implements TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    @Override
    public Ticket saveTicket(Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    @Override
    public Ticket getTicketById(long id) {
        return ticketRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteTicket(long id) {
        ticketRepository.deleteById(id);
    }

    @Override
    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }
}