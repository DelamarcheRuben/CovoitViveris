package com.viveris.api.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import com.viveris.api.model.Address;
import com.viveris.api.model.Carshare;
import com.viveris.api.model.Passenger;
import com.viveris.api.repository.AddressRepository;
import com.viveris.api.model.User;
import com.viveris.api.repository.CarshareRepository;
import com.viveris.api.repository.PassengerRepository;
import com.viveris.api.repository.UserRepository;

import lombok.Data;

@Data
@Service
public class CarshareService {

	@Autowired
	private CarshareRepository carshareRepository;
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private AddressRepository addressRepository;
	
	@Autowired
	private PassengerRepository passengerRepository;

	public Optional<Carshare> getCarshare(final Long id) {
		return carshareRepository.findById(id);
	}
	
	public Iterable<Carshare> getCarshares() {
		return carshareRepository.findAll();
	}
	
	
	public void deleteCarshare(final Long id) {
		carshareRepository.deleteById(id);
	}
	
	public Carshare saveCarshare(Carshare Carshare) {
		Optional<User> opt_driver = userRepository.findById(Carshare.driver.uid);
		if(!opt_driver.isPresent()) return null;
		User driver = opt_driver.get();
		Address start_place = Carshare.getStart_place();
		Address end_place = Carshare.getEnd_place();

		Optional<Address> address = addressRepository.findAddress(start_place.city, start_place.department,
				start_place.postcode, start_place.road, start_place.house_number);
		if(address.isPresent())
		{
			start_place = address.get();
		}
		else
		{
			start_place = addressRepository.save(start_place);
		}

		address = addressRepository.findAddress(end_place.city, end_place.department,
				end_place.postcode, end_place.road, end_place.house_number);
		if(address.isPresent())
		{
			end_place = address.get();
		}
		else
		{
			end_place = addressRepository.save(end_place);
		}

		
		Carshare.setStart_place(start_place);
		Carshare.setEnd_place(end_place);
		
		//https://www.movable-type.co.uk/scripts/latlong.html
		Double lat1 = Carshare.getStart_place().getLatitude();
		Double lon1 = Carshare.getStart_place().getLongitude();
		Double lat2 = Carshare.getEnd_place().getLatitude();
		Double lon2 = Carshare.getEnd_place().getLongitude();
		Long R = (long) (6371); // kilometres
		Double phi1 = lat1 * Math.PI/180; // phi, lambda in radians
		Double phi2 = lat2 * Math.PI/180;
		Double deltaphi = (lat2-lat1) * Math.PI/180;
		Double deltalambda = (lon2-lon1) * Math.PI/180;
		Double a = Math.sin(deltaphi/2) * Math.sin(deltaphi/2) +
		          Math.cos(phi1) * Math.cos(phi2) *
		          Math.sin(deltalambda/2) * Math.sin(deltalambda/2);
		Double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		Float distance = (float) (R*c);
		Carshare.setDistance(distance);
		
		if(Carshare.getHas_validated())
		{
			boolean finished = true;
			Iterable<Passenger> passengers = passengerRepository.findAllByIdCarshare(Carshare.uid);
			for(Passenger p:passengers)
			{
				if(!p.has_validated) 
				{
					finished = false;
					break;
				}
			}
			Carshare.setFinished(finished);
		}
		
		
		Carshare savedCarshare = carshareRepository.save(Carshare);
		return savedCarshare;
	}

	public Iterable<Carshare> getNotFullCarshares(Long id_user) {
		return carshareRepository.findNotFullCarshares(id_user);
	}

	public Iterable<Carshare> getSortedCarshares(Long id_user, String date, Float distance_max) {
		Optional<User> opt_user = userRepository.findById(id_user);
		if(!opt_user.isPresent()) return null;
		User user = opt_user.get();
		Iterable<Carshare> carshares = carshareRepository.getSortedCarshares(id_user, date);
		ArrayList<Carshare> sorted_carshares = new ArrayList<>();
		//mapping est une sauvegarde temporaire de la vraie distance du trjaet, qui est modifie dans la boucle suivante
		HashMap<Long, Float> mapping_distance = new HashMap<>();
		for(Carshare carshare:carshares)
		{
			Double lat1 = user.getAddress().getLatitude();
			Double lon1 = user.getAddress().getLongitude();
			Double lat2 = carshare.getStart_place().getLatitude();
			Double lon2 = carshare.getStart_place().getLongitude();
			Long R = (long) (6371); // kilometres
			Double phi1 = lat1 * Math.PI/180; // phi, lambda in radians
			Double phi2 = lat2 * Math.PI/180;
			Double deltaphi = (lat2-lat1) * Math.PI/180;
			Double deltalambda = (lon2-lon1) * Math.PI/180;
			Double a = Math.sin(deltaphi/2) * Math.sin(deltaphi/2) +
			          Math.cos(phi1) * Math.cos(phi2) *
			          Math.sin(deltalambda/2) * Math.sin(deltalambda/2);
			Double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
			Float distance = (float) (R*c);
			if(distance<=distance_max)
			{
				mapping_distance.put(carshare.uid, carshare.distance);
				carshare.setDistance(distance);
				sorted_carshares.add(carshare);
			}
				
		}
		sorted_carshares.sort((o1, o2) -> {
			if(o1.getDistance()<o2.getDistance()) return -1;
			if(o1.getDistance()==o2.getDistance()) return 0;
			return 1;
		});
		for(Carshare c : sorted_carshares)
		{
			c.setDistance(mapping_distance.get(c.uid));
		}
		
		return sorted_carshares;
	}

	public Iterable<Carshare> getHistoryCarshares(Long id_user) {
		return carshareRepository.findHistoryCarshares(id_user);
	}

	public Iterable<Carshare> getCommonCarshares(Long id_user1, Long id_user2) {
		return carshareRepository.findCommonCarshares(id_user1, id_user2);
	}

	public Iterable<Carshare> getReservationsCarshares(Long id_user) {
		String yesterday = LocalDateTime.now().minusDays(1).format(DateTimeFormatter.ISO_DATE);
		return carshareRepository.findReservationsCarshares(id_user, yesterday);
	}

	public Iterable<Carshare> getProposedCarshares(Long id_user) {
		String yesterday = LocalDateTime.now().minusDays(1).format(DateTimeFormatter.ISO_DATE);
		return carshareRepository.findProposedCarshares(id_user, yesterday);
	}

	public Integer getNbValidatedCarsharesWithDates(Long id_user, LocalDateTime start_date,
			LocalDateTime end_date) {
		return carshareRepository.findNbValidatedCarsharesWithDates(id_user,start_date, end_date);
	}

}