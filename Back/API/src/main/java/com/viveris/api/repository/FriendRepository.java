package com.viveris.api.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.viveris.api.model.Friend;
import com.viveris.api.model.FriendId;
import com.viveris.api.model.User;

@Repository
public interface FriendRepository extends CrudRepository<Friend, FriendId> {

	@Query(value="SELECT * FROM FRIEND WHERE user1 = :id_user OR user2 = :id_user", nativeQuery = true)
	Iterable<Friend> findByIdUser(@Param("id_user") Long id_user);

	
	@Query(value="((SELECT user2 FROM friend "
			+ "WHERE user1 = :user1) "
			+ "UNION "
			+ "(SELECT user1 FROM friend "
			+ "WHERE user2 = :user1)) "
			+ "INTERSECT "
			+ "((SELECT user2 FROM friend "
			+ "WHERE user1 = :user2) "
			+ "UNION "
			+ "(SELECT user1 FROM friend "
			+ "WHERE user2 = :user2))", nativeQuery = true)
	Iterable<Integer> findCommonFriends(@Param("user1") Long user1, @Param("user2") Long user2);
}