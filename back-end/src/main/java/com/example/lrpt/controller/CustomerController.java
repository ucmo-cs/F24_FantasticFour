package com.example.lrpt.controller;

import com.example.lrpt.dto.CustomerDto;
import com.example.lrpt.models.Customer;
import com.example.lrpt.service.CustomerService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@AllArgsConstructor
@RestController
public class CustomerController {

    private final CustomerService customerService;

    @CrossOrigin
    @PostMapping("/customer")
    public ResponseEntity<?> save(@RequestBody CustomerDto customerDto) {

        Customer customer = new ModelMapper().map(customerDto, Customer.class);
        long accountId = 1;

        return new ResponseEntity<>(customerService.create(customer, accountId), HttpStatus.CREATED);
    }



    @CrossOrigin
    @GetMapping ("/customer/{id}")
    public ResponseEntity<?> findAccount(@PathVariable long id) {
        return new ResponseEntity<>(customerService.findCustomer(id), HttpStatus.OK);
    }

}
