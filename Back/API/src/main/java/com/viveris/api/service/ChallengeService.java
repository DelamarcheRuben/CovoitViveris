package com.viveris.api.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.viveris.api.model.Challenge;
import com.viveris.api.repository.ChallengeRepository;

import lombok.Data;

@Data
@Service
public class ChallengeService {

	@Autowired
	private ChallengeRepository challengeRepository;
	
	public Optional<Challenge> getChallenge(final Long id) {
		return challengeRepository.findById(id);
	}
	
	public Iterable<Challenge> getChallenges() {
		return challengeRepository.findAll();
	}
	
	
	public void deleteChallenge(final Long id) {
		challengeRepository.deleteById(id);
	}
	
	public Challenge saveChallenge(Challenge Challenge) {
		Challenge savedChallenge = challengeRepository.save(Challenge);
		return savedChallenge;
	}

}