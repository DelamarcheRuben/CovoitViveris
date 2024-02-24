package com.viveris.api.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.viveris.api.model.OwnedBadge;
import com.viveris.api.model.OwnedBadgeId;

@Repository
public interface OwnedBadgeRepository extends CrudRepository<OwnedBadge, OwnedBadgeId> {
	
	@Query(value="SELECT * FROM OwnedBadge WHERE UID_user = :id_user", nativeQuery = true)
	Iterable<OwnedBadge> findByUser_Uid(@Param("id_user") Long id_user);
}