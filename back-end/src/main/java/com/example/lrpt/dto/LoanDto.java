package com.example.lrpt.dto;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class LoanDto {

    private Long loan_id;
    private AccountDto user_account;
    private Double loan_origin_amount;
    private Double amountOwed;
    private Double interest_rate;
    private Double automaticPayment;
    private Timestamp created_at;

}
