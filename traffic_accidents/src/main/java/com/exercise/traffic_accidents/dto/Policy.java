package com.exercise.traffic_accidents.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Policy {
    Integer policyId;
    String geoserverEnable;
    String geoserverWmsVersion;
    String geoserverDataUrl;
    String geoserverDataWorkspace;
    String geoserverDataStore;
    String geoserverUser;
    String geoserverPassword;
    String layerSourceCoordinate;
    String layerTargetCoordinate;
    String layerInitOsm;
    String layerInitSido;
    String layerInitCgg;
    String layerInitEmd;
    String layerInitMapCenter;
    Date insertDate;
}
