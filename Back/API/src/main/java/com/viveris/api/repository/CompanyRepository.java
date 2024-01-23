package com.viveris.api.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.viveris.api.model.Company;

@Repository
public interface CompanyRepository extends CrudRepository<Company, Long> {
}