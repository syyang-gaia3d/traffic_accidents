package com.exercise.traffic_accidents.service;

import com.exercise.traffic_accidents.dto.Policy;
import com.exercise.traffic_accidents.mapper.PolicyMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PolicyService {

    @Autowired
    private PolicyMapper policyMapper;

    public Policy selectPolicy() {
        return policyMapper.selectPolicy();
    }
}
