package com.viveris.api.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.viveris.api.model.Badge;
import com.viveris.api.repository.BadgeRepository;

import lombok.Data;

@Data
@Service
public class BadgeService {

	@Autowired
	private BadgeRepository badgeRepository;
	
	public Optional<Badge> getBadge(final Long id) {
		return badgeRepository.findById(id);
	}
	
	public Iterable<Badge> getBadges() {
		return badgeRepository.findAll();
	}
	
	public void deleteBadge(final Long id) {
		badgeRepository.deleteById(id);
	}
	
	public Badge saveBadge(Badge badge) {
		Badge savedBadge = badgeRepository.save(badge);
		return savedBadge;
	}



}