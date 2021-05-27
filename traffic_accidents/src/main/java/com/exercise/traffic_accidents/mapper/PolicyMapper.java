package com.exercise.traffic_accidents.mapper;

import com.exercise.traffic_accidents.dto.Policy;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PolicyMapper {
    Policy selectPolicy();
}
