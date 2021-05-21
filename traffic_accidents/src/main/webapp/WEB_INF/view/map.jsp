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
									<input type="text" name="" size="10" class="hhi calendar"> ~
									<input type="text" name="" size="10" class="hhi calendar">
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
									<input type="checkbox" name="" size="10" class="hhi"> 경상
									<input type="checkbox" name="" size="10" class="hhi"> 중상
									<input type="checkbox" name="" size="10" class="hhi"> 사망
									<input type="checkbox" name="" size="10" class="hhi"> 부상
								</td>
							</tr>
							<tr>
								<th>사고구분</th>
								<td>
									<input type="checkbox" name="" size="10" class="hhi"> 차대차
									<input type="checkbox" name="" size="10" class="hhi"> 차대사람
									<input type="checkbox" name="" size="10" class="hhi"> 차대기타
								</td>
							</tr>
							<tr>
								<th>사고종류</th>
								<td>
									<input type="checkbox" name="" size="10" class="hhi"> 음주운전
									<input type="checkbox" name="" size="10" class="hhi"> 어린이보호
									<input type="checkbox" name="" size="10" class="hhi"> 노인
									<input type="checkbox" name="" size="10" class="hhi"> 기타
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
		<div class="layersContain on" style="left:60px">
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

		<!-- 레이어 표출 -->
		<div class="layerWrap layerSetup" style="top: 36px; left: 300px; display:none;">
			<div class="layerHead">
				<h4>표출 속성 변경</h4>
				<button type="button" class="layerClose" title="닫기">닫기</button>
			</div>
			<div class="layerContents">
				<div class="sectionGroup">
					<div>
						<label class="mr20"><input type="radio"> 모든 스케일에서 레이어 보기</label>
						<label><input type="radio"> 표출스케일 지정</label>
						<div class="scale">
							<div>
								<label>Min.Scale</label>
								<input type="text" size="10" class="hhi">
							</div>
							<div>
								<label>Max.Scale</label>
								<input type="text" size="10" class="hhi">
							</div>
						</div>
					</div>
				</div>
				<!-- // 스케일 -->

				<div class="sectionGroup">
					<h5>선</h5>
					<div>
						<label>색상</label>
						<input type="color" class="color">
					</div>
					<div>
						<label>선종류</label>
						<select name="" id="" class="noBorder">
							<option value="">----</option>
						</select>
					</div>
					<div>
						<label>굵기</label>
						<input type="number" class="hhiNo">
					</div>
				</div>
				<!-- // 선속성 -->

				<div class="sectionGroup">
					<h5>채우기</h5>
					<div>
						<label>색상</label>
						<input type="color" class="color">
					</div>
					<div>
						<label>채우기 종류</label>
						<select name="" id="" class="noBorder">
							<option value="">HATCH</option>
						</select>
					</div>
					<div>
						<label>투명도</label>
						<input type="range" size="20" class="">
					</div>
				</div>
				<!-- // 채우기 -->

				<div class="sectionGroup">
					<h5>폰트</h5>
					<div>
						<label>색상</label>
						<input type="color" class="color">
					</div>
					<div>
						<label>폰트종류</label>
						<select name="" id="" class="hhi">
							<option value="">HATCH</option>
						</select>
					</div>
					<div>
						<label>폰트크기</label>
						<input type="number" class="hhiNo">
					</div>
					<div>
						<label  class="mr20"><input type="checkbox"> 굵게</label>
						<label><input type="checkbox"> 기울임</label>
					</div>
				</div>
				<!-- // 폰트 -->

				<div class="sectionGroup">
					<h5>라벨</h5>
					<div>
						<label class="mr20"><input type="radio"> 표시</label>
						<label class="mr20"><input type="radio"> 미표시</label>
					</div>
					<div>
						<label>라벨필드</label>
						<select name="" id="">
							<option value="">NAME</option>
						</select>
					</div>
				</div>
				<!-- // 폰트 -->

				<div class="btnsFlex">
					<button type="button" class="hhiA" title="저장">저장</button>
					<button type="button" class="close" title="닫기">x</button>
				</div>
			</div>
		</div>
		<!-- // 레이어 표출 -->
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

		<!-- 노드편집 -->
		<div class="layerWrap setup" style="display:none;">
			<div class="layerHead">
				<h4>노드편집</h4>
				<button type="button" class="layerClose" title="닫기">닫기</button>
			</div>
			<div class="layerContents">
				<div>
					<button type="button" title="저장" class="icoSave">저장</button>
					<button type="button" title="삭제" class="icoDel">삭제</button>
				</div>
				<div>
				    <input type="text" size="5">
				    <input type="text" size="5">
				</div>
				<ul class="ulList">
					<li><span>240123.456</span> <span>374663.234</span></li>
					<li class="on"><span>240123.456</span> <span>374663.234</span></li>
					<li><span>240123.456</span> <span>374663.234</span></li>
					<li><span>240123.456</span> <span>374663.234</span></li>
					<li><span>240123.456</span> <span>374663.234</span></li>
					<li><span>240123.456</span> <span>374663.234</span></li>
					<li><span>240123.456</span> <span>374663.234</span></li>
				</ul>
			</div>
		</div>
		<!-- // 노드편집 -->

		<!-- 그래프 -->
		<div class="layerWrap setup" style="top: 36px; left: 200px; display:none;" id="graphLayerWrap">
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


		<!-- 지도설정하기 -->
		<div class="layerWrap setup" style="display:none;">
			<div class="layerHead">
				<h4>지도설정하기</h4>
				<button type="button" class="layerClose" title="닫기">닫기</button>
			</div>
			<div class="layerContents">
				<div class="">
					<button type="button" title="추가" class="face">추가</button>
					<button type="button" title="삭제" class="icoDel">삭제</button>
				</div>
				<div class="boardList">
					<table>
						<thead>
							<th>기본</th>
							<th>지도이름</th>
							<th>버튼</th>
						</thead>
						<tbody>
							<tr>
								<td><input type="radio"></td>
								<td>제1사업장 지도</td>
								<td>
                                    <button type="button" title="기본지도" class="icoStar">기본지도</button>
                                    <button type="button" title="기본지도로 저장" class="icoStarline">기본지도로 저장</button>
								    <button title="적용" class="icoApply">적용</button>
								</td>
							</tr>
							<tr>
								<td><input type="radio"></td>
								<td>my map 2020</td>
								<td>
								    <button class="icoApply">적용</button>
								</td>
							</tr>
							<tr>
								<td><input type="radio"></td>
								<td>제2사업장 지도</td>
								<td>
								    <button class="icoApply">적용</button>
								</td>
							</tr>\
							\
							<tr>
								<td><input type="radio"></td>
								<td>제3사업장 지도</td>
								<td>
								    <button class="icoApply">적용</button>
								</td>
							</tr>
							<tr>
								<td><input type="radio"></td>
								<td>제4사업장 지도</td>
								<td>
								    <button class="icoApply">적용</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="btnsFlex">
					<button type="button" class="hhiA" title="저장">저장</button>
					<button type="button" class="close" title="닫기">x</button>
				</div>
			</div>
		</div>
		<!-- // 지도설정하기 -->

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
		<!-- // 설비 -->
	</div>
	<!-- //MAPWRAP  -->
</div>
<!-- // WRAP -->
<script src="<c:url value='/js/traffic_accident.js?v=${JS_CSS_VERSION}' />"></script>
<script type="module" src="<c:url value='/js/main_map.js?v=${JS_CSS_VERSION}' />"></script>
</body>
</html>
