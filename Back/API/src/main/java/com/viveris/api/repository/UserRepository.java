package com.viveris.api.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.viveris.api.model.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
	Iterable<User> findByPseudo(String pseudo);
}