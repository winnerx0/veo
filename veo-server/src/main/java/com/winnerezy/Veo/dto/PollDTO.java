package com.winnerezy.Veo.dto;

import com.winnerezy.Veo.models.Option;
import com.winnerezy.Veo.models.User;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class PollDTO {

    private String title;
    private User user;
    private Date ending;
    private List<Option> options;
}
