package com.exercise.traffic_accidents.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TrafficAccidentInfo {

    // 페이징
    private Boolean use;
    private Integer page;
    private Integer size;
    private Integer offset;
    // 시간대 검색 여부
    private Boolean isTimeSlot;
    // 정렬
    private String orderBy;
    // 파라미터
    private String startDate;
    private String endDate;
    private String startTime;
    private String endTime;
    private List<String> injuryTypes;    // 사고형태
    private List<String> accidentTypes;  // 사고구분
    private List<String> category;      // 사고종류

    private Integer gid;        // id
    private Integer objtId;     // 일련번호
    private String occuYear;    // 발생년도(YYYY)
    private String occuMt;      // 발생월(MM)
    private String occuDe;      // 발생일(DD)
    private String occuTm;      // 발생시간(HH)
    private String occuDay;     // 발생요일
    private String occuDate;    // 발생년월일(YYYYMMDD)
    private String lclas;       // 사고형태
    private String sclas;       // 사고구분
    private Integer death;      // 사망자수
    private Integer swpsn;      // 중상자수
    private Integer sinjpsn;    // 경상자수
    private Integer injpsn;     // 부상신고자수
    private String drnkg;       // 음주운전사고
    private String kid;         // 어린이사고
    private String odsn;        // 노인사고
    private String wlkg;        // 보행자사고
    private String violtCn;     // 법규위반내용
    private String ctprvnCd;    // 시도코드
    private String sggCd;       // 시군구코드
    private String emdCd;       // 읍면동코드
    private double x;          // x좌표
    private double y;          // y좌표
    private String geom;    // point

    private String address;     // 주소
}
