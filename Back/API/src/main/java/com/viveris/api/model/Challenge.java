package com.viveris.api.model;

import java.time.LocalDateTime;


import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "challenge")
public class Challenge {

    @Id
    public Long UID;

    public String name;
    
    public String description;
    
    public Float goal;
    
    public Float bonus_exp;
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    public LocalDateTime expired_date;
}
