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
@Table(name = "participate")
public class Participate {

    @EmbeddedId
    public ParticipateId uid;

    @MapsId("uid_user")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="UID_user", referencedColumnName="UID")
    public User user;
    
    @MapsId("uid_challenge")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="UID_challenge", referencedColumnName="UID")
    public Challenge challenge;
    
    public Float progress;
    
    public Float co2_economy;
    
    public Float kilometers;
    
    public Integer completed_rides;
    
    public Integer different_passengers;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    public LocalDateTime start_date;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    public LocalDateTime end_date;
    
    public Boolean has_completed;

    public Boolean time_over;

}
