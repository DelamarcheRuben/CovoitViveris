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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.viveris.api.model.Badge;
import com.viveris.api.service.BadgeService;

@RestController
@CrossOrigin
public class BadgeController {

	@Autowired
	private BadgeService badgeService;
	
	/**
	 * Create - Add a new badge
	 * @param badge An object badge
	 * @return The badge object saved
	 */
	@PostMapping("/badge")
	public Badge createBadge(@RequestBody Badge badge) {
		return badgeService.saveBadge(badge);
	}
	
	
	/**
	 * Read - Get one badge 
	 * @param id The id of the badge
	 * @return An Badge object full filled
	 */
	@GetMapping("/badge/{id}")
	public Badge getBadge(@PathVariable("id") final Long id) {
		Optional<Badge> badge = badgeService.getBadge(id);
		if(badge.isPresent()) {
			return badge.get();
		} else {
			return null;
		}
	}
	
	/**
	 * Read - Get all badges
	 * @return - An Iterable object of Badge full filled
	 */
	@GetMapping("/badges")
	public Iterable<Badge> getBadges() {
		return badgeService.getBadges();
	}
	
	/**
	 * Update - Update an existing badge
	 * @param id - The id of the badge to update
	 * @param badge - The badge object updated
	 * @return
	 */
	@PutMapping("/badge/{id}")
	public Badge updateBadge(@PathVariable("id") final Long id, @RequestBody Badge badge) {
		Optional<Badge> e = badgeService.getBadge(id);
		if(e.isPresent()) {
			Badge currentBadge = e.get();
			
			badgeService.saveBadge(currentBadge);
			return currentBadge;
		} else {
			return null;
		}
	}
	
	
	/**
	 * Delete - Delete an badge
	 * @param id - The id of the badge to delete
	 */
	@DeleteMapping("/badge/{id}")
	public void deleteBadge(@PathVariable("id") final Long id) {
		badgeService.deleteBadge(id);
	}

}