package com.viveris.api.repository;

import org.hibernate.mapping.Join;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.viveris.api.model.Passenger;
import com.viveris.api.model.PassengerId;

@Repository
public interface PassengerRepository extends CrudRepository<Passenger, PassengerId> {
}