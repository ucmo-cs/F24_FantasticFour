package com.example.lrpt.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Loan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long loan_id;

    private String loan_origin_amount;
    private String interest_rate;
    private String automaticPayment;

    private Timestamp created_at;

    @ManyToOne
    @JoinColumn(name = "accountId")
    private Account user_account;

}

