package com.winnerezy.Veo.dto;

import com.winnerezy.Veo.models.Option;
import com.winnerezy.Veo.models.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class PollDTO {

    @NotBlank(message = "title cannot be blank")
    @NotEmpty(message = "title cannot be empty")
    private String title;

    private Date ending;

    @NotBlank(message = "options cannot be blank")
    @NotEmpty(message = "options cannot be empty")
    private List<Option> options;
}
