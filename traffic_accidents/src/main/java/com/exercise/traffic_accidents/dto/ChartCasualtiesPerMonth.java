package com.exercise.traffic_accidents.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ChartCasualtiesPerMonth {
    // 조회기간동안 일별 사상자 수

    private String occuMt;
    private Double death;
    private Double swpsn; // 중상자
    private Double injpsn; // 경상자
}
