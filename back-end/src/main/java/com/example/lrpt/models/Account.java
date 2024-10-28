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
    private long account_id;

    private Boolean user_type;
    private String userId;
    private String userName;
    private String password;
    private String email;
    private String phoneNumber;
    private String bankAccount;
    private String bankRouting;

    private Timestamp created_at;

    @OneToMany(mappedBy = "user_account")
    @JsonIgnore
    private List<Loan>  loans = new ArrayList<>();


}
