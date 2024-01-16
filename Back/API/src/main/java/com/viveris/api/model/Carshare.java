package com.viveris.api.model;

import java.sql.Date;
import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "carshare")
public class Carshare {

    @Id
    public Long UID;

    public Integer max_passenger;

    public Boolean is_Full;
    
    @JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss")
    private LocalDateTime schedule;
    
    public String start_place;
    
    public String end_place;
    
    public Float distance;
    
    public Float bonus_pollution;

    public Boolean comeback;

    public Long UID_driver;

}
