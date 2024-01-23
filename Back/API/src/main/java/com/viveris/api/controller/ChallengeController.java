package com.viveris.api.controller;

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

import com.viveris.api.model.Challenge;
import com.viveris.api.service.ChallengeService;

@RestController
@CrossOrigin
public class ChallengeController {

	@Autowired
	private ChallengeService challengeService;
	
	/**
	 * Create - Add a new challenge
	 * @param challenge An object challenge
	 * @return The challenge object saved
	 */
	@PostMapping("/challenge")
	public Challenge createChallenge(@RequestBody Challenge challenge) {
		return challengeService.saveChallenge(challenge);
	}
	
	
	/**
	 * Read - Get one challenge 
	 * @param id The id of the challenge
	 * @return A Challenge object full filled
	 */
	@GetMapping("/challenge/{id}")
	public Challenge getChallenge(@PathVariable("id") final Long id) {
		Optional<Challenge> challenge = challengeService.getChallenge(id);
		if(challenge.isPresent()) {
			return challenge.get();
		} else {
			return null;
		}
	}
	
	/**
	 * Read - Get all challenges
	 * @return - An Iterable object of Challenge full filled
	 */
	@GetMapping("/challenges")
	public Iterable<Challenge> getChallenges() {
		return challengeService.getChallenges();
	}
	
	/**
	 * Update - Update an existing challenge
	 * @param id - The id of the challenge to update
	 * @param challenge - The challenge object updated
	 * @return
	 */
	@PutMapping("/challenge/{id}")
	public Challenge updateChallenge(@PathVariable("id") final Long id, @RequestBody Challenge challenge) {
		Optional<Challenge> e = challengeService.getChallenge(id);
		if(e.isPresent()) {
			challenge.setUid(id);
			Challenge currentChallenge = challenge;
			challengeService.saveChallenge(currentChallenge);
			return currentChallenge;
		} else {
			return null;
		}
	}
	
	
	/**
	 * Delete - Delete an challenge
	 * @param id - The id of the challenge to delete
	 */
	@DeleteMapping("/challenge/{id}")
	public void deleteChallenge(@PathVariable("id") final Long id) {
		challengeService.deleteChallenge(id);
	}

}