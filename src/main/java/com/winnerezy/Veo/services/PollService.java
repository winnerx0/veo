package com.winnerezy.Veo.services;

import com.winnerezy.Veo.dto.PollDTO;
import com.winnerezy.Veo.models.Option;
import com.winnerezy.Veo.models.Poll;
import com.winnerezy.Veo.repositories.OptionRepository;
import com.winnerezy.Veo.repositories.PollRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PollService {

    @Autowired
    private PollRepository pollRepository;

    @Autowired
    private UserService userService;
    @Autowired
    private OptionRepository optionRepository;

    public Poll createPoll(PollDTO pollDTO){
        try {
            Poll poll = new Poll();
            poll.setTitle(pollDTO.getTitle());
            poll.setUser(userService.getCurrentUser());

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

}
