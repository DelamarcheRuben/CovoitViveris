package com.viveris.api.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.viveris.api.model.Play;
import com.viveris.api.model.PlayId;
import com.viveris.api.repository.PlayRepository;

import lombok.Data;

@Data
@Service
public class PlayService {

	@Autowired
	private PlayRepository playRepository;
	
	public Optional<Play> getPlay(final PlayId id) {
		return playRepository.findById(id);
	}
	
	public Iterable<Play> getPlays() {
		return playRepository.findAll();
	}
	
	
	public void deletePlay(final PlayId id) {
		playRepository.deleteById(id);
	}
	
	public Play savePlay(Play Play) {
		Play savedPlay = playRepository.save(Play);
		return savedPlay;
	}



}