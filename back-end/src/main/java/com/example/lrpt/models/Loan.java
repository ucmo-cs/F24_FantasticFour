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
    private long loanid;

    private double loan_origin_amount;
    private double amountOwed;
    private double interest_rate;
    private double automaticPayment;

    private Timestamp created_at;

    @ManyToOne
    @JoinColumn(name = "userId")
    private Account useraccount;

}

