package com.viveris.api.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.SendEmailRequest;
import com.resend.services.emails.model.SendEmailResponse;

import com.viveris.api.model.Carshare;
import com.viveris.api.model.Passenger;
import com.viveris.api.model.PassengerId;
import com.viveris.api.model.User;
import com.viveris.api.repository.CarshareRepository;
import com.viveris.api.repository.PassengerRepository;
import com.viveris.api.repository.UserRepository;

import lombok.Data;

@Data
@Service
public class PassengerService {

	@Autowired
	private PassengerRepository passengerRepository;
	
	@Autowired
	private CarshareRepository carshareRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	public Optional<Passenger> getPassenger(final PassengerId id) {
		return passengerRepository.findById(id);
	}
	
	public Iterable<Passenger> getPassengers() {
		return passengerRepository.findAll();
	}
	
	
	public void deletePassenger(final PassengerId id) {
		passengerRepository.deleteById(id);
	}
	
	public Passenger savePassenger(Passenger Passenger) {
		Passenger savedPassenger = passengerRepository.save(Passenger);
		
		if(Passenger.getHas_validated())
		{
			
			Carshare carshare = carshareRepository.findById(Passenger.uid.getuid_carshare()).get();
			boolean finished = carshare.getHas_validated();
			if(finished)
			{
				Iterable<Passenger> passengers = passengerRepository.FindAllByIdCarshare(Passenger.uid.getuid_carshare());
				for(Passenger p:passengers)
				{
					if(!p.getHas_validated()) 
					{
						finished = false;
						break;
					}
				}
			}
			
			
			carshare.setFinished(finished);
			carshareRepository.save(carshare);
		}
		else {
			Carshare carshare = carshareRepository.findById(Passenger.uid.getuid_carshare()).get();
			
			User driver = carshare.getDriver();
			
			String email = driver.getEmail();
			
			String driverPseudo = driver.getPseudo();
			
			User p = userRepository.findById(Passenger.uid.getuid_passenger()).get();
		
			String passengerPseudo = p.getPseudo();
			
			String schedule = carshare.getSchedule().toString();
			
			String[] dateheure = schedule.split("T", 2);
			
	        Resend resend = new Resend("re_JSTPEyhF_HPRFLjDQDTKKbYTmjzAjCfoD");

	        String mailhtml = "<p>" + driverPseudo + ",<br />"
	        		 + passengerPseudo +
	        		" a réservé une place sur votre covoiturage du "
	        		 + dateheure[0] + " à " + dateheure[1] + ".</p>";
	        
	        System.out.println(mailhtml);
	        
	        
	        SendEmailRequest sendEmailRequest = SendEmailRequest.builder()
	                .from("Notification covoiturage<onboarding@resend.dev>")
	                .to(email)
	                .subject("Nouveau passager pour un de vos covoiturages")
	                .html(mailhtml)
	                .build();

	         try {
	            SendEmailResponse data = resend.emails().send(sendEmailRequest);
	            System.out.println("Email " + data.getId() + " envoyé.");
	        } catch (ResendException e) {
	        	System.out.println("échec de l'envoi de l'email: " + e.getMessage());
	        }
		}
		
		return savedPassenger;
	}

	public Iterable<Passenger> getPassengersByIdCarshare(Long id_carshare) {
		return passengerRepository.FindAllByIdCarshare(id_carshare);
	}

	public Iterable<Passenger> getDistinctPassengersFromUser(Long id_user) {
		return passengerRepository.findDistinctPassengersFromUser(id_user);
	}

}