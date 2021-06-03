drop table if exists policy cascade;

-- 운영정책
create table policy(
	policy_id						int,

	geoserver_enable				varchar(1)					default 'Y',
	geoserver_wms_version			varchar(5)         			default '1.1.1',
	geoserver_data_url				varchar(256),
	geoserver_data_workspace		varchar(60),
	geoserver_data_store			varchar(60),
	geoserver_user					varchar(256),
	geoserver_password				varchar(256),

	layer_source_coordinate			varchar(100)				default 'EPSG:5187',
	layer_target_coordinate			varchar(100)				default 'EPSG:5187',
	layer_init_osm					varchar(64),
	layer_init_sido					varchar(64),
	layer_init_cgg					varchar(64),
	layer_init_emd					varchar(64),

	layer_init_map_center			varchar(128)				default '14261127.97, 4360280.11',

	insert_date						timestamp with time zone	default now(),
	constraint policy_pk primary key (policy_id)
);

comment on table policy is '운영정책';
comment on column policy.policy_id is '고유번호';

comment on column policy.geoserver_enable is 'geoserver 사용유무';
comment on column policy.geoserver_wms_version is 'geoserver wms 버전';
comment on column policy.geoserver_data_url is 'geoserver 데이터 URL';
comment on column policy.geoserver_data_workspace is 'geoserver 데이터 작업공간';
comment on column policy.geoserver_data_store is 'geoserver 데이터 저장소';
comment on column policy.geoserver_user is 'geoserver 사용자 계정';
comment on column policy.geoserver_password is 'geoserver 비밀번호';

comment on column policy.layer_source_coordinate is 'Layer 원본 좌표계';
comment on column policy.layer_target_coordinate is 'Layer 좌표계 정의';
comment on column policy.layer_init_osm is '기본 osm 레이어';
comment on column policy.layer_init_sido is '기본 시도 레이어';
comment on column policy.layer_init_cgg is '기본 시군구 레이어';
comment on column policy.layer_init_emd is '기본 읍면동 레이어';
comment on column policy.layer_init_map_center is 'map center';

comment on column policy.insert_date is '등록일';