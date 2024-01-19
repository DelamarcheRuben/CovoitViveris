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
@Table(name = "league")
public class League {

    @Id
    public Long UID;
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    public LocalDateTime start_date;

    @JsonFormat(pattern = "yyyy-MM-dd")
    public LocalDateTime end_date;
}
