package com.viveris.api.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    public Long UID;

    public String pseudo;
    
    public String job;
    
    public String city;
    
    public String picture_background;
    
    public Integer nb_carshares;
    
    public Integer kilometers;

    public Integer experience;

}
