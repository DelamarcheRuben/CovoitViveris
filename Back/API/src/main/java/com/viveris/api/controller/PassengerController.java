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

import com.viveris.api.model.Passenger;
import com.viveris.api.model.PassengerId;
import com.viveris.api.service.PassengerService;

@RestController
@CrossOrigin
public class PassengerController {

	@Autowired
	private PassengerService passengerService;
	
	/**
	 * Create - Add a new passenger
	 * @param passenger An object passenger
	 * @return The passenger object saved
	 */
	@PostMapping("/passenger")
	public Passenger createPassenger(@RequestBody Passenger passenger) {
		return passengerService.savePassenger(passenger);
	}
	
	
	/**
	 * Read - Get one passenger 
	 * @param id The id of the passenger
	 * @return A Passenger object full filled
	 */
	@GetMapping("/passenger")
	public Passenger getPassenger(@RequestParam Long carshare, @RequestParam Long user) {
		Optional<Passenger> passenger = passengerService.getPassenger(new PassengerId(carshare, user));
		if(passenger.isPresent()) {
			return passenger.get();
		} else {
			return null;
		}
	}
	
	/**
	 * Read - Get all passengers
	 * @return - An Iterable object of Passenger full filled
	 */
	@GetMapping("/passengers")
	public Iterable<Passenger> getPassengers(@RequestParam(required = false) Long id_carshare) {
		if(id_carshare!=null)
		{
			return passengerService.getPassengersByIdCarshare(id_carshare);
		}
		return passengerService.getPassengers();
	}
	
	/**
	 * Update - Update an existing passenger
	 * @param id - The id of the passenger to update
	 * @param passenger - The passenger object updated
	 * @return
	 */
	@PutMapping("/passenger")
	public Passenger updatePassenger(@RequestParam Long carshare, @RequestParam Long user, @RequestBody Passenger passenger) {
		Optional<Passenger> e = passengerService.getPassenger(new PassengerId(carshare, user));
		if(e.isPresent()) {
			passenger.setUid(new PassengerId(carshare, user));
			Passenger currentPassenger = passenger;
			passengerService.savePassenger(currentPassenger);
			return currentPassenger;
		} else {
			return null;
		}
	}
	
	
	/**
	 * Delete - Delete an passenger
	 * @param id - The id of the passenger to delete
	 */
	@DeleteMapping("/passenger")
	public void deletePassenger(@RequestParam Long carshare, @RequestParam Long user) {
		passengerService.deletePassenger(new PassengerId(carshare, user));
	}

}