package com.viveris.api.model;

import java.io.Serializable;

import jakarta.persistence.Embeddable;

@Embeddable
public class OwnedBadgeId implements Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long uid_user;
	private Long uid_badge;

	public OwnedBadgeId() {
    }
	
    public OwnedBadgeId(Long uid_user, Long uid_badge) {
        this.uid_user = uid_user;
        this.uid_badge = uid_badge;
    }
    
    public Long getuid_user() {
		return uid_user;
	}

	public void setuid_user(Long uID_carshare) {
		uid_user = uID_carshare;
	}

	public Long getuid_badge() {
		return uid_badge;
	}

	public void setuid_badge(Long uID_badge) {
		uid_badge = uID_badge;
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