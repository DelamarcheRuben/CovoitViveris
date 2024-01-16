package com.viveris.api.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.viveris.api.model.Passenger;
import com.viveris.api.model.PassengerId;
import com.viveris.api.repository.PassengerRepository;

import lombok.Data;

@Data
@Service
public class PassengerService {

	@Autowired
	private PassengerRepository passengerRepository;
	
	public Optional<Passenger> getPassenger(final PassengerId id) {
		return passengerRepository.findById(id);
	}
	
	public Iterable<Passenger> getPassengers() {
		return passengerRepository.findAll();
	}
	
	
	public void deletePassenger(final PassengerId id) {
		passengerRepository.deleteById(id);
	}
	
	public Passenger savePassenger(Passenger Passenger) {
		Passenger savedPassenger = passengerRepository.save(Passenger);
		return savedPassenger;
	}



}