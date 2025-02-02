package com.winnerezy.Veo.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.winnerezy.Veo.dto.PollDTO;
import com.winnerezy.Veo.models.Option;
import com.winnerezy.Veo.models.Poll;
import com.winnerezy.Veo.models.User;
import com.winnerezy.Veo.repositories.OptionRepository;
import com.winnerezy.Veo.repositories.PollRepository;

@Service
public class PollService {

    private final PollRepository pollRepository;

    private final UserService userService;

    private final OptionRepository optionRepository;

    public PollService(PollRepository pollRepository, UserService userService, OptionRepository optionRepository) {
      this.pollRepository = pollRepository;
      this.userService = userService;
      this.optionRepository = optionRepository;

    }

    public Poll[] getPolls() {
        Poll[] polls = pollRepository.findByUser(userService.getCurrentUser());
        if(polls == null){
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
            Option newOption = new Option();
            newOption.setName(option.getName());
            newOption.setPoll(createdPoll);
            System.out.println(newOption);
            optionRepository.save(newOption);
        });

        return createdPoll;
    }

    public String votePoll(String id, String optionId) {
        Poll poll = pollRepository.findById(id).orElseThrow();

        User user = userService.getCurrentUser();

        if(poll.getEnding().isBefore(LocalDateTime.now())){
            return "Poll Ended";
        }

        Option option = optionRepository.findByPollIdAndId(id, optionId).orElseThrow();

        boolean hasVoted = optionRepository.existsByPollIdAndVotesContaining(poll.getId(), userService.getCurrentUser().getEmail());

        if(hasVoted){
            throw new RuntimeException("User Already Voted");
        } else {
            option.getVotes().add(user.getEmail());
            optionRepository.save(option);
            return "Voted Successfully";
        }
    }

    public String deletePoll(String id) {
     try {
         Poll poll = pollRepository.findById(id).orElse(null);

         if(poll == null){
             return "Poll Not Found";
         }

         if(!poll.getUser().equals(userService.getCurrentUser())){
             return "You don't have permission to delete this poll";
         }
         pollRepository.deleteById(id);
         return "Poll Deleted";
     } catch (Exception e) {
         return e.getMessage();
     }
    }
}
