package com.viveris.api.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.viveris.api.model.Carshare;
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

	public Iterable<Participate> getParticipatesByUserId(Long id_user) {
		
		Iterable<Participate> participates = participateRepository.findParticipatesByUserId(id_user);
		ArrayList<Participate> sorted_participates = new ArrayList<>();

		for(Participate p:participates)
		{
			sorted_participates.add(p);
				
		}
		//tri par ordre decroissant
		sorted_participates.sort((o1, o2) -> {
			if(o1.getProgress()<o2.getProgress()) return 1;
			if(o1.getProgress()==o2.getProgress()) return 0;
			return -1;
		});
		
		return sorted_participates;
	}



}