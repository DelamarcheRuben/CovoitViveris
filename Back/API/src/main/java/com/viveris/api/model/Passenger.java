package com.viveris.api.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;


import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;


@Data
@Entity
@Table(name = "passenger")
public class Passenger {

    @EmbeddedId
    @JsonProperty("UID")
    public PassengerId UID;

    @JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss")
    public LocalDateTime schedule;

    public String start_place;

}
