package com.viveris.api.repository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.viveris.api.model.Address;

@Repository
public interface AddressRepository extends CrudRepository<Address, Long> {
}