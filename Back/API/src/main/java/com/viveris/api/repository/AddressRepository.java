package com.viveris.api.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.viveris.api.model.Address;

@Repository
public interface AddressRepository extends CrudRepository<Address, Long> {
	@Query(value = "SELECT * from Address WHERE (city = :city OR :city IS NULL) "
			+ "AND (department = :department OR :department IS NULL) "
			+ "AND (postcode = :postcode OR :postcode IS NULL) "
			+ "AND (road = :road OR :road IS NULL) "
			+ "AND (house_number = :house_number OR :house_number IS NULL)"
			+ " LIMIT 1", nativeQuery = true)
	Optional<Address> findAddress(@Param("city") String city, @Param("department") String department,
			@Param("postcode") Integer postcode, @Param("road") String road, @Param("house_number") Integer house_number);
}