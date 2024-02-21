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
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.viveris.api.model.Address;
import com.viveris.api.model.User;
import com.viveris.api.service.UserService;

@RestController
@CrossOrigin
public class UserController {

	@Autowired
	private UserService userService;
	
	/**
	 * Create - Add a new user
	 * @param user An object user
	 * @return The user object saved
	 */
	@PostMapping("/user")
	public User createUser(@RequestBody User user) {
		return userService.saveUser(user);
	}
	
	
	/**
	 * Read - Get one user 
	 * @param id The id of the user
	 * @return An User object full filled
	 */
	@GetMapping("/user/{id}")
	public User getUser(@PathVariable("id") final Long id) {
		Optional<User> opt_user = userService.getUser(id);
		if(opt_user.isPresent()) {
			User user = opt_user.get();
			user.setPassword(null);
			return user;
		} else {
			return null;
		}
	}
	
	/**
	 * Read - Get a specific user by pseudo
	 * @return - An Iterable object of User full filled
	 */
	@GetMapping("/user")
	public User getUserByPseudo(@RequestParam(required = true) String pseudo, @RequestHeader("password") Long pwd) {
		Optional<User> opt_user = userService.getUserByPseudo(pseudo);
		if(opt_user.isPresent()) {
			User user = opt_user.get();
			user.setPassword(null);
			return user;
		} else {
			return null;
		}
		
	}
	
	/**
	 * Read - Get all users
	 * @return - An Iterable object of User full filled
	 */
	@GetMapping("/users")
	public Iterable<User> getUsers() {
		Iterable<User> users = userService.getUsers();
		//for protection, until better way
		for(User user : users) user.setPassword(null);
		return users;
	}
	
	/**
	 * Update - Update an existing user
	 * @param id - The id of the user to update
	 * @param user - The user object updated
	 * @return
	 */
	@PutMapping("/user/{id}")
	public User updateUser(@PathVariable("id") final Long id, @RequestBody User user) {
		Optional<User> e = userService.getUser(id);
		if(e.isPresent()) {
			User currentUser = e.get();
			
			String pseudo = user.getPseudo();
			if(pseudo!=null) currentUser.setPseudo(pseudo);
			String password = user.getPassword();
			if(password!=null) currentUser.setPassword(password);
			String first_name = user.getFirst_name();
			if(first_name!=null) currentUser.setFirst_name(first_name);
			String last_name = user.getLast_name();
			if(last_name!=null) currentUser.setLast_name(last_name);
			
			String email = user.getEmail();
			if(email!=null) currentUser.setEmail(email);
			
			String job = user.getJob();
			if(job!=null) currentUser.setJob(job);
			
			Address address = user.getAddress();
			if(address!=null) currentUser.setAddress(address);
			
			String picture_background = user.getPicture_background();
			if(picture_background!=null) currentUser.setPicture_background(picture_background);
			
			String car_type = user.getCar_type();
			if(car_type!=null) currentUser.setCar_type(car_type);
			
			Float fuel_consumption = user.getFuel_consumption();
			if(fuel_consumption!=null) currentUser.setFuel_consumption(fuel_consumption);
			
			Integer nb_carshares = user.getNb_carshares();
			if(nb_carshares!=null) currentUser.setNb_carshares(nb_carshares);
			
			Float kilometers = user.getKilometers();
			if(kilometers!=null) currentUser.setKilometers(kilometers);
			
			Integer level = user.getLevel();
			if(level!=null) currentUser.setLevel(level);;
			Integer experience = user.getExperience();
			if(experience!=null) currentUser.setExperience(experience);
			
			Float bonus_loyalty = user.getBonus_loyalty();
			if(bonus_loyalty!=null) currentUser.setBonus_loyalty(bonus_loyalty);
			
			Float co2_economy = user.getCo2_economy();
			if(co2_economy!=null) currentUser.setCo2_economy(co2_economy);
			
			userService.saveUser(currentUser);
			return currentUser;
		} else {
			return null;
		}
	}
	
	
	/**
	 * Delete - Delete an user
	 * @param id - The id of the user to delete
	 */
	@DeleteMapping("/user/{id}")
	public void deleteUser(@PathVariable("id") final Long id) {
		userService.deleteUser(id);
	}

}