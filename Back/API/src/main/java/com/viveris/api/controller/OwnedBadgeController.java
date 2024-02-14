package com.viveris.api.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.viveris.api.model.OwnedBadge;
import com.viveris.api.model.OwnedBadgeId;
import com.viveris.api.service.OwnedBadgeService;

@RestController
@CrossOrigin
public class OwnedBadgeController {

	@Autowired
	private OwnedBadgeService ownedBadgeService;
	
	/**
	 * Create - Add a new ownedBadge
	 * @param ownedBadge An object ownedBadge
	 * @return The ownedBadge object saved
	 */
	@PostMapping("/ownedbadge")
	public OwnedBadge createOwnedBadge(@RequestBody OwnedBadge ownedBadge) {
		return ownedBadgeService.saveOwnedBadge(ownedBadge);
	}
	
	
	/**
	 * Read - Get one ownedBadge 
	 * @param id The id of the ownedBadge
	 * @return A OwnedBadge object full filled
	 */
	@GetMapping("/ownedbadge")
	public OwnedBadge getOwnedBadge(@RequestParam Long badge, @RequestParam Long user) {
		Optional<OwnedBadge> ownedBadge = ownedBadgeService.getOwnedBadge(new OwnedBadgeId(badge, user));
		if(ownedBadge.isPresent()) {
			return ownedBadge.get();
		} else {
			return null;
		}
	}
	
	/**
	 * Read - Get all ownedBadges
	 * @return - An Iterable object of OwnedBadge full filled
	 */
	@GetMapping("/ownedbadges")
	public Iterable<OwnedBadge> getOwnedBadges(@RequestParam(required=false) Integer user_id) {
		if(user_id!=null) return ownedBadgeService.getOwnedBadgesByUserId(user_id);
		return ownedBadgeService.getOwnedBadges();
	}
	
	/**
	 * Update - Update an existing ownedBadge
	 * @param id - The id of the ownedBadge to update
	 * @param ownedBadge - The ownedBadge object updated
	 * @return
	 */
	@PutMapping("/ownedbadge")
	public OwnedBadge updateOwnedBadge(@RequestParam Long badge, @RequestParam Long user, @RequestBody OwnedBadge ownedBadge) {
		Optional<OwnedBadge> e = ownedBadgeService.getOwnedBadge(new OwnedBadgeId(badge, user));
		if(e.isPresent()) {
			OwnedBadge currentOwnedBadge = e.get();
			Integer level = ownedBadge.getLevel();
			if(level!=null) currentOwnedBadge.setLevel(level);
			ownedBadgeService.saveOwnedBadge(currentOwnedBadge);
			return currentOwnedBadge;
		} else {
			return null;
		}
	}
	
	
	/**
	 * Delete - Delete an ownedBadge
	 * @param id - The id of the ownedBadge to delete
	 */
	@DeleteMapping("/ownedbadge")
	public void deleteOwnedBadge(@RequestParam Long badge, @RequestParam Long user) {
		ownedBadgeService.deleteOwnedBadge(new OwnedBadgeId(badge, user));
	}

}