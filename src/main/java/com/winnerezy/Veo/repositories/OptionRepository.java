package com.winnerezy.Veo.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.winnerezy.Veo.models.Option;

@Repository
public interface OptionRepository extends JpaRepository<Option, String> {
    Optional<Option> findByPollIdAndId(String pollId, String id);

    boolean existsByPollIdAndVotesContaining(String pollId, String voteId);

    List<Option> findAllByPollId(String pollId);

    void deleteByPollId(String pollId);
}
