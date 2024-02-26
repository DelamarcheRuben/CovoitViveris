package com.viveris.api.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.viveris.api.model.Carshare;
import com.viveris.api.model.Passenger;
import com.viveris.api.model.PassengerId;
import com.viveris.api.model.User;
import com.viveris.api.repository.CarshareRepository;
import com.viveris.api.repository.PassengerRepository;

import lombok.Data;

@Data
@Service
public class PassengerService {

	@Autowired
	private PassengerRepository passengerRepository;
	
	@Autowired
	private CarshareRepository carshareRepository;
	
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
		
		if(Passenger.getHas_validated())
		{
			
			Carshare carshare = carshareRepository.findById(Passenger.uid.getuid_carshare()).get();
			boolean finished = carshare.getHas_validated();
			if(finished)
			{
				Iterable<Passenger> passengers = passengerRepository.findAllByIdCarshare(Passenger.uid.getuid_carshare());
				for(Passenger p:passengers)
				{
					if(!p.getHas_validated()) 
					{
						finished = false;
						break;
					}
				}
			}
			
			carshare.setFinished(finished);
			carshareRepository.save(carshare);
		}
		
		return savedPassenger;
	}

	public Iterable<Passenger> getPassengersByIdCarshare(Long id_carshare) {
		return passengerRepository.findAllByIdCarshare(id_carshare);
	}

	public Integer getDistinctPassengersFromUser(Long id_user) {
		return passengerRepository.findDistinctPassengersFromUser(id_user);
	}

	public Iterable<Passenger> getPassengersByIdUser(Long id_user) {
		return passengerRepository.findAllByIdUser(id_user);
	}

	public Integer getDistinctPassengersFromUserWithDates(Long id_user, LocalDateTime start_date,
			LocalDateTime end_date) {
		return passengerRepository.findDistinctPassengersFromUserWithDates(id_user, start_date, end_date);
	}

}