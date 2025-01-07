package com.winnerezy.Veo.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.winnerezy.Veo.models.Option;

@Repository
public interface OptionRepository extends JpaRepository<Option, Long> {
    Optional<Option> findByPollIdAndId(Long pollId, Long id);
}
