package com.viveris.api.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.viveris.api.model.Challenge;

@Repository
public interface ChallengeRepository extends CrudRepository<Challenge, Long> {
}