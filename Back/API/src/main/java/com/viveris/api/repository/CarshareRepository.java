package com.viveris.api.repository;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.viveris.api.model.Carshare;
import com.viveris.api.model.User;

@Repository
public interface CarshareRepository extends CrudRepository<Carshare, Long> {
}