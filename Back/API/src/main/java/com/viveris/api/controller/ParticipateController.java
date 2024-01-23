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

import com.viveris.api.model.Participate;
import com.viveris.api.model.ParticipateId;
import com.viveris.api.service.ParticipateService;

@RestController
@CrossOrigin
public class ParticipateController {

	@Autowired
	private ParticipateService participateService;
	
	/**
	 * Create - Add a new participate
	 * @param participate An object participate
	 * @return The participate object saved
	 */
	@PostMapping("/participate")
	public Participate createParticipate(@RequestBody Participate participate) {
		return participateService.saveParticipate(participate);
	}
	
	
	/**
	 * Read - Get one participate 
	 * @param id The id of the participate
	 * @return A Participate object full filled
	 */
	@GetMapping("/participate")
	public Participate getParticipate(@RequestParam Long carshare, @RequestParam Long user) {
		Optional<Participate> participate = participateService.getParticipate(new ParticipateId(carshare, user));
		if(participate.isPresent()) {
			return participate.get();
		} else {
			return null;
		}
	}
	
	/**
	 * Read - Get all participates
	 * @return - An Iterable object of Participate full filled
	 */
	@GetMapping("/participates")
	public Iterable<Participate> getParticipates() {
		return participateService.getParticipates();
	}
	
	/**
	 * Update - Update an existing participate
	 * @param id - The id of the participate to update
	 * @param participate - The participate object updated
	 * @return
	 */
	@PutMapping("/participate")
	public Participate updateParticipate(@RequestParam Long carshare, @RequestParam Long user, @RequestBody Participate participate) {
		Optional<Participate> e = participateService.getParticipate(new ParticipateId(carshare, user));
		if(e.isPresent()) {
			participate.setUid(new ParticipateId(carshare, user));
			Participate currentParticipate = participate;
			participateService.saveParticipate(currentParticipate);
			return currentParticipate;
		} else {
			return null;
		}
	}
	
	
	/**
	 * Delete - Delete an participate
	 * @param id - The id of the participate to delete
	 */
	@DeleteMapping("/participate")
	public void deleteParticipate(@RequestParam Long carshare, @RequestParam Long user) {
		participateService.deleteParticipate(new ParticipateId(carshare, user));
	}

}