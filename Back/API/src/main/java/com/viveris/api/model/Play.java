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
@Table(name = "play")
public class Play {

    @EmbeddedId
    public PlayId uid;

    @MapsId("uid_user")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="UID_user", referencedColumnName="UID")
    public User user;
    
    @MapsId("uid_league")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="UID_league", referencedColumnName="UID")
    public League league;
    
    public Integer experience;

}
