package com.exercise.traffic_accidents.controller;

import java.util.List;

import com.exercise.traffic_accidents.dto.Policy;
import com.exercise.traffic_accidents.dto.TrafficAccidentInfo;
import com.exercise.traffic_accidents.service.AccidentService;
import com.exercise.traffic_accidents.service.PolicyService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/")
public class AccidentController {

    @Autowired
    private AccidentService accidentService;
    @Autowired
    private PolicyService policyService;
    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping(value = "main")
    public String test(Model model, TrafficAccidentInfo params) {

        Policy policy = policyService.selectPolicy();
        List<TrafficAccidentInfo> trafficAccidentList = accidentService.selectTrafficAccidents(params);

        String policyJson = "";

        try {
            policyJson = objectMapper.writeValueAsString(policy);
        } catch(Exception e) {
            e.printStackTrace();
        }

        model.addAttribute("policyJson", policyJson);
        model.addAttribute("result", trafficAccidentList);

        return "/map";
    }
}
