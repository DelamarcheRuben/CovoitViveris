package com.viveris.api.controller;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.viveris.api.model.League;
import com.viveris.api.service.LeagueService;

@RestController
@CrossOrigin
public class LeagueController {

	@Autowired
	private LeagueService leagueService;
	
	/**
	 * Create - Add a new league
	 * @param league An object league
	 * @return The league object saved
	 */
	@PostMapping("/league")
	public League createLeague(@RequestBody League league) {
		return leagueService.saveLeague(league);
	}
	
	
	/**
	 * Read - Get one league 
	 * @param id The id of the league
	 * @return A League object full filled
	 */
	@GetMapping("/league/{id}")
	public League getLeague(@PathVariable("id") final Long id) {
		Optional<League> league = leagueService.getLeague(id);
		if(league.isPresent()) {
			return league.get();
		} else {
			return null;
		}
	}
	
	/**
	 * Read - Get all leagues
	 * @return - An Iterable object of League full filled
	 */
	@GetMapping("/leagues")
	public Iterable<League> getLeagues() {
		return leagueService.getLeagues();
	}
	
	/**
	 * Update - Update an existing league
	 * @param id - The id of the league to update
	 * @param league - The league object updated
	 * @return
	 */
	@PutMapping("/league/{id}")
	public League updateLeague(@PathVariable("id") final Long id, @RequestBody League league) {
		Optional<League> e = leagueService.getLeague(id);
		if(e.isPresent()) {
			League currentLeague = e.get();
			LocalDateTime start_date = league.getStart_date();
			if(start_date!=null) currentLeague.setStart_date(start_date);
			LocalDateTime end_date = league.getEnd_date();
			if(end_date!=null) currentLeague.setEnd_date(end_date);
			leagueService.saveLeague(currentLeague);
			return currentLeague;
		} else {
			return null;
		}
	}
	
	
	/**
	 * Delete - Delete an league
	 * @param id - The id of the league to delete
	 */
	@DeleteMapping("/league/{id}")
	public void deleteLeague(@PathVariable("id") final Long id) {
		leagueService.deleteLeague(id);
	}

}