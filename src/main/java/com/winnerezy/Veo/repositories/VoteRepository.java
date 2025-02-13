package com.winnerezy.Veo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.winnerezy.Veo.models.Vote;

@Repository
public interface VoteRepository extends JpaRepository<Vote, String> {
    boolean existsByUserIdAndPollId(String userId, String pollId);
}