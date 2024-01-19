package com.viveris.api.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.viveris.api.model.League;

@Repository
public interface LeagueRepository extends CrudRepository<League, Long> {
}