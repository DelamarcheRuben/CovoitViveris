package com.viveris.api.model;

import java.io.Serializable;

import jakarta.persistence.Embeddable;

@Embeddable
public class ParticipateId implements Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long UID_challenge;
	private Long UID_user;

	public ParticipateId(Long uID_challenge, Long uID_user) {
		UID_challenge = uID_challenge;
		UID_user = uID_user;
	}

    

	public Long getUID_league() {
		return UID_challenge;
	}



	public void setUID_league(Long uID_league) {
		UID_challenge = uID_league;
	}



	public Long getUID_user() {
		return UID_user;
	}



	public void setUID_user(Long uID_user) {
		UID_user = uID_user;
	}



	public ParticipateId() {
    }
	

	
	@Override
	public boolean equals(Object obj) {
		return super.equals(obj);
	}
	
	@Override
	public int hashCode() {
		return super.hashCode();
	}
}