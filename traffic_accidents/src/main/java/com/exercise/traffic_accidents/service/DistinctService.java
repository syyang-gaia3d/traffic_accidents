package com.exercise.traffic_accidents.service;

import java.util.List;

import com.exercise.traffic_accidents.dto.Cgg;
import com.exercise.traffic_accidents.dto.Emd;
import com.exercise.traffic_accidents.dto.Sido;
import com.exercise.traffic_accidents.mapper.DistinctMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DistinctService {

    @Autowired
    DistinctMapper distinctMapper;

    public List<Sido> getSidoData() {
        return distinctMapper.getSidoData();
    }

    public List<Cgg> getCggData() {
        return distinctMapper.getCggData();
    }

    public List<Emd> getEmdData() {
        return distinctMapper.getEmdData();
    }
}
