package com.winnerezy.Veo.services;

import com.winnerezy.Veo.dto.PollDTO;
import com.winnerezy.Veo.models.Option;
import com.winnerezy.Veo.models.Poll;
import com.winnerezy.Veo.models.User;
import com.winnerezy.Veo.repositories.OptionRepository;
import com.winnerezy.Veo.repositories.PollRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PollService {

    @Autowired
    private PollRepository pollRepository;

    @Autowired
    private UserService userService;
    @Autowired
    private OptionRepository optionRepository;

    public Poll createPoll(PollDTO pollDTO) {
        try {
            Poll poll = new Poll();
            poll.setTitle(pollDTO.getTitle());
            poll.setUser(userService.getCurrentUser());
            poll.setEnding(pollDTO.getEnding());

            Poll createdPoll = pollRepository.save(poll);

            System.out.println("Saving poll: " + createdPoll);

            List<Option> options = pollDTO.getOptions();

            options.forEach(option -> {
                Option newOption = new Option();
                newOption.setName(option.getName());
                newOption.setPoll(createdPoll);
                System.out.println(newOption);
                optionRepository.save(newOption);
            });

            return createdPoll;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new RuntimeException();
        }

    }

    public String votePoll(long id, long optionId) {
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

    public String deletePoll(long id) {
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
