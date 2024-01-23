package com.viveris.api.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.viveris.api.model.Company;
import com.viveris.api.service.CompanyService;

@RestController
@CrossOrigin
public class CompanyController {

	@Autowired
	private CompanyService companyService;
	
	/**
	 * Create - Add a new company
	 * @param company An object company
	 * @return The company object saved
	 */
	@PostMapping("/company")
	public Company createCompany(@RequestBody Company company) {
		return companyService.saveCompany(company);
	}
	
	
	/**
	 * Read - Get one company 
	 * @param id The id of the company
	 * @return A Company object full filled
	 */
	@GetMapping("/company/{id}")
	public Company getCompany(@PathVariable("id") final Long id) {
		Optional<Company> company = companyService.getCompany(id);
		if(company.isPresent()) {
			return company.get();
		} else {
			return null;
		}
	}
	
	/**
	 * Read - Get all companys
	 * @return - An Iterable object of Company full filled
	 */
	@GetMapping("/companies")
	public Iterable<Company> getCompanys() {
		return companyService.getCompanys();
	}
	
	/**
	 * Update - Update an existing company
	 * @param id - The id of the company to update
	 * @param company - The company object updated
	 * @return
	 */
	@PutMapping("/company/{id}")
	public Company updateCompany(@PathVariable("id") final Long id, @RequestBody Company company) {
		Optional<Company> e = companyService.getCompany(id);
		if(e.isPresent()) {
			company.setUid(id);
			Company currentCompany = company;
			companyService.saveCompany(currentCompany);
			return currentCompany;
		} else {
			return null;
		}
	}
	
	
	/**
	 * Delete - Delete an company
	 * @param id - The id of the company to delete
	 */
	@DeleteMapping("/company/{id}")
	public void deleteCompany(@PathVariable("id") final Long id) {
		companyService.deleteCompany(id);
	}

}