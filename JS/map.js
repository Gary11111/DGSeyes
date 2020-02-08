minemap.domainUrl = '//minedata.cn';
minemap.spriteUrl = '//minedata.cn/minemapapi/v2.0.0/sprite/sprite';
minemap.serviceUrl = '//minedata.cn/service';
// 设置方案的accessToken和solution
minemap.accessToken = "98d59302bde34eb3ba08f31a70b7f524";
minemap.solution = 13534;
var map = new minemap.Map({
	container: 'map', // 容器id
	style: "//minedata.cn/service/solu/style/id/13534", // 地图样式
	center: [116.46, 39.92], // 中心点
	zoom: 10, // 地图缩放级别
	pitch: 60, // 地图倾斜角度
	maxZoom: 17,
	minZoom: 3
});
map.addControl(new minemap.Navigation(),"bottom-right");
map.addControl(new minemap.Scale(),"top-right");
