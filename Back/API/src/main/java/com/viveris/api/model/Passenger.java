package com.viveris.api.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
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
@Table(name = "passenger")
public class Passenger {

    @EmbeddedId
    public PassengerId uid;

    @MapsId("uid_carshare")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="UID_carshare", referencedColumnName="UID")
    public Carshare carshare;
    
    @MapsId("uid_passenger")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="UID_passenger", referencedColumnName="UID")
    public User user;
    
    @JsonFormat(pattern = "yyyy-MM-dd hh:mm")
    public LocalDateTime schedule;

    public String start_place;

}
