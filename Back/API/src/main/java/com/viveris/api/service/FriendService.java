package com.viveris.api.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.viveris.api.model.Friend;
import com.viveris.api.model.FriendId;
import com.viveris.api.model.User;
import com.viveris.api.repository.FriendRepository;

import lombok.Data;

@Data
@Service
public class FriendService {

	@Autowired
	private FriendRepository friendRepository;
	
	public Optional<Friend> getFriend(final FriendId id) {
		return friendRepository.findById(id);
	}
	
	public Iterable<Friend> getFriends() {
		return friendRepository.findAll();
	}
	
	
	public void deleteFriend(final FriendId id) {
		friendRepository.deleteById(id);
	}
	
	public Friend saveFriend(Friend Friend) {
		if(Friend.user1.uid==Friend.user2.uid) return null;
		Friend savedFriend = friendRepository.save(Friend);
		return savedFriend;
	}

	public Iterable<Friend> getFriendsById(Long id_user) {
		return friendRepository.findByIdUser(id_user);
	}

	public Iterable<Integer> getCommonFriends(Long user1, Long user2) {
		return friendRepository.findCommonFriends(user1, user2);
	}



}