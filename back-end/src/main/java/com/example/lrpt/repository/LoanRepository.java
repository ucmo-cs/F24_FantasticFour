package com.example.lrpt.repository;

import com.example.lrpt.models.Loan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface LoanRepository extends JpaRepository <Loan, Long >{


}
