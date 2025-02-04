package com.winnerezy.Veo.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.winnerezy.Veo.dto.PollDTO;
import com.winnerezy.Veo.models.Poll;
import com.winnerezy.Veo.responses.ApiErrorResponse;
import com.winnerezy.Veo.services.PollService;

import jakarta.validation.Valid;

@RequestMapping( "api/v1/polls")
@RestController
public class PollController {

    private final PollService pollService;

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

    @PutMapping("/edit/{pollId}")
    public ResponseEntity<?> editPoll(@PathVariable("pollId") String pollId, @Valid @RequestBody PollDTO pollDTO) {
        try {
            Poll poll = pollService.editPoll(pollId, pollDTO);
            return ResponseEntity.ok(poll);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiErrorResponse(e.getMessage()));
        }
    }

    @DeleteMapping("/delete/{pollId}")
    public ResponseEntity<?> deletePoll(@PathVariable("pollId") String pollId) {
        try {
            String delete = pollService.deletePoll(pollId);
            return ResponseEntity.ok(delete);
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
}
