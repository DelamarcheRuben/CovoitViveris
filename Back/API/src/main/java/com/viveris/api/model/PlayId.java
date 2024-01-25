package com.viveris.api.model;

import java.io.Serializable;

import jakarta.persistence.Embeddable;

@Embeddable
public class PlayId implements Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long uid_league;
	private Long uid_user;

	public PlayId() {
    }
	
    
	
	public PlayId(Long uID_league, Long uID_user) {
		uid_league = uID_league;
		uid_user = uID_user;
	}

	public Long getuid_league() {
		return uid_league;
	}



	public void setuid_league(Long uID_league) {
		uid_league = uID_league;
	}



	public Long getuid_user() {
		return uid_user;
	}



	public void setuid_user(Long uID_user) {
		uid_user = uID_user;
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