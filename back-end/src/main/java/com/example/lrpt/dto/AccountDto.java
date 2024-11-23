package com.example.lrpt.dto;

import lombok.Data;
import java.sql.Timestamp;

@Data
public class AccountDto {


    private Long userId;
    private String userName;
    private String firstName;
    private String password;
    private String email;
    private String phoneNumber;
    private String bankAccount;
    private String bankRouting;
    private Boolean user_type;
    private Timestamp created_at;



}
