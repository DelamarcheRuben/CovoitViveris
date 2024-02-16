package com.viveris.api.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.viveris.api.model.Friend;
import com.viveris.api.model.FriendId;

@Repository
public interface FriendRepository extends CrudRepository<Friend, FriendId> {
}