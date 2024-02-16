package com.viveris.api.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.viveris.api.model.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
	Optional<User> findFirstByPseudo(String pseudo);
}