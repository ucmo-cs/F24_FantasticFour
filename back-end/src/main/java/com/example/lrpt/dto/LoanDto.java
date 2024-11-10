package com.example.lrpt.dto;

import lombok.Data;

@Data
public class LoanDto {

    private double loan_origin_amount;
    private double amountOwed;
    private double interest_rate;
    private double automaticPayment;

}
