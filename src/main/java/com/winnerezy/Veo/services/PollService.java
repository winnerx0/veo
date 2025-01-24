package com.winnerezy.Veo.services;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.winnerezy.Veo.dto.PollDTO;
import com.winnerezy.Veo.models.Option;
import com.winnerezy.Veo.models.Poll;
import com.winnerezy.Veo.models.User;
import com.winnerezy.Veo.repositories.OptionRepository;
import com.winnerezy.Veo.repositories.PollRepository;

@Service
public class PollService {

    @Autowired
    private PollRepository pollRepository;

    @Autowired
    private UserService userService;
    @Autowired
    private OptionRepository optionRepository;

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
        try {

            Poll poll = pollRepository.findById(id).orElseThrow();

             Option option = optionRepository.findByPollIdAndId(id, optionId).orElseThrow();

             User user = userService.getCurrentUser();

             if(poll.getEnding().before(new Date())){
                 return "Poll Expired";
             }

            if(option.getVotes().contains(user.getEmail())){
                option.setVotes(option.getVotes().stream().filter(vote -> !vote.equals(user.getEmail())).collect(Collectors.toList()));
                optionRepository.save(option);
                return "Unvoted Successfully";
            } else {
                option.getVotes().add(user.getEmail());
                optionRepository.save(option);
                return "Voted Successfully";
            }

        } catch (Exception e) {
            return e.getMessage();
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
