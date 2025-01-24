package com.winnerezy.Veo.dto;

import com.winnerezy.Veo.models.Option;
import com.winnerezy.Veo.models.User;
import jakarta.validation.constraints.*;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

@Data
public class PollDTO {

    @NotBlank(message = "title cannot be blank")
    @Size(max = 40, message = "Maximum length of 40 characters")
    private String title;

    @NotNull(message = "ending cannot be null")
    @Future(message = "Ending must be in the future")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private Date ending;

    @NotEmpty(message = "options cannot be empty")
    private List<Option> options;
}
