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
    Boolean layerInitOsmVisible;
    String layerInitSido;
    Boolean layerInitSidoVisible;
    String layerInitCgg;
    Boolean layerInitCggVisible;
    String layerInitEmd;
    Boolean layerInitEmdVisible;
    String layerInitMapCenter;
    Date insertDate;
}
