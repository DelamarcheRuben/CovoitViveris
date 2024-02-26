package com.viveris.api.controller;

import java.time.LocalDateTime;
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

import com.viveris.api.model.Challenge;
import com.viveris.api.model.Participate;
import com.viveris.api.model.ParticipateId;
import com.viveris.api.service.ChallengeService;
import com.viveris.api.service.ParticipateService;

@RestController
@CrossOrigin
public class ParticipateController {

	@Autowired
	private ParticipateService participateService;
	
	@Autowired
	private ChallengeService challengeService;
	
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
	public Participate getParticipate(@RequestParam Long challenge, @RequestParam Long user) {
		Optional<Participate> participate = participateService.getParticipate(new ParticipateId(challenge, user));
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
	public Iterable<Participate> getParticipates(@RequestParam(required = false) Long id_user) {
		if(id_user!=null) return participateService.getParticipatesByUserId(id_user);
		return participateService.getParticipates();
	}
	
	/**
	 * Update - Update an existing participate
	 * @param id - The id of the participate to update
	 * @param participate - The participate object updated
	 * @return
	 */
	@PutMapping("/participate")
	public Participate updateParticipate(@RequestParam Long challenge, @RequestParam Long user, @RequestBody Participate participate) {
		Optional<Participate> e = participateService.getParticipate(new ParticipateId(challenge, user));
		if(e.isPresent()) {
			Participate currentParticipate = e.get();
			Challenge currentChallenge = challengeService.getChallenge(challenge).get(); //on pourrait utiliser le challenge dans currentParticipate mais jointure va peut etre etre enlevees

			Float co2_economy = participate.getCo2_economy();
			if(co2_economy!=null) 
			{
				currentParticipate.setCo2_economy(co2_economy+currentParticipate.getCo2_economy());
				Float progress = (currentParticipate.getCo2_economy()/currentChallenge.getGoal())*100.0F; 
				if(progress>=100.0F)
				{
					progress = 100.0F;
					currentParticipate.setHas_completed(true);
				}
				currentParticipate.setProgress(progress);
			}
			
			Float kilometers = participate.getKilometers();
			if(kilometers!=null) 
			{
				currentParticipate.setKilometers(kilometers+currentParticipate.getKilometers());
				Float progress = (currentParticipate.getKilometers()/currentChallenge.getGoal())*100.0F; 
				if(progress>=100.0F)
				{
					progress = 100.0F;
					currentParticipate.setHas_completed(true);
				}
				currentParticipate.setProgress(progress);
			}
			
			Integer completed_rides = participate.getCompleted_rides();
			if(completed_rides!=null) 
			{
				currentParticipate.setCompleted_rides(completed_rides);
				Float progress = ((float)currentParticipate.getCompleted_rides()/(float)currentChallenge.getGoal())*100.0F; 
				if(progress>=100.0F)
				{
					progress = 100.0F;
					currentParticipate.setHas_completed(true);
				}
				currentParticipate.setProgress(progress);
			}
			
			Integer different_passengers = participate.getDifferent_passengers();
			if(different_passengers!=null) 
			{
				currentParticipate.setDifferent_passengers(different_passengers);
				Float progress = ((float)currentParticipate.getDifferent_passengers()/(float)currentChallenge.getGoal())*100.0F; 
				if(progress>=100.0F)
				{
					progress = 100.0F;
					currentParticipate.setHas_completed(true);
				}
				currentParticipate.setProgress(progress);
			}
			
			LocalDateTime start_date = participate.getStart_date();
			if(start_date!=null) currentParticipate.setStart_date(start_date);
			
			LocalDateTime end_date = participate.getEnd_date();
			if(end_date!=null) currentParticipate.setEnd_date(end_date);
			
			Boolean has_completed = participate.getHas_completed();
			if(has_completed!=null) currentParticipate.setHas_completed(has_completed);

			Boolean time_over = participate.getTime_over();
			if(time_over!=null) currentParticipate.setTime_over(time_over);
			
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
	public void deleteParticipate(@RequestParam Long challenge, @RequestParam Long user) {
		participateService.deleteParticipate(new ParticipateId(challenge, user));
	}

}