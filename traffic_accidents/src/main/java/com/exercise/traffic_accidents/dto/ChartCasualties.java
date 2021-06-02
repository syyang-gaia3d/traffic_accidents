package com.exercise.traffic_accidents.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ChartCasualties {
    // 조회기간동안 사상자 수

    private Double death;
    private Double swpsn;
    private Double injpsn;
}
