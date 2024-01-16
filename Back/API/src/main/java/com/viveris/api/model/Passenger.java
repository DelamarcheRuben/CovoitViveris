package com.viveris.api.model;

import java.io.Serializable;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.Data;


@Data
@Entity
@Table(name = "ispassenger")
public class Passenger {

    @EmbeddedId
    @JsonProperty("UID")
    public PassengerId UID;

    @JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss")
    public LocalDateTime schedule;

    public String start_place;

}
