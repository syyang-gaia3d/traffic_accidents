package com.exercise.traffic_accidents.mapper;

import java.util.List;

import com.exercise.traffic_accidents.dto.Cgg;
import com.exercise.traffic_accidents.dto.Emd;
import com.exercise.traffic_accidents.dto.Sido;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface DistinctMapper {

    public List<Sido> getSidoData();

    public List<Cgg> getCggData();

    public List<Emd> getEmdData();
}
