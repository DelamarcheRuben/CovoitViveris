package com.viveris.api.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.viveris.api.model.OwnedBadge;
import com.viveris.api.model.OwnedBadgeId;
import com.viveris.api.repository.OwnedBadgeRepository;

import lombok.Data;

@Data
@Service
public class OwnedBadgeService {

	@Autowired
	private OwnedBadgeRepository ownedBadgeRepository;
	
	public Optional<OwnedBadge> getOwnedBadge(final OwnedBadgeId id) {
		return ownedBadgeRepository.findById(id);
	}
	
	public Iterable<OwnedBadge> getOwnedBadges() {
		return ownedBadgeRepository.findAll();
	}
	
	
	public void deleteOwnedBadge(final OwnedBadgeId id) {
		ownedBadgeRepository.deleteById(id);
	}
	
	public OwnedBadge saveOwnedBadge(OwnedBadge OwnedBadge) {
		OwnedBadge savedOwnedBadge = ownedBadgeRepository.save(OwnedBadge);
		return savedOwnedBadge;
	}



}