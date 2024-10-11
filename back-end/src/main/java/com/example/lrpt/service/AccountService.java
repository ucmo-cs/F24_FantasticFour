package com.example.lrpt.service;
import com.example.lrpt.models.Account;
import com.example.lrpt.repository.AccountRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@AllArgsConstructor
@Service
public class AccountService {

    private final AccountRepository accountRepository;

    @Transactional
    public Account create(Account acct) {

        return accountRepository.save(acct);

    }
}

