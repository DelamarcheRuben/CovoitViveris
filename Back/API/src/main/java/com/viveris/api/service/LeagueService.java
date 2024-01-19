package com.viveris.api.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.viveris.api.model.League;
import com.viveris.api.repository.LeagueRepository;

import lombok.Data;

@Data
@Service
public class LeagueService {

	@Autowired
	private LeagueRepository leagueRepository;
	
	public Optional<League> getLeague(final Long id) {
		return leagueRepository.findById(id);
	}
	
	public Iterable<League> getLeagues() {
		return leagueRepository.findAll();
	}
	
	
	public void deleteLeague(final Long id) {
		leagueRepository.deleteById(id);
	}
	
	public League saveLeague(League League) {
		League savedLeague = leagueRepository.save(League);
		return savedLeague;
	}

}