package com.exercise.traffic_accidents.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.exercise.traffic_accidents.dto.Cgg;
import com.exercise.traffic_accidents.dto.ChartAccidentType;
import com.exercise.traffic_accidents.dto.ChartCasualties;
import com.exercise.traffic_accidents.dto.ChartCasualtiesPerDay;
import com.exercise.traffic_accidents.dto.ChartInjTypePerDay;
import com.exercise.traffic_accidents.dto.Emd;
import com.exercise.traffic_accidents.dto.Policy;
import com.exercise.traffic_accidents.dto.Sido;
import com.exercise.traffic_accidents.dto.TrafficAccidentInfo;
import com.exercise.traffic_accidents.service.AccidentService;
import com.exercise.traffic_accidents.service.DistinctService;
import com.exercise.traffic_accidents.service.PolicyService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/")
public class AccidentController {

    @Autowired
    private AccidentService accidentService;
    @Autowired
    private PolicyService policyService;
    @Autowired
    private DistinctService distinctService;
    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping(value = "accident")
    public String map(Model model) {

        Policy policy = policyService.selectPolicy();
        String policyJson = "";

        try {
            policyJson = objectMapper.writeValueAsString(policy);
        } catch(Exception e) {
            e.printStackTrace();
        }

        model.addAttribute("policyJson", policyJson);

        return "/map";
    }

    @GetMapping(value = "list")
    public ResponseEntity<?> list(TrafficAccidentInfo params) {
        Map<String, Object> result = new HashMap<>();

        List<TrafficAccidentInfo> trafficAccidentList = accidentService.getTrafficAccidentList(params);
        Integer totalCount = accidentService.getTotalCountTrafficAccidents(params);

        result.put("list", trafficAccidentList);
        result.put("totalCount", totalCount);

        return ResponseEntity.ok(result);
    }

    @GetMapping(value = "{objtId}")
    public ResponseEntity<?> detail(@PathVariable(name = "objtId") String objtId) {
        Map<String, Object> result = new HashMap<>();
        Integer objtIdInt = Integer.parseInt(objtId);

        TrafficAccidentInfo info = accidentService.getTrafficAccidentInfo(objtIdInt);

        String address = makeAddressFromDistinct(info.getCtprvnCd(), info.getSggCd(), info.getEmdCd());

        // log.info("@@@@@@@@@@@address ={}", address);

        info.setAddress(address);

        result.put("info", info);

        return ResponseEntity.ok(result);
    }

    @PostMapping(value = "/info/point")
    public ResponseEntity<?> getInfoByPoint(@RequestBody Map<String, Object> data) {
        Map<String, Object> result = new HashMap<>();
        try {
            // log.info("@@@@@@@@@@ point={}", data);
            String point = (String) data.get("point");
            TrafficAccidentInfo info = accidentService.getTrafficAccidentInfoByPoint(point);

            if(info != null) {
                String address = makeAddressFromDistinct(info.getCtprvnCd(), info.getSggCd(), info.getEmdCd());

                // log.info("@@@@@@@@@@@address ={}", address);

                info.setAddress(address);
            }

            result.put("info", info);
            return ResponseEntity.ok(result);
        } catch(Exception e) {
            e.printStackTrace();

            result.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());
			return new ResponseEntity<>(result, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/graph/injuries")
    public ResponseEntity<?> getInjuryPerDayData(TrafficAccidentInfo params) {
        Map<String, Object> result = new HashMap<>();

        List<ChartInjTypePerDay> list = accidentService.getInjuryTypePerDayData(params);

        // log.info("@@@@@@@@@list={}", list);

        result.put("data", list);
        return ResponseEntity.ok(result);
    }

    @GetMapping(value = "/graph/casualties")
    public ResponseEntity<?> getCasualtiesPerDayData(TrafficAccidentInfo params) {
        Map<String, Object> result = new HashMap<>();

        List<ChartCasualtiesPerDay> list = accidentService.getCasualtiesPerDayData(params);

        // log.info("@@@@@@@@@list={}", list);

        result.put("data", list);
        return ResponseEntity.ok(result);
    }

    @GetMapping(value = "/graph/accident")
    public ResponseEntity<?> getAccidentTypeData(TrafficAccidentInfo params) {
        Map<String, Object> result = new HashMap<>();

        List<ChartAccidentType> list = accidentService.getAccidentTypeData(params);

        // log.info("@@@@@@@@@list={}", list);

        result.put("data", list);
        return ResponseEntity.ok(result);
    }

    @GetMapping(value = "/graph/casualty")
    public ResponseEntity<?> getCasualtiesData(TrafficAccidentInfo params) {
        Map<String, Object> result = new HashMap<>();

        List<ChartCasualties> list = accidentService.getCasualtiesData(params);

        // log.info("@@@@@@@@@list={}", list);

        result.put("data", list);
        return ResponseEntity.ok(result);
    }

    private String makeAddressFromDistinct(String sidoCd, String cggCd, String emdCd) {
        String address = "";

        List<Sido> sidoList = distinctService.getSidoData();
        List<Cgg> cggList = distinctService.getCggData();
        List<Emd> emdList = distinctService.getEmdData();

        for(Sido sido : sidoList) {
            if(Integer.parseInt(sidoCd) == Integer.parseInt(sido.getCtprvnCd())) {
                address += sido.getCtpKorNm();
            }
        }

        address += " ";

        for(Cgg cgg : cggList) {
            if(Integer.parseInt(cggCd) == Integer.parseInt(cgg.getSigCd())) {
                address += cgg.getSigKorNm();
            }
        }

        address += " ";

        for(Emd emd : emdList) {
            if(Integer.parseInt(emdCd) == Integer.parseInt(emd.getEmdCd())) {
                address += emd.getEmdKorNm();
            }
        }

        return address;
    }
}
