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
@Table(name = "ownedbadge")
public class OwnedBadge {

    @EmbeddedId
    public OwnedBadgeId uid;

    @MapsId("uid_user")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="UID_user", referencedColumnName="UID")
    public User user;
    
    @MapsId("uid_badge")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="UID_badge", referencedColumnName="UID")
    public Badge badge;
    
    public Integer level;

}
