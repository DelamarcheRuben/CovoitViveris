package com.viveris.api.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.viveris.api.model.Passenger;
import com.viveris.api.model.PassengerId;

@Repository
public interface PassengerRepository extends CrudRepository<Passenger, PassengerId> {

	
	@Query(value = "SELECT * FROM Passenger WHERE uid_carshare= :id_carshare", nativeQuery = true)
	Iterable<Passenger> FindAllByIdCarshare(@Param("id_carshare") Long id_carshare);
}