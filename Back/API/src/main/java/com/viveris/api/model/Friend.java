package com.viveris.api.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;


import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.Data;


@Data
@Entity
@Table(name = "friend")
public class Friend {

    @EmbeddedId
    public FriendId uid;

    @MapsId("user1")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="user1", referencedColumnName="UID")
    public User user1;
    
    @MapsId("user2")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="user2", referencedColumnName="UID")
    public User user2;
}
