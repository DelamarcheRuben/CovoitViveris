package com.viveris.api.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.viveris.api.model.Carshare;
import com.viveris.api.model.Passenger;
import com.viveris.api.model.PassengerId;
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
				Iterable<Passenger> passengers = passengerRepository.FindAllByIdCarshare(Passenger.uid.getuid_carshare());
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
		return passengerRepository.FindAllByIdCarshare(id_carshare);
	}

	public Iterable<Passenger> getDistinctPassengersFromUser(Long id_user) {
		return passengerRepository.findDistinctPassengersFromUser(id_user);
	}

}