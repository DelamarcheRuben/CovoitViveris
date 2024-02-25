package com.viveris.api.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.viveris.api.model.Address;
import com.viveris.api.repository.AddressRepository;

import lombok.Data;

@Data
@Service
public class AddressService {

	@Autowired
	private AddressRepository addressRepository;
	
	public Optional<Address> getAddress(final Long id) {
		return addressRepository.findById(id);
	}
	
	public Iterable<Address> getAddresss() {
		return addressRepository.findAll();
	}
	
	public void deleteAddress(final Long id) {
		addressRepository.deleteById(id);
	}
	
	public Address saveAddress(Address address) {
		Address savedAddress = addressRepository.save(address);
		return savedAddress;
	}
	
	public Optional<Address> findAddress(String city, String department,
					Integer postcode, String road, Integer house_number)
	{
		return addressRepository.findAddress(city, department, postcode, road, house_number);
	}



}