package com.viveris.api.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.viveris.api.model.Participate;
import com.viveris.api.model.ParticipateId;

@Repository
public interface ParticipateRepository extends CrudRepository<Participate, ParticipateId> {

	
	@Query(value="SELECT * FROM Participate WHERE UID_user = :id_user", nativeQuery = true)
	Iterable<Participate> findParticipatesByUserId(@Param("id_user") Long id_user);
}