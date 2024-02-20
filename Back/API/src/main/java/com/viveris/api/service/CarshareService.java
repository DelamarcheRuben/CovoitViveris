package com.viveris.api.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.viveris.api.model.Carshare;
import com.viveris.api.model.User;
import com.viveris.api.repository.CarshareRepository;
import com.viveris.api.repository.UserRepository;

import lombok.Data;

@Data
@Service
public class CarshareService {

	@Autowired
	private CarshareRepository carshareRepository;
	@Autowired
	private UserRepository userRepository;
	
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
		for(Carshare carshare:carshares)
		{
			//https://www.movable-type.co.uk/scripts/latlong.html
			Double lat1 = user.getAddress().getLatitude();
			Double lon1 = user.getAddress().getLongitude();
			Double lat2 = carshare.getStart_place().getLatitude();
			Double lon2 = carshare.getStart_place().getLongitude();
			Long R = (long) (6371); // kilometres
			Double φ1 = lat1 * Math.PI/180; // φ, λ in radians
			Double φ2 = lat2 * Math.PI/180;
			Double Δφ = (lat2-lat1) * Math.PI/180;
			Double Δλ = (lon2-lon1) * Math.PI/180;
			Double a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
			          Math.cos(φ1) * Math.cos(φ2) *
			          Math.sin(Δλ/2) * Math.sin(Δλ/2);
			Double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
			Float distance = (float) (R*c);
			carshare.setDistance(distance);
		}
		return carshares;
	}

	public Iterable<Carshare> getHistoryCarshares(Long id_user) {
		return carshareRepository.findHistoryCarshares(id_user);
	}

	public Iterable<Carshare> getCommonCarshares(Long id_user1, Long id_user2) {
		return carshareRepository.findCommonCarshares(id_user1, id_user2);
	}

}