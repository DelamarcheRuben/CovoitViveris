package com.viveris.api.model;

import java.io.Serializable;

import jakarta.persistence.Embeddable;

@Embeddable
public class FriendId implements Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long user1;
	private Long user2;

	public FriendId() {
    }
	
    
	
	public FriendId(Long user1, Long user2) {
		this.user1 = user1;
		this.user1 = user2;
	}

	public Long getUidUser1() {
		return user1;
	}



	public void setUser1(Long user) {
		user1 = user;
	}



	public Long getUidUser2() {
		return user2;
	}



	public void setUser2(Long user) {
		user2 = user;
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