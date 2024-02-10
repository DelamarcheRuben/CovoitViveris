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

import com.viveris.api.model.Carshare;
import com.viveris.api.service.CarshareService;

@RestController
@CrossOrigin
public class CarshareController {

	@Autowired
	private CarshareService carshareService;
	
	/**
	 * Create - Add a new carshare
	 * @param carshare An object carshare
	 * @return The carshare object saved
	 */
	@PostMapping("/carshare")
	public Carshare createCarshare(@RequestBody Carshare carshare) {
		System.out.println(carshare);
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
	 * Read - Get all carshares that are not full
	 * @param id_user : a user that is not in the carshares
	 * @return - An Iterable object of Carshare full filled
	 */
	@GetMapping("/not-full-carshares")
	public Iterable<Carshare> getNotFullCarshares(@RequestParam(required = false) Integer id_user ) {
		return carshareService.getNotFullCarshares(id_user);
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
			carshare.setUid(id);
			Carshare currentCarshare = carshare;
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