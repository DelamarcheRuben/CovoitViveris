package com.viveris.api.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.viveris.api.model.Address;

@Repository
public interface AddressRepository extends CrudRepository<Address, Long> {
	@Query(value = "SELECT * from Address WHERE city = :city AND department = :department AND postcode = :postcode"
			+ " AND road = :road AND house_number = :house_number", nativeQuery = true)
	Optional<Address> findAddress(@Param("city") String city, @Param("department") String department,
			@Param("postcode") Integer postcode, @Param("road") String road, @Param("house_number") Integer house_number);
}