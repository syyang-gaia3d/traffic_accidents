package com.exercise.traffic_accidents.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TrafficAccidentInfo {

    private Integer gid;
    private Integer objtId;
    private String occuYear;
    private String occuMt;
    private String occuDe;
    private String occuTm;
    private String occuDay;
    private String occuDate;
    private String lclas;
    private String sclas;
    private Integer death;
    private Integer swpsh;
    private Integer sinjpsn;
    private Integer injpsn;
    private String drnkg;
    private String kid;
    private String odsn;
    private String wlkg;
    private String violtCn;
    private String ctprvnCd;
    private String sggCd;
    private String emdCd;
    private Integer x;
    private Integer y;
    private String geometry;
}
