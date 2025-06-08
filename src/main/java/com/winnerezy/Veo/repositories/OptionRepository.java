package com.winnerezy.Veo.repositories;

import java.util.List;
import java.util.Optional;

import com.winnerezy.Veo.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.winnerezy.Veo.models.Option;

@Repository
public interface OptionRepository extends JpaRepository<Option, String> {
    Optional<Option> findByPollIdAndId(String pollId, String id);

    List<Option> findAllByPollId(String pollId);

    void deleteByPollId(String pollId);

    @Query("SELECT COUNT(u) > 0 FROM User u JOIN u.options o WHERE u.id = :userId AND o.poll.id = :pollId")
    boolean hasUserVoted(@Param("userId") String userId, @Param("pollId") String pollId);

}


