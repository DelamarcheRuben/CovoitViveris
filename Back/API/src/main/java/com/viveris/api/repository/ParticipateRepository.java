package com.viveris.api.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.viveris.api.model.Participate;
import com.viveris.api.model.ParticipateId;

@Repository
public interface ParticipateRepository extends CrudRepository<Participate, ParticipateId> {
}