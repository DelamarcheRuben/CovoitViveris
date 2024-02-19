package com.viveris.api.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.viveris.api.model.Friend;
import com.viveris.api.model.FriendId;

@Repository
public interface FriendRepository extends CrudRepository<Friend, FriendId> {

	@Query(value="SELECT * FROM FRIEND WHERE user1 = :id_user OR user2 = :id_user", nativeQuery = true)
	Iterable<Friend> findByIdUser(@Param("id_user") Long id_user);
}