package com.example.lrpt.service;


import com.example.lrpt.models.Account;
import com.example.lrpt.models.Customer;
import com.example.lrpt.repository.AccountRepository;
import com.example.lrpt.repository.CustomerRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class CustomerService {
    private final CustomerRepository customerRepository;
    private final AccountRepository accountRepository;

    @Transactional
    public Customer create(Customer customer, long id) {

        Account account = accountRepository.findByAccountId(id).orElse(null);
        if(account!=null){
            customer.setCustomer_account(account);
        }

        return customerRepository.save(customer);

    }

    @Transactional
    public Customer findCustomer(long id) {
        return customerRepository.findById(id).orElseThrow(()-> new IllegalArgumentException("Check Id"));

    }


}
