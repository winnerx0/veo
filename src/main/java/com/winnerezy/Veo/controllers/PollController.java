package com.winnerezy.Veo.controllers;

import com.winnerezy.Veo.dto.PollDTO;
import com.winnerezy.Veo.models.Poll;
import com.winnerezy.Veo.services.PollService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/poll")
@RestController
public class PollController {

    @Autowired
    private PollService pollService;

    @PostMapping("/create")
    public ResponseEntity<Poll> createPoll(@RequestBody PollDTO poll) {
        try {
            System.out.println("Request received: " + poll);
            Poll createdPoll = pollService.createPoll(poll);
            System.out.println("Poll created: " + createdPoll);
            return ResponseEntity.ok(createdPoll);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

}
