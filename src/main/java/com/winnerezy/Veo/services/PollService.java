package com.winnerezy.Veo.services;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import com.winnerezy.Veo.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import com.winnerezy.Veo.dto.PollDTO;
import com.winnerezy.Veo.exceptions.NoPollFound;
import com.winnerezy.Veo.models.Option;
import com.winnerezy.Veo.models.Poll;
import com.winnerezy.Veo.models.User;
import com.winnerezy.Veo.repositories.OptionRepository;
import com.winnerezy.Veo.repositories.PollRepository;

@Service
@Slf4j
public class PollService {

    private final PollRepository pollRepository;

    private final UserService userService;

    private final OptionRepository optionRepository;

    private final UserRepository userRepository;

    public PollService(PollRepository pollRepository, UserService userService, OptionRepository optionRepository, UserRepository userRepository) {
        this.pollRepository = pollRepository;
        this.userService = userService;
        this.optionRepository = optionRepository;
        this.userRepository = userRepository;
    }

    public List<Poll> getPolls() {
        List<Poll> polls = pollRepository.findByUser(userService.getCurrentUser());
        if (polls.isEmpty()) {
            return Collections.emptyList();
        }
        return polls;
    }

    public Poll getPoll(String pollId) {
        return pollRepository.findById(pollId).orElse(null);
    }

    public Poll createPoll(PollDTO pollDTO) {

        Poll poll = new Poll();
        poll.setTitle(pollDTO.getTitle());
        poll.setUser(userService.getCurrentUser());
        poll.setEnding(pollDTO.getEnding());

        Poll createdPoll = pollRepository.save(poll);
        List<Option> options = pollDTO.getOptions();

        options.forEach(option -> {

            option.setName(option.getName());

            option.setPoll(poll);
        });
        optionRepository.saveAll(options);

        return createdPoll;
    }

    public String deletePoll(String pollId) {

        Poll poll = pollRepository.findById(pollId).orElse(null);

        if (poll == null) {
            return "Poll Not Found";
        }

        if (!poll.getUser().equals(userService.getCurrentUser())) {
            return "You don't have permission to delete this poll";
        }

        pollRepository.deleteById(pollId);

        List<Option> options = optionRepository.findAllByPollId(pollId);

        options.forEach(option -> {
            optionRepository.deleteByPollId(pollId);
        });

        return "Deleted Sucessfully";
    }

    public Poll editPoll(String pollId, PollDTO pollDTO) {

        Poll poll = pollRepository.findById(pollId).orElseThrow(() -> new RuntimeException("Poll User Found"));

        poll.setTitle(pollDTO.getTitle());

        poll.setEnding(pollDTO.getEnding());

        List<Option> options = pollDTO.getOptions();

        options.forEach(option -> {
            option.setName(option.getName());
            option.setPoll(poll);
            option.setId(option.getId());
            optionRepository.save(option);
        });
        return pollRepository.save(poll);
    }

    public String votePoll(String id, String optionId) {

        Poll poll = pollRepository.findById(id).orElseThrow(() -> new RuntimeException("Poll Not Found"));

        Option option = optionRepository.findById(optionId).orElseThrow(() -> new RuntimeException("Option Not Found"));

        User user = userService.getCurrentUser();

        if (poll.getEnding().isBefore(LocalDateTime.now())) {
            return "Poll Ended";
        }

        log.info("vote poll start");

        boolean userVoted = optionRepository.hasUserVoted(user.getId(), id);

        log.info("user has voted {}", userVoted);

        if(userVoted){
            log.info("Already Voted");
            throw new RuntimeException("User Already Voted");
        }
        user.getOptions().add(option);

        userRepository.save(user);
        log.info("poll {}", poll.getId());
        return "Voted Successfully";
    }

    public List<Option> getVotes(String pollId){
        Poll poll = pollRepository.findById(pollId).orElseThrow(() -> new NoPollFound("No Poll Found"));

        return poll.getOptions();
    }
}
