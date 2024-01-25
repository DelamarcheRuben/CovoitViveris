package com.viveris.api.model;

import java.io.Serializable;

import jakarta.persistence.Embeddable;

@Embeddable
public class PassengerId implements Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long uid_carshare;
	private Long uid_passenger;

	public PassengerId() {
    }
	
    public PassengerId(Long uid_carshare, Long uid_passenger) {
        this.uid_carshare = uid_carshare;
        this.uid_passenger = uid_passenger;
    }
    
    public Long getuid_carshare() {
		return uid_carshare;
	}

	public void setuid_carshare(Long uID_carshare) {
		uid_carshare = uID_carshare;
	}

	public Long getuid_passenger() {
		return uid_passenger;
	}

	public void setuid_passenger(Long uID_passenger) {
		uid_passenger = uID_passenger;
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