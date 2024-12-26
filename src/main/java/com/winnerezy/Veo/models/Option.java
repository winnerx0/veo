package com.winnerezy.Veo.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "option")
@Getter
@Setter
@NoArgsConstructor

public class Option {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "votes")
    private int votes = 0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "poll_id", nullable = false)
    private Poll poll;
}
