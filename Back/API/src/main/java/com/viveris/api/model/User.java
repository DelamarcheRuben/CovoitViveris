package com.viveris.api.model;

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
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="UID")
    public Long uid;

    public String pseudo;
    
    public String password;
    
    public String first_name;
    
    public String last_name;
    
    public String email;
    
    public String job;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="address", referencedColumnName="UID")
    public Address address;
    
    public String picture_background;
    
    public String car_type;
    
    public Float fuel_consumption;
    
    public Integer nb_carshares;
    
    public Float kilometers;

    public Integer level;
    
    public Integer experience;
    
    public Float bonus_loyalty;
    
    @Column(name="CO_2_economy")
    public Float co2_economy;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="UID_company", referencedColumnName="UID")
    public Company company;

    /*@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="UID_sponsor", referencedColumnName="UID")
    public User company;*/
    
}
