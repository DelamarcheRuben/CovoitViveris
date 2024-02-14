package com.viveris.api.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.viveris.api.model.Play;
import com.viveris.api.model.PlayId;
import com.viveris.api.service.PlayService;

@RestController
@CrossOrigin
public class PlayController {

	@Autowired
	private PlayService playService;
	
	/**
	 * Create - Add a new play
	 * @param play An object play
	 * @return The play object saved
	 */
	@PostMapping("/play")
	public Play createPlay(@RequestBody Play play) {
		return playService.savePlay(play);
	}
	
	
	/**
	 * Read - Get one play 
	 * @param id The id of the play
	 * @return A Play object full filled
	 */
	@GetMapping("/play")
	public Play getPlay(@RequestParam Long league, @RequestParam Long user) {
		Optional<Play> play = playService.getPlay(new PlayId(league, user));
		if(play.isPresent()) {
			return play.get();
		} else {
			return null;
		}
	}
	
	/**
	 * Read - Get all plays
	 * @return - An Iterable object of Play full filled
	 */
	@GetMapping("/plays")
	public Iterable<Play> getPlays() {
		return playService.getPlays();
	}
	
	/**
	 * Update - Update an existing play
	 * @param id - The id of the play to update
	 * @param play - The play object updated
	 * @return
	 */
	@PutMapping("/play")
	public Play updatePlay(@RequestParam Long league, @RequestParam Long user, @RequestBody Play play) {
		Optional<Play> e = playService.getPlay(new PlayId(league, user));
		if(e.isPresent()) {
			Play currentPlay = e.get();
			Integer experience = play.getExperience();
			if(experience!=null)
			{
				currentPlay.setExperience(experience);
			}
			playService.savePlay(currentPlay);
			return currentPlay;
		} else {
			return null;
		}
	}
	
	
	/**
	 * Delete - Delete an play
	 * @param id - The id of the play to delete
	 */
	@DeleteMapping("/play")
	public void deletePlay(@RequestParam Long league, @RequestParam Long user) {
		playService.deletePlay(new PlayId(league, user));
	}

}