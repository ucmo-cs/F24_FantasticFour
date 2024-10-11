package com.example.lrpt.controller;


import com.example.lrpt.models.Account;
import com.example.lrpt.dto.AccountDto;
import com.example.lrpt.service.AccountService;
import lombok.AllArgsConstructor;
//import org.modelmapper.ModelMapper;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Timestamp;

@AllArgsConstructor
@RestController
public class AccountController {

    private final AccountService accountService;

    @CrossOrigin
    @PostMapping("/account")
    public ResponseEntity<?> save(@RequestBody AccountDto accountDto) {

        Account account = new ModelMapper().map(accountDto, Account.class);
        account.setCreated_at(new Timestamp(System.currentTimeMillis()));

        return new ResponseEntity<>(accountService.create(account), HttpStatus.CREATED);

    }



}
