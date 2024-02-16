package com.viveris.api.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.viveris.api.model.Address;
import com.viveris.api.model.Carshare;
import com.viveris.api.repository.AddressRepository;
import com.viveris.api.repository.CarshareRepository;

import lombok.Data;

@Data
@Service
public class CarshareService {

	@Autowired
	private CarshareRepository carshareRepository;
	
	@Autowired
	private AddressRepository addressRepository;
	
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
		
		address = addressRepository.findAddress(start_place.city, end_place.department, 
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
		
		Carshare savedCarshare = carshareRepository.save(Carshare);
		return savedCarshare;
	}

	public Iterable<Carshare> getNotFullCarshares(Integer id_user) {
		return carshareRepository.findNotFullCarshares(id_user);
	}

}