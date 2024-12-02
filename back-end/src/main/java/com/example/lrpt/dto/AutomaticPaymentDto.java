package com.example.lrpt.dto;

import lombok.Data;

@Data
public class AutomaticPaymentDto {
    private Long loanid;
    private Double automaticPayment;
}
