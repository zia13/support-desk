package com.objectdata.supportdesk.models;

import jakarta.persistence.*;

@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String message;

    @ManyToOne
    @JoinColumn(name="ticket_id", nullable=false)
    private Ticket ticket;

}