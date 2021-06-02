package com.exercise.traffic_accidents.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ChartAccidentType {
    // 조회기간동안 사고구분별

    private String sclas;
    private String count;
}
