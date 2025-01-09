package com.winnerezy.Veo.controllers;

import com.winnerezy.Veo.dto.PollDTO;
import com.winnerezy.Veo.models.Poll;
import com.winnerezy.Veo.services.PollService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping(value = "api/v1/poll", method = RequestMethod.POST)
@RestController
public class PollController {

    @Autowired
    private PollService pollService;

    @GetMapping("/")
    public ResponseEntity<List<Poll>> getPolls() {
        try {
            List<Poll> polls = pollService.getPolls();
            return ResponseEntity.ok(polls);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @PostMapping("/create")
    public ResponseEntity<Poll> createPoll(@RequestBody @Valid PollDTO poll) {
        try {
            Poll createdPoll = pollService.createPoll(poll);
            return ResponseEntity.ok(createdPoll);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @PostMapping("/{id}/vote/{optionId}")
    public ResponseEntity<String> votePoll(@PathVariable("id") String id, @PathVariable("optionId") String optionId) {
        try {
            String votePoll = pollService.votePoll(id, optionId);

            if(votePoll.equals("Poll Expired")){
                return ResponseEntity.status(401).body(votePoll);
            }
            return ResponseEntity.ok(votePoll);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePoll(@PathVariable("id") String id) {
        try {
            String response = pollService.deletePoll(id);

            if(response.equals("Poll Not Found")){
                return ResponseEntity.status(404).body(response);
            }

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
}
