package com.viveris.api.repository;

import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.viveris.api.model.Carshare;

@Repository
public interface CarshareRepository extends CrudRepository<Carshare, Long> {

	@Query(value = "SELECT * FROM Carshare "
			+ "WHERE uid NOT IN( "
			+ " SELECT uid FROM Carshare LEFT JOIN Passenger ON(uid=uid_carshare) "
			+ " WHERE (uid_passenger= :id_user) "
			+ "	OR UID_driver= :id_user) "
			+ " AND (NOT is_Full OR is_Full IS NULL)", nativeQuery = true)
	Iterable<Carshare> findNotFullCarshares(@Param("id_user") Long id_user);

	
	@Query(value = "SELECT * FROM Carshare "
			+ " WHERE DATE_FORMAT(schedule, \"%Y-%m-%d\") = :date"
			+ " AND "
			+ " uid NOT IN("
			+ "	SELECT uid FROM Carshare LEFT JOIN Passenger ON(uid=uid_carshare) "
			+ "	WHERE (uid_passenger= :id_user) "
			+ "	OR UID_driver= :id_user) "
			+ "	AND (NOT is_Full OR is_Full IS NULL)", nativeQuery = true)
	Iterable<Carshare> getSortedCarshares(@Param("id_user") Long id_user, @Param("date") String date);

	@Query(value = "SELECT * FROM Carshare "
			+ "WHERE uid IN( "
			+ " SELECT uid FROM Carshare LEFT JOIN Passenger ON(uid=uid_carshare) "
			+ " WHERE (uid_passenger= :id_user1 OR UID_driver= :id_user1) "
			+ " AND (uid_passenger= :id_user2 OR UID_driver= :id_user2)) ", nativeQuery = true)
	Iterable<Carshare> findCommonCarshares(Long id_user1, Long id_user2);

	@Query(value = "SELECT * FROM Carshare "
			+ "WHERE uid IN( "
			+ " SELECT uid FROM Carshare LEFT JOIN Passenger ON(uid=uid_carshare) "
			+ " WHERE (uid_passenger= :id_user) "
			+ "    OR UID_driver= :id_user) ", nativeQuery = true)
	Iterable<Carshare> findHistoryCarshares(Long id_user);


	
	@Query(value = "SELECT c.* FROM Carshare c JOIN Passenger p ON(uid=uid_carshare) "
			+ " WHERE uid_passenger= :id_user AND DATE_FORMAT(c.schedule, \"%Y-%m-%d\") > :yesterday ", nativeQuery = true)
	Iterable<Carshare> findReservationsCarshares(Long id_user, @Param("yesterday") String yesterday);


	@Query(value = "SELECT * FROM Carshare "
			+ "WHERE uid_driver= :id_user AND DATE_FORMAT(schedule, \"%Y-%m-%d\") > :yesterday ", nativeQuery = true)
	Iterable<Carshare> findProposedCarshares(Long id_user, String yesterday);
}