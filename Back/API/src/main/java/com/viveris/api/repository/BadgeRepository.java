package com.viveris.api.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.viveris.api.model.Badge;

@Repository
public interface BadgeRepository extends CrudRepository<Badge, Long> {
}