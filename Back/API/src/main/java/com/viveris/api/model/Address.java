package com.viveris.api.model;

import java.time.LocalDateTime;


import com.fasterxml.jackson.annotation.JsonFormat;

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
import lombok.Getter;

@Data
@Entity
@Table(name = "address")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="UID")
    public Long uid;
    
    public String city;
    
    public String department;

    public Integer postcode;
    
    public String road;

    public Integer house_number;

    public Double latitude;

    public Double longitude;

    public String getFullAddress() {
    	String res = "";
    	if(house_number!=null) res+=house_number+" ";
    	if(road!=null) res+=road+", ";
    	if(city!=null) res+=city+" ";
    	if(postcode!=null) res+="("+postcode+")";
        return res;
    }
    
    public String getHouseRoad() {
    	String res = "";
    	if(house_number!=null) res+=house_number+" ";
    	if(road!=null) res+=road;
        return res;
    }
    
    public String getCityPostcode() {
    	String res = "";
    	if(city!=null) res+=city+" ";
    	if(postcode!=null) res+="("+postcode+")";
        return res;
    }
}
