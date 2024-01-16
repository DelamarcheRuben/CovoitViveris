package com.viveris.api.model;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import jakarta.persistence.ManyToOne;

@Embeddable
public class PassengerId implements Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long UID_carshare;
	private Long UID_passenger;

	public PassengerId() {
    }
	
    public PassengerId(Long UID_carshare, Long UID_passenger) {
        this.UID_carshare = UID_carshare;
        this.UID_passenger = UID_passenger;
    }
    
    public Long getUID_carshare() {
		return UID_carshare;
	}

	public void setUID_carshare(Long uID_carshare) {
		UID_carshare = uID_carshare;
	}

	public Long getUID_passenger() {
		return UID_passenger;
	}

	public void setUID_passenger(Long uID_passenger) {
		UID_passenger = uID_passenger;
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