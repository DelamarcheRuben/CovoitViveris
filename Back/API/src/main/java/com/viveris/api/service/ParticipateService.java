package com.viveris.api.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.viveris.api.model.Participate;
import com.viveris.api.model.ParticipateId;
import com.viveris.api.repository.ParticipateRepository;

import lombok.Data;

@Data
@Service
public class ParticipateService {

	@Autowired
	private ParticipateRepository participateRepository;
	
	public Optional<Participate> getParticipate(final ParticipateId id) {
		return participateRepository.findById(id);
	}
	
	public Iterable<Participate> getParticipates() {
		return participateRepository.findAll();
	}
	
	
	public void deleteParticipate(final ParticipateId id) {
		participateRepository.deleteById(id);
	}
	
	public Participate saveParticipate(Participate Participate) {
		Participate savedParticipate = participateRepository.save(Participate);
		return savedParticipate;
	}



}