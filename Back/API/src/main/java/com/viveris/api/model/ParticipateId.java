package com.viveris.api.model;

import java.io.Serializable;

import jakarta.persistence.Embeddable;

@Embeddable
public class ParticipateId implements Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long uid_challenge;
	private Long uid_user;

	public ParticipateId(Long uID_challenge, Long uID_user) {
		uid_challenge = uID_challenge;
		uid_user = uID_user;
	}

    

	public Long getuid_league() {
		return uid_challenge;
	}



	public void setuid_league(Long uID_league) {
		uid_challenge = uID_league;
	}



	public Long getuid_user() {
		return uid_user;
	}



	public void setuid_user(Long uID_user) {
		uid_user = uID_user;
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