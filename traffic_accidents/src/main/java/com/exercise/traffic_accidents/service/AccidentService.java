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

    public List<TrafficAccidentInfo> getTrafficAccidentList(TrafficAccidentInfo params) {
        return accidentMapper.getTrafficAccidentList(params);
    }

    public Integer getTotalCountTrafficAccidents(TrafficAccidentInfo params) {
        return accidentMapper.getTotalCountTrafficAccidents(params);
    }

    public TrafficAccidentInfo getTrafficAccidentInfo(Integer objtId) {
        return accidentMapper.getTrafficAccidentInfo(objtId);
    }

    public TrafficAccidentInfo getTrafficAccidentInfoByPoint(String point) {
        return accidentMapper.getTrafficAccidentInfoByPoint(point);
    }
}
