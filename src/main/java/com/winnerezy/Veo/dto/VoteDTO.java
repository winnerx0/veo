package com.winnerezy.Veo.dto;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class VoteDTO {
    String votename;

    List<Integer> votes = new ArrayList<>();
}
