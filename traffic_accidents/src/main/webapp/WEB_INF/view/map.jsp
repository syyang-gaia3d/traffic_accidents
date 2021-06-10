<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8" trimDirectiveWhitespaces="true"%>
<%@ include file="script.jspf" %>


<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta content="IE=edge" http-equiv="X-UA-Compatible">
<title>교통사고현황</title>
<%-- <link rel="stylesheet" href="../css/map.css"> --%>
</head>

<body>
<div id="wrap">
	<div class="spinner-modal">
		<dialog></dialog>
	</div>

	<div id="mapWrap">
		<div class="map" id="map"></div>
		<div id="mouse-position" style="position: absolute; bottom: 50px; right: 40px; font-size: 17px; font-weight: bold; text-shadow: 0 0 0.1em #fff, 0 0 0.1em #fff, 0 0 0.1em #fff;"></div>
		<div id="drawToolTip"></div>
		<!-- //MAP  -->

		<!-- LAYERS -->
        <ul class="layersHead">
			<li class="on" id="layerBtn">검색</li>
			<li id="layers">레이어</li>
			<li id="cluster">클러스터</li>
		</ul>
		<div class="layersContain on" id="searchLayer">
			<div class="layers" style="">
				<form id="searchForm">
					<div class="boardForm">
						<table>
							<colgroup>
								<col width="20">
								<col width="280">
							</colgroup>
							<tbody>
								<tr>
									<th>발생일</th>
									<td>
										<input type="text" name="startDate" size="14" maxlength="8" class="hhi date calendar" autocomplete="off"> ~
										<input type="text" name="endDate" size="14" maxlength="8" class="hhi date calendar" autocomplete="off">
									</td>
								</tr>
								<tr>
									<th>발생시간</th>
									<td>
										<input type="text" name="startTime" size="10" maxlength="2" class="hhi" disabled> ~
										<input type="text" name="endTime" size="10" maxlength="2" class="hhi" disabled>
										<br><input type="checkbox" name="isTimeSlot" value="true"> 시간대 검색
									</td>
								</tr>
								<tr>
									<th>사고형태</th>
									<td>
										<input type="checkbox" name="injuryTypes" value="경상사고" class="hhi"> 경상
										<input type="checkbox" name="injuryTypes" value="중상사고" class="hhi"> 중상
										<input type="checkbox" name="injuryTypes" value="사망사고" class="hhi"> 사망
										<input type="checkbox" name="injuryTypes" value="부상신고사고" class="hhi"> 부상신고
									</td>
								</tr>
								<tr>
									<th>사고구분</th>
									<td>
										<input type="checkbox" name="accidentTypes" value="차대차" class="hhi"> 차대차
										<input type="checkbox" name="accidentTypes" value="차대사람" class="hhi"> 차대사람
										<input type="checkbox" name="accidentTypes" value="차량단독" class="hhi"> 차량단독<br>
										<input type="checkbox" name="accidentTypes" value="건널목" class="hhi"> 건널목
										<input type="checkbox" name="accidentTypes" value="철길건널목" class="hhi"> 철길건널목
									</td>
								</tr>
								<tr>
									<th>사고종류</th>
									<td>
										<input type="checkbox" name="category" value="drnkg" class="hhi"> 음주운전
										<input type="checkbox" name="category" value="kid" class="hhi"> 어린이
										<input type="checkbox" name="category" value="odsn" class="hhi"> 노인
										<input type="checkbox" name="category" value="wlkg" class="hhi"> 보행자
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</form>
				<div class="btnsFlex">
					<button type="button" class="hhiA" title="graph" id="graphBtn">그래프</button>
					<button type="submit" class="hhiA" title="search" id="searchBtn">검색</button>
					<%-- <button type="button" class="close" title="닫기">x</button> --%>
				</div>
			</div>

			<div class="layers boardList" style="height: 400px;">
				<label style="display:block; text-align:right;"><span id="totalCount">0</span>건</label>
				<table id="accidentList">
					<thead>
						<th class="sort-list">사고일시</th>
						<th>사고형태</th>
						<th>사상자수(사망/중상/경상)</th>
					</thead>
					<tbody>
						<tr id="noResults">
							<td colspan="3">검색 결과가 없습니다.</td>
						</tr>
					</tbody>
				</table>
				<div class="page-count">
					<div class="pagination"></div>
					<select name="perPage" class="page-size">
						<option value="10">10 건</option>
						<option value="20">20 건</option>
						<option value="30">30 건</option>
					</select>
				</div>
			</div>
		</div>

		<div class="layersContain" style="left:60px" id="onOffLayer">
			<div class="layers">
				<ul>
					<label>레이어 ON/OFF</label>
					<li><input type="checkbox" name="layerId" value="layerInitOsm" checked="checked"> OSM</li>
					<li><input type="checkbox" name="layerId" value="layerInitSido"> 시도</li>
					<li><input type="checkbox" name="layerId" value="layerInitCgg"> 시군구</li>
					<li><input type="checkbox" name="layerId" value="layerInitEmd"> 읍면동</li>
				</ul>
			</div>
		</div>

		<!-- //LAYERSWRAP  -->

		<!-- SETUP -->
		<div class="setupNav">
			사고구분 :
			<input type="checkbox"> 건널목
			<input type="checkbox"> 차대차
			<input type="checkbox"> 차대사람
			<input type="checkbox"> 차량단독
			<input type="checkbox"> 철길건널목
			<br>
			사고종류 :
			<input type="checkbox"> 음주운전
			<input type="checkbox"> 어린이
			<input type="checkbox"> 노인
			<input type="checkbox"> 보행자
		</div>

		<!-- 그래프 -->
		<div class="layerWrap" style="top: 50px; left: 400px; display:none;" id="graphLayerWrap">
			<div class="layerHead">
				<h4>그래프</h4>
				<button type="button" class="layerClose" title="닫기">닫기</button>
			</div>
			<div class="layerContents">
				<div class="spinner-modal">
					<dialog></dialog>
				</div>
				<ul class="sectionHeader">
					<input type="text" name="startDate" size="14" maxlength="8" class="hhi date calendar" autocomplete="off"> ~
					<input type="text" name="endDate" size="14" maxlength="8" class="hhi date calendar" autocomplete="off">
					<button class="sectionMenu" data-graph="bar" id="casualties">일별 사상자</button>
					<button class="sectionMenu" data-graph="pie" id="accident">사고구분</button>
					<button class="sectionMenu" data-graph="pie" id="casualty">사상자수</button>
					<div>
						<canvas id="accidentChart" width="800px" height="400px"></canvas>
					</div>
				</ul>
			</div>
		</div>
		<!-- // 그래프 -->

		<!-- 사고 상세 -->
		<div class="layerWrap" style="top: 50px; left: 82%; display:none;" id="accidentDetailWrap">
			<div class="layerHead">
				<h4>사고 상세</h4>
				<button type="button" class="layerClose" title="닫기">닫기</button>
			</div>
			<div class="layerContents boardList">
				<div class="boardForm"></div>
			</div>
		</div>
		<!-- // 사고 상세 -->

		<!-- // 지도구성 -->
		<div class="ctrlWrap">
			<div>
				<button type="button" class="zoomin" title="확대">확대</button>
				<button type="button" class="zoomout" title="축소">축소</button>
				<button type="button" class="distance" title="거리">거리</button>
				<button type="button" class="oinfo" title="상세정보">상세정보</button>
			</div>
		</div>
		<!-- //CTRLMAP  -->


		<!-- <ul class="sectionHead">
			<li class="sectionMenu on">공사</li>
			<li class="sectionMenu">설비</li>
		</ul> -->

		</div>

	</div>
	<!-- //MAPWRAP  -->
</div>
<!-- // WRAP -->
<table class="hide-custom" id="accidentInfoItem">
	<tr>
		<th>발생일시</th>
		<td class="date-time"></td>
	</tr>
	<tr>
		<th>사고형태</th>
		<td class="injury-type"></td>
	</tr>
	<tr>
		<th>사고구분</th>
		<td class="accident-type"></td>
	</tr>
	<tr>
		<th>사망자수</th>
		<td class="death"></td>
	</tr>
	<tr>
		<th>중상자수</th>
		<td class="slander"></td>
	</tr>
	<tr>
		<th>경상자수</th>
		<td class="slightly-injured"></td>
	</tr>
	<tr>
		<th>위반내용</th>
		<td class="violation"></td>
	</tr>
	<tr>
		<th>발생위치</th>
		<td class="address"></td>
	</tr>
	<tr>
		<th>사고종류</th>
		<td class="category">
			<input type="checkbox" name="drnkg" disabled> 음주운전사고
			<input type="checkbox" name="kid" disabled> 어린이사고<br>
			<input type="checkbox" name="odsn" disabled> 노인사고
			<input type="checkbox" name="wlkg" disabled> 보행자사고
		</td>
	</tr>
</table>

<script type="text/javascript">
	var policy = JSON.parse('${policyJson}');

	$(document).ready(function() {
		initJqueryCalendar();
	});
</script>
<script src="<c:url value='/js/common.js?v=${JS_CSS_VERSION}' />"></script>
<script src="<c:url value='/js/chart.js?v=${JS_CSS_VERSION}' />"></script>
<script type="module" src="<c:url value='/js/traffic_accident.js?v=${JS_CSS_VERSION}' />"></script>
<%-- <script type="module" src="<c:url value='/js/main_map.js?v=${JS_CSS_VERSION}' />"></script> --%>
<%-- <script src="<c:url value='/js/traffic_accident.js?v=${JS_CSS_VERSION}' />"></script> --%>
</body>
</html>
