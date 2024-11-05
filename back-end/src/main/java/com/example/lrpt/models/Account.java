package com.example.lrpt.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long accountId;


    private String bankAccount;
    private String bankRouting;
    private Timestamp created_at;

    @OneToMany(mappedBy = "user_account")
    @JsonIgnore
    private List<Loan>  loans = new ArrayList<>();

    @OneToMany(mappedBy = "customer_account")
    @JsonIgnore
    private List<Customer> customers = new ArrayList<>();

}
