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

	<div id="mapWrap">
		<div class="map" id="map"></div>
		<div id="mouse-position" style="position: absolute; bottom: 50px; right: 40px; font-size: 17px; font-weight: bold; text-shadow: 0 0 0.1em #fff, 0 0 0.1em #fff, 0 0 0.1em #fff;"></div>
		<!-- //MAP  -->

		<!-- LAYERS -->
        <ul class="layersHead">
			<li class="on" id="layersBtn">검색</li>
			<li id="layers">레이어</li>
			<li id="cluster">클러스터</li>
		</ul>
		<div class="layersContain on" id="searchLayer">
			<div class="layers" style="">
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
									<input type="text" name="" size="14" class="hhi date calendar"> ~
									<input type="text" name="" size="14" class="hhi date calendar">
								</td>
							</tr>
							<tr>
								<th>발생시간</th>
								<td>
									<input type="text" name="" size="10" class="hhi"> ~
									<input type="text" name="" size="10" class="hhi">
									<br><input type="radio"> 시간대 검색
								</td>
							</tr>
							<tr>
								<th>사고형태</th>
								<td>
									<input type="checkbox" name="" class="hhi"> 경상
									<input type="checkbox" name="" class="hhi"> 중상
									<input type="checkbox" name="" class="hhi"> 사망
									<input type="checkbox" name="" class="hhi"> 부상
								</td>
							</tr>
							<tr>
								<th>사고구분</th>
								<td>
									<input type="checkbox" name="" class="hhi"> 차대차
									<input type="checkbox" name="" class="hhi"> 차대사람
									<input type="checkbox" name="" class="hhi"> 차대기타
								</td>
							</tr>
							<tr>
								<th>사고종류</th>
								<td>
									<input type="checkbox" name="" class="hhi"> 음주운전
									<input type="checkbox" name="" class="hhi"> 어린이보호
									<input type="checkbox" name="" class="hhi"> 노인
									<input type="checkbox" name="" class="hhi"> 기타
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="btnsFlex">
				<button type="button" class="hhiA" title="graph" id="graphBtn">그래프</button>
				<button type="button" class="hhiA" title="Export Layer">검색</button>
				<%-- <button type="button" class="close" title="닫기">x</button> --%>
				</div>
			</div>

			<div class="layers boardList" style="height: 400px;">
				<table id="accidentList">
					<thead>
						<th>사고일시</th>
						<th>사고형태</th>
						<th>사상자수(사망/중상/경상)</th>
					</thead>
					<tbody>
						<tr>
							<td>16/12/08</td>
							<td>경상사고</td>
							<td>0/5/3</td>
						</tr>
						<tr>
							<td>16/12/08</td>
							<td>경상사고</td>
							<td>0/5/3</td>
						</tr>
						<tr>
							<td>16/12/08</td>
							<td>경상사고</td>
							<td>0/5/3</td>
						</tr>
						<tr>
							<td>16/12/08</td>
							<td>경상사고</td>
							<td>0/5/3</td>
						</tr>
						<tr>
							<td>16/12/08</td>
							<td>경상사고</td>
							<td>0/5/3</td>
						</tr>
						<tr>
							<td>16/12/08</td>
							<td>경상사고</td>
							<td>0/5/3</td>
						</tr>
						<tr>
							<td>16/12/08</td>
							<td>경상사고</td>
							<td>0/5/3</td>
						</tr>
						<tr>
							<td>16/12/08</td>
							<td>경상사고</td>
							<td>0/5/3</td>
						</tr>
					</tbody>
				</table>
				<div class="pagination">
					<a href="#" class="prev"><span class="icon-glyph glyph-prev"></span></a>
					<a href="#" class="current-page">1</a>
					<a href="#" class="">2</a>
					<a href="#" class="next"><span class="icon-glyph glyph-next"></span></a>
				</div>
			</div>
		</div>

		<div class="layersContain" style="left:60px" id="onOffLayer">
			<div class="layers">
				<ul>
					<label>레이어 ON/OFF</label>
					<li><input type="checkbox"> OSM</li>
					<li><input type="checkbox"> 시도</li>
					<li><input type="checkbox"> 시군구</li>
					<li><input type="checkbox"> 읍면동</li>
				</ul>
			</div>
		</div>

		<!-- //LAYERSWRAP  -->

		<!-- SETUP -->
		<div class="setupNav">
			사고구분 :
			<input type="checkbox"> 차대차
			<input type="checkbox"> 차대사람
			<input type="checkbox"> 차대기타
			<br>
			사고종류 :
			<input type="checkbox"> 음주운전
			<input type="checkbox"> 어린이
			<input type="checkbox"> 노인
			<input type="checkbox"> 보행자
		</div>

		<!-- 그래프 -->
		<div class="layerWrap setup" style="top: 36px; left: 500px; display:none;" id="graphLayerWrap">
			<div class="layerHead">
				<h4>그래프</h4>
				<button type="button" class="layerClose" title="닫기">닫기</button>
			</div>
			<div class="layerContents">
				<div>
					그래프
				</div>
			</div>
		</div>
		<!-- // 그래프 -->

		<!-- 사고 상세 -->
		<div class="layerWrap" style="top: 50px; left: 400px; display:none;" id="accidentDetailWrap">
			<div class="layerHead">
				<h4>사고 상세</h4>
				<button type="button" class="layerClose" title="닫기">닫기</button>
			</div>
			<div class="layerContents boardList">
				사고상세
				<div class="boardForm">
					<table>
						<tr>
							<th>발생일시</th>
							<td>
								2016.05.15 03:00
							</td>
						</tr>
						<tr>
							<th>사고형태</th>
							<td>
								경상사고
							</td>
						</tr>
						<tr>
							<th>사고구분</th>
							<td>
								차대차
							</td>
						</tr>
						<tr>
							<th>사망자수</th>
							<td>
								0
							</td>
						</tr>
						<tr>
							<th>중상자수</th>
							<td>
								5
							</td>
						</tr>
						<tr>
							<th>경상자수</th>
							<td>
								3
							</td>
						</tr>
						<tr>
							<th>위반내용</th>
							<td>
								음주
							</td>
						</tr>
						<tr>
							<th>발생위치</th>
							<td>
								대전 유성구 테크노1로
							</td>
						</tr>
						<tr>
							<th>사고종류</th>
							<td>
								음주운전
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
		<!-- // 사고 상세 -->

		<!-- // 지도구성 -->
		<div class="ctrlWrap">
			<div>
				<button type="button" class="zoomin" title="확대">확대</button>
				<button type="button" class="zoomout" title="축소">축소</button>
				<button type="button" class="distance" title="거리">거리</button>
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

<script type="text/javascript">
	var policy = {
			layerInitMapCenter : '240175.364,324954.256',
			layerInitMapExtent : '-80000,0,300000,64000'
	};

	$(document).ready(function() {
		initJqueryCalendar();
		//
		// var policy = {};
		// var InitMap = new InitMap(policy);
		// InitMap.create('map');
	});
</script>
<script src="<c:url value='/js/common.js?v=${JS_CSS_VERSION}' />"></script>
<script type="module" src="<c:url value='/js/traffic_accident.js?v=${JS_CSS_VERSION}' />"></script>
<%-- <script type="module" src="<c:url value='/js/main_map.js?v=${JS_CSS_VERSION}' />"></script> --%>
</body>
</html>
