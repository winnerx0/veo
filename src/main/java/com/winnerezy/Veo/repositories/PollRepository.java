package com.winnerezy.Veo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.winnerezy.Veo.models.Poll;
import com.winnerezy.Veo.models.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface PollRepository extends JpaRepository<Poll, String> {

    List<Poll> findByUser(User user);

}
