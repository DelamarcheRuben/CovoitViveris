package com.viveris.api.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.viveris.api.model.OwnedBadge;
import com.viveris.api.model.OwnedBadgeId;

@Repository
public interface OwnedBadgeRepository extends CrudRepository<OwnedBadge, OwnedBadgeId> {
}