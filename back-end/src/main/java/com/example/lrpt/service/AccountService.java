package com.example.lrpt.service;
import com.example.lrpt.models.Account;
import com.example.lrpt.models.Loan;
import com.example.lrpt.repository.AccountRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@AllArgsConstructor
@Service
public class AccountService {

    private final AccountRepository accountRepository;

    @Transactional
    public Account create(Account acct) {

        return accountRepository.save(acct);

    }

    @Transactional(readOnly = true)
    public Account findAccount(long accountId) {
        return accountRepository.findByAccountId(accountId).orElseThrow(()-> new IllegalArgumentException("Check Id"));
    }

    @Transactional(readOnly = true)
    public List<Account> findAll() { return accountRepository.findAll(); }
}

