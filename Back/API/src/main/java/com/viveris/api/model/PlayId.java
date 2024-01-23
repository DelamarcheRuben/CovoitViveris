package com.viveris.api.model;

import java.io.Serializable;

import jakarta.persistence.Embeddable;

@Embeddable
public class PlayId implements Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long UID_league;
	private Long UID_user;

	public PlayId() {
    }
	
    
	
	public PlayId(Long uID_league, Long uID_user) {
		UID_league = uID_league;
		UID_user = uID_user;
	}

	public Long getUID_league() {
		return UID_league;
	}



	public void setUID_league(Long uID_league) {
		UID_league = uID_league;
	}



	public Long getUID_user() {
		return UID_user;
	}



	public void setUID_user(Long uID_user) {
		UID_user = uID_user;
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