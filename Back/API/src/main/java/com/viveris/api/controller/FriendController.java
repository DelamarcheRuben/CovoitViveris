package com.viveris.api.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.viveris.api.model.Friend;
import com.viveris.api.model.FriendId;
import com.viveris.api.service.FriendService;

@RestController
@CrossOrigin
public class FriendController {

	@Autowired
	private FriendService friendService;
	
	/**
	 * Create - Add a new friend
	 * @param friend An object friend
	 * @return The friend object saved
	 */
	@PostMapping("/friend")
	public Friend createFriend(@RequestBody Friend friend) {
		return friendService.saveFriend(friend);
	}
	
	
	/**
	 * Read - Get one friend 
	 * @param id The id of the friend
	 * @return A Friend object full filled
	 */
	@GetMapping("/friend")
	public Friend getFriend(@RequestParam Long user1, @RequestParam Long user2) {
		Optional<Friend> friend = friendService.getFriend(new FriendId(user1, user2));
		if(friend.isPresent()) {
			return friend.get();
		} else {
			return null;
		}
	}
	
	/**
	 * Read - Get all friends
	 * @return - An Iterable object of Friend full filled
	 */
	@GetMapping("/friends")
	public Iterable<Friend> getFriends() {
		return friendService.getFriends();
	}
	
	/**
	 * Update - Update an existing friend
	 * @param id - The id of the friend to update
	 * @param friend - The friend object updated
	 * @return
	 */
	@PutMapping("/friend")
	public Friend updateFriend(@RequestParam Long user1, @RequestParam Long user2, @RequestBody Friend friend) {
		Optional<Friend> e = friendService.getFriend(new FriendId(user1, user2));
		if(e.isPresent()) {
			Friend currentFriend = e.get();
			return currentFriend;
		} else {
			return null;
		}
	}
	
	
	/**
	 * Delete - Delete an friend
	 * @param id - The id of the friend to delete
	 */
	@DeleteMapping("/friend")
	public void deleteFriend(@RequestParam Long user1, @RequestParam Long user2) {
		friendService.deleteFriend(new FriendId(user1, user2));
	}

}