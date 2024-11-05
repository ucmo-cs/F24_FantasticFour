package com.example.lrpt.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Customer {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long customerId;

    private Boolean user_type;
    private String userId;
    private String userName;
    private String password;
    private String email;
    private String phoneNumber;

    @ManyToOne
    @JoinColumn(name = "accountId")
    private Account customer_account;

}