package com.viveris.api.model;

import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "carshare")
public class Carshare {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="UID")
    public Long uid;

    public Integer max_passenger;

    public Boolean is_full;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    public LocalDateTime schedule;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="start_place", referencedColumnName="UID")
    public Address start_place;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="end_place", referencedColumnName="UID")
    public Address end_place;
    
    public Float distance;
    
    public Float bonus_pollution;

    public Boolean comeback;
    
    public Integer experience;
    
    public Boolean hasValidated;
    
    public Float CO2_economy;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="UID_driver", referencedColumnName="UID")
    public User driver;

}
