package com.viveris.api.controller;

import java.time.LocalDateTime;
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

import com.viveris.api.model.Carshare;
import com.viveris.api.service.CarshareService;

@RestController
@CrossOrigin
public class CarshareController {

	@Autowired
	private CarshareService carshareService;
	
	/**
	 * Create - Add a new carshare
	 * @param carshare An object carshare : in the json, carshare.driver.uid must be given
	 * @return The carshare object saved
	 */
	@PostMapping("/carshare")
	public Carshare createCarshare(@RequestBody Carshare carshare) {
		return carshareService.saveCarshare(carshare);
	}
	
	
	/**
	 * Read - Get one carshare 
	 * @param id The id of the carshare
	 * @return A Carshare object full filled
	 */
	@GetMapping("/carshare/{id}")
	public Carshare getCarshare(@PathVariable("id") final Long id) {
		Optional<Carshare> carshare = carshareService.getCarshare(id);
		if(carshare.isPresent()) {
			return carshare.get();
		} else {
			return null;
		}
	}
	
	/**
	 * Read - Get all carshares
	 * @return - An Iterable object of Carshare full filled
	 */
	@GetMapping("/carshares")
	public Iterable<Carshare> getCarshares() {
		return carshareService.getCarshares();
	}
	
	/**
	 * Read - Get all carshares that are not full and not linked with a given user
	 * @param id_user : a user that is not in the carshares
	 * @return - An Iterable object of Carshare full filled
	 */
	@GetMapping("/not-full-carshares")
	public Iterable<Carshare> getNotFullCarshares(@RequestParam(required = true) Long id_user ) {
		return carshareService.getNotFullCarshares(id_user);
	}
	
	/**
	 * Read - Get all carshares linked with a given user
	 * @param id_user : the user linked with the carshares
	 * @return - An Iterable object of Carshare full filled
	 */
	@GetMapping("/history-carshares")
	public Iterable<Carshare> getHistoryCarshares(@RequestParam(required = true) Long id_user ) {
		return carshareService.getHistoryCarshares(id_user);
	}
	
	
	/**
	 * Read - Get all carshares for a given date, sorted by distance (with a distance max)
	 * @param date : date of carshares
	 * @param distance_max : max_distance from user
	 * @return - An Iterable object of Carshare full filled
	 */
	@GetMapping("/sorted-carshares")
	public Iterable<Carshare> getNotFullCarshares(@RequestParam(required = true) Long id_user, @RequestParam(required = true) String date, @RequestParam(required=false) Float distance_max) {
		if(distance_max==null) distance_max = 50.0f;
		return carshareService.getSortedCarshares(id_user, date, distance_max);
	}
	
	
	/**
	 * Read - Get all carshares linked two given users
	 * @param id_user1 : the first user linked with the carshares
	 * @param id_user2 : the second user linked with the carshares
	 * @return - An Iterable object of Carshare full filled
	 */
	@GetMapping("/common-carshares/{id1}-{id2}")
	public Iterable<Carshare> getCommonCarshares(@PathVariable("id1") final Long id_user1, @PathVariable("id2") final Long id_user2) {
		return carshareService.getCommonCarshares(id_user1, id_user2);
	}
	
	
	/**
	 * Update - Update an existing carshare
	 * @param id - The id of the carshare to update
	 * @param carshare - The carshare object updated
	 * @return
	 */
	@PutMapping("/carshare/{id}")
	public Carshare updateCarshare(@PathVariable("id") final Long id, @RequestBody Carshare carshare) {
		Optional<Carshare> e = carshareService.getCarshare(id);
		if(e.isPresent()) {
			Carshare currentCarshare = e.get();
			Integer max_passenger = carshare.getMax_passenger();
			if(max_passenger!=null) {
				currentCarshare.setMax_passenger(max_passenger);
			}
			Boolean is_Full = carshare.getIs_Full();
			if(is_Full!=null) {
				currentCarshare.setIs_Full(is_Full);
			}
			LocalDateTime schedule = carshare.getSchedule();
			if(schedule!=null) {
				currentCarshare.setSchedule(schedule);
			}
			Float distance = carshare.getDistance();
			if(distance!=null) {
				currentCarshare.setDistance(distance);
			}
			Float bonus_pollution = carshare.getBonus_pollution();
			if(bonus_pollution!=null) {
				currentCarshare.setBonus_pollution(bonus_pollution);
			}
			
			Boolean comeback = carshare.getComeback();
			if(comeback!=null) {
				currentCarshare.setComeback(comeback);
			}
			carshareService.saveCarshare(currentCarshare);
			return currentCarshare;
		} else {
			return null;
		}
	}
	
	
	/**
	 * Delete - Delete an carshare
	 * @param id - The id of the carshare to delete
	 */
	@DeleteMapping("/carshare/{id}")
	public void deleteCarshare(@PathVariable("id") final Long id) {
		carshareService.deleteCarshare(id);
	}

}