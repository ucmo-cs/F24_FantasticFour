package com.example.lrpt.dto;


import lombok.Data;

@Data
public class CustomerDto {

    private long customerId;
    private Boolean user_type;
    private String userId;
    private String userName;
    private String password;
    private String email;
    private String phoneNumber;


}
