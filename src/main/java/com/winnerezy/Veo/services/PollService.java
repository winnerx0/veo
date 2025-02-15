package com.winnerezy.Veo.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.winnerezy.Veo.dto.PollDTO;
import com.winnerezy.Veo.models.Option;
import com.winnerezy.Veo.models.Poll;
import com.winnerezy.Veo.models.User;
import com.winnerezy.Veo.models.Vote;
import com.winnerezy.Veo.repositories.OptionRepository;
import com.winnerezy.Veo.repositories.PollRepository;
import com.winnerezy.Veo.repositories.VoteRepository;

@Service
public class PollService {

    private final PollRepository pollRepository;

    private final UserService userService;

    private final OptionRepository optionRepository;

    private final VoteRepository voteRepository;

    public PollService(PollRepository pollRepository, VoteRepository voteRepository, UserService userService, OptionRepository optionRepository) {
        this.pollRepository = pollRepository;
        this.userService = userService;
        this.optionRepository = optionRepository;
        this.voteRepository = voteRepository;

    }

    public Poll[] getPolls() {
        Poll[] polls = pollRepository.findByUser(userService.getCurrentUser());
        if (polls == null) {
            return new Poll[0];
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

        Poll poll = pollRepository.findById(pollId).orElseThrow(() -> new RuntimeException("No User Found"));

        poll.setTitle(pollDTO.getTitle());

        poll.setEnding(pollDTO.getEnding());

        List<Option> options = poll.getOptions();

        List<Option> updatedOptions = new ArrayList<>();

        for (Option newOption : pollDTO.getOptions()) {
            Optional<Option> existingOption = options.stream()
                    .filter(o -> o.getId().equals(newOption.getId()))
                    .findFirst();

            if (existingOption.isPresent()) {
                Option opt = existingOption.get();
                opt.setName(newOption.getName());
                updatedOptions.add(opt);
            } else {
                newOption.setPoll(poll);
                updatedOptions.add(newOption);
            }
            updatedOptions.forEach(option -> option.setPoll(poll));


        }
        poll.setOptions(updatedOptions);
        return pollRepository.save(poll);
    }

    public String votePoll(String id, String optionId) {
        Poll poll = pollRepository.findById(id).orElseThrow();

        User user = userService.getCurrentUser();

        if (poll.getEnding().isBefore(LocalDateTime.now())) {
            return "Poll Ended";
        }

        Option option = optionRepository.findByPollIdAndId(id, optionId).orElseThrow();

        boolean hasVoted = voteRepository.existsByUserIdAndPollId(userService.getCurrentUser().getId(), poll.getId());

        if (hasVoted) {
            throw new RuntimeException("User Already Voted");
        } else {
            Vote newVote = new Vote();
            newVote.setUserId(user.getId());
            newVote.setOption(option);
            newVote.setPoll(poll);
            voteRepository.save(newVote);
            option.getVotes().add(newVote);
            optionRepository.save(option);
            return "Voted Successfully";
        }
    }
}
