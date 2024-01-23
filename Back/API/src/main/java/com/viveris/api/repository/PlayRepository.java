package com.viveris.api.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.viveris.api.model.Play;
import com.viveris.api.model.PlayId;

@Repository
public interface PlayRepository extends CrudRepository<Play, PlayId> {
}