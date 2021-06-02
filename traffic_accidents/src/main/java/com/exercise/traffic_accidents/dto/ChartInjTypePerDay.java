package com.exercise.traffic_accidents.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ChartInjTypePerDay {
    // 조회기간동안 일별 사고형태 건 수

    private String occuDate;
    private String lclas;
    private String count;
}
