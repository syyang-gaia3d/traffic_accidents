package com.exercise.traffic_accidents.service;

import java.util.List;

import com.exercise.traffic_accidents.dto.TrafficAccidentInfo;
import com.exercise.traffic_accidents.mapper.AccidentMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccidentService {

    @Autowired
    private AccidentMapper accidentMapper;

    public List<TrafficAccidentInfo> selectTrafficAccidents(TrafficAccidentInfo params) {
        return accidentMapper.selectTrafficAccidents(params);
    }
}
