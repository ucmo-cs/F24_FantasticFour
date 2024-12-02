package com.example.lrpt.controller;

import com.example.lrpt.dto.AutomaticPaymentDto;
import com.example.lrpt.dto.LoanDto;
import com.example.lrpt.models.Loan;
import com.example.lrpt.service.LoanService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;


@AllArgsConstructor
@RestController
public class LoanController {

    private final LoanService loanService;

    @CrossOrigin
    @PostMapping("/loans")
    public ResponseEntity<?> save(@RequestBody LoanDto loanDto) {
        try {
            Loan loan = new ModelMapper().map(loanDto, Loan.class);
            
            // Set initial values
            loan.setCreated_at(new Timestamp(System.currentTimeMillis()));
            loan.setAmountOwed(loan.getLoan_origin_amount()); // Initially, amount due equals loan amount
            
            // Get account ID from the nested user_account object
            long accountId = loanDto.getUser_account().getUserId();
            
            return new ResponseEntity<>(loanService.create(loan, accountId), HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace(); // Add this for debugging
            return new ResponseEntity<>("Failed to create loan: " + e.getMessage(), 
                                     HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin
    @GetMapping("/loans")
    public ResponseEntity<?> findAll() {
        return new ResponseEntity<>(loanService.findAll(), HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/loan/{id}")
    public ResponseEntity<?> findById(@PathVariable long id) {
        return new ResponseEntity<>(loanService.findByloanid(id), HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/loans/user/{userId}")
    public ResponseEntity<?> findByUserId(@PathVariable Long userId) {
        try {
            return new ResponseEntity<>(loanService.findByUserId(userId), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to fetch loan: " + e.getMessage(), 
                                     HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin
    @PutMapping("/loans/update-automatic-payment")
    public ResponseEntity<?> updateAutomaticPayment(@RequestBody AutomaticPaymentDto autoPaymentDto) {
        try {
            Loan loan = loanService.findByloanid(autoPaymentDto.getLoanid());
            loan.setAutomaticPayment(autoPaymentDto.getAutomaticPayment());
            //Testing to lower the amount owed for having partially paid loans
            loan.setAmountOwed(loan.getAmountOwed() - autoPaymentDto.getAutomaticPayment());
            if (loan.getAmountOwed() <= 0) {
                loan.setAmountOwed(0.0);
            }
            loanService.save(loan);
            return new ResponseEntity<>("Automatic payment updated", HttpStatus.OK);

        }
        catch (Exception e) {
            return new ResponseEntity<>("Failed to update automatic Payment", HttpStatus.BAD_REQUEST);
        }
    }
}
