package com.viveris.api.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.viveris.api.model.Carshare;
import com.viveris.api.repository.CarshareRepository;

import lombok.Data;

@Data
@Service
public class CarshareService {

	@Autowired
	private CarshareRepository carshareRepository;
	
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



}