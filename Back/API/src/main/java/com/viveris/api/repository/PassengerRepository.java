package com.viveris.api.repository;

import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.viveris.api.model.Passenger;
import com.viveris.api.model.PassengerId;
import com.viveris.api.model.User;

@Repository
public interface PassengerRepository extends CrudRepository<Passenger, PassengerId> {

	
	@Query(value = "SELECT * FROM Passenger WHERE uid_carshare= :id_carshare", nativeQuery = true)
	Iterable<Passenger> findAllByIdCarshare(@Param("id_carshare") Long id_carshare);

	
	@Query(value = "SELECT COUNT(u.uid) FROM (Passenger p JOIN Carshare c ON(p.uid_carshare=c.uid)) JOIN Users u ON(p.uid_passenger=u.uid) WHERE p.uid_passenger = :id_user", nativeQuery = true)
	Integer findDistinctPassengersFromUser(@Param("id_user") Long id_user);

	@Query(value = "SELECT * FROM Passenger WHERE uid_passenger= :id_user", nativeQuery = true)
	Iterable<Passenger> findAllByIdUser(@Param("id_user") Long id_user);

	@Query(value = "SELECT COUNT(u.uid) FROM (Passenger p JOIN Carshare c ON(p.uid_carshare=c.uid)) JOIN Users u ON(p.uid_passenger=u.uid) "
			+ " WHERE c.uid_driver = :id_user AND DATE_FORMAT(c.schedule, \"%Y-%m-%d\") >= :start_date AND DATE_FORMAT(c.schedule, \"%Y-%m-%d\") <= :end_date "
			+ " AND c.has_validated IS TRUE", nativeQuery = true)
	Integer findDistinctPassengersFromUserWithDates(@Param("id_user") Long id_user,@Param("start_date") LocalDateTime start_date,@Param("end_date") LocalDateTime end_date);
}