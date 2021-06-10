package com.exercise.traffic_accidents.mapper;

import java.util.List;

import com.exercise.traffic_accidents.dto.ChartAccidentType;
import com.exercise.traffic_accidents.dto.ChartCasualties;
import com.exercise.traffic_accidents.dto.ChartCasualtiesPerDay;
import com.exercise.traffic_accidents.dto.TrafficAccidentInfo;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AccidentMapper {

    public List<TrafficAccidentInfo> getTrafficAccidentList(TrafficAccidentInfo params);

    public Integer getTotalCountTrafficAccidents(TrafficAccidentInfo params);

    public TrafficAccidentInfo getTrafficAccidentInfo(Integer objtId);

    public TrafficAccidentInfo getTrafficAccidentInfoByPoint(String point);

    public List<ChartCasualtiesPerDay> getCasualtiesPerDayData(TrafficAccidentInfo params);

    public List<ChartAccidentType> getAccidentTypeData(TrafficAccidentInfo params);

    public List<ChartCasualties> getCasualtiesData(TrafficAccidentInfo params);
}
