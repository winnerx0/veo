package com.winnerezy.Veo.controllers;

import com.winnerezy.Veo.responses.ApiErrorResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.winnerezy.Veo.dto.PollDTO;
import com.winnerezy.Veo.models.Poll;
import com.winnerezy.Veo.services.PollService;

import java.util.Date;

@RequestMapping( "api/v1/polls")
@RestController
public class PollController {

    private final  PollService pollService;

    public PollController(PollService pollService){
        this.pollService = pollService;
    }

    @GetMapping("/")
    public ResponseEntity<Poll[]> getPolls() {
        try {
            Poll[] polls = pollService.getPolls();
            return ResponseEntity.ok(polls);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/{pollId}")
    public ResponseEntity<?> getPoll(@PathVariable("pollId") String pollId) {
        try {
            Poll poll = pollService.getPoll(pollId);
            return ResponseEntity.ok(poll);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiErrorResponse(e.getMessage()));
        }
    }

    @PostMapping("/create")
    public ResponseEntity<Poll> createPoll(@Valid @RequestBody PollDTO pollDTO) {

        Poll createdPoll = pollService.createPoll(pollDTO);
        return ResponseEntity.ok(createdPoll);
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
