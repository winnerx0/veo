package com.winnerezy.Veo.repositories;

import com.winnerezy.Veo.models.Option;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OptionRepository extends JpaRepository<Option, Long> {
    Optional<Option> findByPollIdAndId(Long pollId, Long id);
}
