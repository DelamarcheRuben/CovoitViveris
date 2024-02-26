package com.viveris.api.service;

import java.time.LocalDateTime;
import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.Attachment;
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
				Iterable<Passenger> passengers = passengerRepository.findAllByIdCarshare(Passenger.uid.getuid_carshare());
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
			
			
			
			ClassLoader classLoader = getClass().getClassLoader();
			InputStream inputStream = classLoader.getResourceAsStream("logo_viveris_full.png");
			if(inputStream == null) {
				System.out.println("Ressource not found.");
			}
			else {
				
				String fileContent;
				
				try {
					fileContent = Base64.getEncoder().encodeToString(inputStream.readAllBytes());
					
					Attachment att = Attachment.builder()
							.fileName("logo_viveris_full.png")
							.content(fileContent)
							.build();
					
			        Resend resend = new Resend("re_JSTPEyhF_HPRFLjDQDTKKbYTmjzAjCfoD");
		
			        String mailhtml = "<html><head></head>"
			        		+ "<body><p>" + driverPseudo + ",<br />"
			        		 + passengerPseudo +
			        		" a réservé une place sur votre covoiturage du "
			        		 + dateheure[0] + " à " + dateheure[1] + ".</p>"
			        		 		+ "<img src=\"cid:logo_viveris_full.png\"/>"
			        		 		+ "</body></html>";
			        
			        
			        
			        SendEmailRequest sendEmailRequest = SendEmailRequest.builder()
			                .from("Notification covoiturage<onboarding@resend.dev>")
			                .to(email)
			                .subject("Nouveau passager pour un de vos covoiturages")
			                .html(mailhtml)
			                .attachments(att)
			                .build();
		
			         try {
			            SendEmailResponse data = resend.emails().send(sendEmailRequest);
			            System.out.println("Email " + data.getId() + " envoyé.");
			        } catch (ResendException e) {
			        	System.out.println("échec de l'envoi de l'email: " + e.getMessage());
			        }
				} catch (IOException e) {
					System.out.println("échec de lecture de la ressource: " + e.getMessage());
				}
				
				
			}
		}
		
		return savedPassenger;
	}

	public Iterable<Passenger> getPassengersByIdCarshare(Long id_carshare) {
		return passengerRepository.findAllByIdCarshare(id_carshare);
	}

	public Integer getDistinctPassengersFromUser(Long id_user) {
		return passengerRepository.findDistinctPassengersFromUser(id_user);
	}

	public Iterable<Passenger> getPassengersByIdUser(Long id_user) {
		return passengerRepository.findAllByIdUser(id_user);
	}

	public Integer getDistinctPassengersFromUserWithDates(Long id_user, LocalDateTime start_date,
			LocalDateTime end_date) {
		return passengerRepository.findDistinctPassengersFromUserWithDates(id_user, start_date, end_date);
	}

}