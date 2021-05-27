package com.exercise.traffic_accidents.mapper;

import java.util.List;

import com.exercise.traffic_accidents.dto.TrafficAccidentInfo;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AccidentMapper {

    public List<TrafficAccidentInfo> getTrafficAccidentList(TrafficAccidentInfo params);
}
