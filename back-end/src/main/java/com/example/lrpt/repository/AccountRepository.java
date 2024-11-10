package com.example.lrpt.repository;

import com.example.lrpt.models.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

    Optional<Account> findByuserId(long userId);
    Optional<Account> findByuserName(String userName);


}
