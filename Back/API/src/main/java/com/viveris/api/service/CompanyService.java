package com.viveris.api.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.viveris.api.model.Company;
import com.viveris.api.repository.CompanyRepository;

import lombok.Data;

@Data
@Service
public class CompanyService {

	@Autowired
	private CompanyRepository companyRepository;
	
	public Optional<Company> getCompany(final Long id) {
		return companyRepository.findById(id);
	}
	
	public Iterable<Company> getCompanys() {
		return companyRepository.findAll();
	}
	
	
	public void deleteCompany(final Long id) {
		companyRepository.deleteById(id);
	}
	
	public Company saveCompany(Company Company) {
		Company savedCompany = companyRepository.save(Company);
		return savedCompany;
	}

	public Optional<Company> findCompany(String name) {
		return companyRepository.findCompanyByName(name);
	}

}