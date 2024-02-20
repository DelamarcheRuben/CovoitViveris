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

import com.viveris.api.model.Friend;
import com.viveris.api.model.FriendId;
import com.viveris.api.model.User;
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
	 * @param (optional) id_user - The id of one user, to get all his friends 
	 * @return - An Iterable object of Friend full filled
	 */
	@GetMapping("/friends")
	public Iterable<Friend> getFriends(@RequestParam(required = false) Long id_user) {
		if(id_user!=null) return friendService.getFriendsById(id_user);
		return friendService.getFriends();
	}
	
	/**
	 * Read - Get all common friends between two users
	 * @param user1 - first user
	 * @param user2 - second user
	 * @return - An Iterable object of Integer (ids of common friends)
	 */
	@GetMapping("/common-friends/{id1}-{id2}")
	public Iterable<Integer> getCommonFriends(@PathVariable("id1") final Long user1, @PathVariable("id2") final Long user2) {
		return friendService.getCommonFriends(user1, user2);
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