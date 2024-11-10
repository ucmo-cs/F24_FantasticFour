package com.example.lrpt.controller;


import com.example.lrpt.models.Account;
import com.example.lrpt.dto.AccountDto;
import com.example.lrpt.service.AccountService;
import lombok.AllArgsConstructor;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @CrossOrigin
    @PostMapping("/login")
    public ResponseEntity<AccountDto> login(@RequestBody AccountDto loginRequest) {

        Account account = accountService.validateUser(loginRequest.getUserName(), loginRequest.getPassword());

        AccountDto accountDto = new ModelMapper().map(account, AccountDto.class);

        return ResponseEntity.ok(accountDto);
    }


    @CrossOrigin
    @GetMapping("/account")
    public ResponseEntity<?> findAll() {
        return new ResponseEntity<>(accountService.findAll(), HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping ("/account/{id}")
    public ResponseEntity<?> findAccount(@PathVariable long id) {

        return new ResponseEntity<>(accountService.findAccount(id), HttpStatus.OK);
    }


}
