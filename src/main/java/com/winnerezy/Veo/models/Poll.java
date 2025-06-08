package com.winnerezy.Veo.models;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import org.springframework.format.annotation.DateTimeFormat;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "polls")
@Getter
@Setter
@NoArgsConstructor

public class Poll {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column
    private String title;

    @Column
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime ending;

    @OneToMany(mappedBy = "poll", cascade = CascadeType.ALL)
    private List<Option> options = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    @JsonIncludeProperties("id")
    private User user;

    public void setEnding(LocalDateTime ending){
        this.ending = ending.atZone(ZoneId.systemDefault()).toLocalDateTime();
    }
}
