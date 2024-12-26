package com.winnerezy.Veo.repositories;

import java.util.Optional;

import com.winnerezy.Veo.models.Poll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.winnerezy.Veo.models.User;

@Repository
public interface PollRepository extends JpaRepository<Poll, Long> {

}
