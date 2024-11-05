package com.example.lrpt.controller;

import com.example.lrpt.dto.LoanDto;
import com.example.lrpt.models.Loan;
import com.example.lrpt.service.LoanService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.apache.coyote.Response;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;

@AllArgsConstructor
@RestController
public class LoanController {

    private final LoanService loanService;

    @CrossOrigin
    @PostMapping("/loan")
    public ResponseEntity<?> save(@RequestBody LoanDto loanDto) {

        Loan loan = new ModelMapper().map(loanDto, Loan.class);
        loan.setCreated_at(new Timestamp(System.currentTimeMillis()));

        //String userId = "testId";
        long accountId = 1;
        //userId
        //userName

        return new ResponseEntity<>(loanService.create(loan, accountId), HttpStatus.CREATED);

    }

    @CrossOrigin
    @GetMapping("/loans")
    public ResponseEntity<?> findAll() {
        return new ResponseEntity<>(loanService.findAll(), HttpStatus.OK);
    }

}
