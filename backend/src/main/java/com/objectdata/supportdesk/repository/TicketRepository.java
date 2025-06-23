package com.objectdata.supportdesk.repository;


import com.objectdata.supportdesk.models.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    
}