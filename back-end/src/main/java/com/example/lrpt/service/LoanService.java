package com.example.lrpt.service;


import com.example.lrpt.models.Account;
import com.example.lrpt.models.Loan;
import com.example.lrpt.repository.AccountRepository;
import com.example.lrpt.repository.LoanRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class LoanService {

    private final LoanRepository loanRepository;
    private final AccountRepository accountRepository;

    @Transactional
    public Loan create(Loan loan, long id){

        Account account = accountRepository.findByAccountId(id).orElse(null);

        if(account!=null){
            loan.setUser_account(account);
        }

        return loanRepository.save(loan);

    }
    @Transactional(readOnly = true)
    public List<Loan> findAll() { return loanRepository.findAll(); }

    @Transactional
    public Loan findById(long id) { return loanRepository.findById(id).orElse(null); }

}
