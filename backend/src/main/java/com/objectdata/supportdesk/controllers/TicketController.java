package com.objectdata.supportdesk.controllers;

import com.objectdata.supportdesk.models.Ticket;
import com.objectdata.supportdesk.security.services.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")
@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @PostMapping()
    public Ticket createTicket(@RequestBody Ticket ticket) {
        return ticketService.saveTicket(ticket);
    }

    @GetMapping("/{id}")
    public Ticket getTicketById(@PathVariable("id") Long id) {
        return ticketService.getTicketById(id);
    }

    @PutMapping("/{id}")
    public Ticket updateTicket(@PathVariable("id") Long id, @RequestBody Ticket ticket) {
        Ticket existingTicket = ticketService.getTicketById(id);
        existingTicket.setTitle(ticket.getTitle());
        existingTicket.setDescription(ticket.getDescription());
        return ticketService.saveTicket(existingTicket);
    }

    @DeleteMapping("/{id}")
    public void deleteTicket(@PathVariable("id") Long id) {
        ticketService.deleteTicket(id);
    }

    @GetMapping()
    public List<Ticket> getAllTickets() {
        return ticketService.getAllTickets();
    }
}