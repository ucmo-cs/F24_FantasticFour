package com.example.lrpt.service;


import com.example.lrpt.models.Account;
import com.example.lrpt.models.Loan;
import com.example.lrpt.repository.AccountRepository;
import com.example.lrpt.repository.LoanRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@AllArgsConstructor
@Service
public class LoanService {

    private final LoanRepository loanRepository;
    private final AccountRepository accountRepository;

    @Transactional
    public Loan create(Loan loan, Long id) {
        Account account = accountRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Account not found: " + id));
        loan.setUseraccount(account);
        return loanRepository.save(loan);
    }

    @Transactional(readOnly = true)
    public List<Loan> findAll() { 
        return loanRepository.findAll(); 
    }

    @Transactional(readOnly = true)
    public Loan findByloanid(long loanid) {
        return loanRepository.findById(loanid)
            .orElseThrow(() -> new RuntimeException("Loan not found: " + loanid));
    }

    @Transactional(readOnly = true)
    public List<Loan> findByUserId(Long userId) {
        return loanRepository.findByUseraccountUserId(userId)
                .orElseThrow(() -> new RuntimeException("Loans not found for user: " + userId));
    }
}
