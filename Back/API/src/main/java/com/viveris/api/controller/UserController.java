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
import org.springframework.web.bind.annotation.RestController;

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
		Optional<User> user = userService.getUser(id);
		if(user.isPresent()) {
			return user.get();
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
		return userService.getUsers();
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
			if(pseudo != null) {
				currentUser.setPseudo(pseudo);
			}
			int level = user.getExperience();
			if(level>=0) {
				currentUser.setExperience(level);;
			}

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