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

import com.viveris.api.model.Address;
import com.viveris.api.service.AddressService;

@RestController
@CrossOrigin
public class AddressController {

	@Autowired
	private AddressService addressService;
	
	/**
	 * Create - Add a new address
	 * @param address An object address
	 * @return The address object saved
	 */
	@PostMapping("/address")
	public Address createAddress(@RequestBody Address address) {
		return addressService.saveAddress(address);
	}
	
	
	/**
	 * Read - Get one address 
	 * @param id The id of the address
	 * @return An Address object full filled
	 */
	@GetMapping("/address/{id}")
	public Address getAddress(@PathVariable("id") final Long id) {
		Optional<Address> address = addressService.getAddress(id);
		if(address.isPresent()) {
			return address.get();
		} else {
			return null;
		}
	}
	
	/**
	 * Read - Get all addresss
	 * @return - An Iterable object of Address full filled
	 */
	@GetMapping("/addresses")
	public Iterable<Address> getAddresses() {
		return addressService.getAddresss();
	}
	
	/**
	 * Update - Update an existing address
	 * @param id - The id of the address to update
	 * @param address - The address object updated
	 * @return
	 */
	@PutMapping("/address/{id}")
	public Address updateAddress(@PathVariable("id") final Long id, @RequestBody Address address) {
		Optional<Address> e = addressService.getAddress(id);
		if(e.isPresent()) {
			Address currentAddress = e.get();
			
			addressService.saveAddress(currentAddress);
			return currentAddress;
		} else {
			return null;
		}
	}
	
	
	/**
	 * Delete - Delete an address
	 * @param id - The id of the address to delete
	 */
	@DeleteMapping("/address/{id}")
	public void deleteAddress(@PathVariable("id") final Long id) {
		addressService.deleteAddress(id);
	}

}