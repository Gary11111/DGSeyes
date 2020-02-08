var json_start_trans = 1; //json 中数据开始的日期
var start_day_trans = 1; //热力图展示的开始的日期
var end_day_trans = 31; //结束的天数
var day_step_trans = 6; //天数间隔
var start_hr_trans = 0; //开始的小时
var end_hr_trans = 23; //结束的小时
var hr_step_trans = 4; //小时间隔

var jsonUrl_trans = 'Data/transport.json'
var title_text_trans = '车辆轨迹热力图'

//设置时间轴的数据
function setTimeLineData_trans(start_day, end_day, day_step, start_hr, end_hr, hr_step) {
	var time = []
	for (var aday = start_day; aday <= end_day; aday = aday + day_step) {
		for (var ahr = start_hr; ahr <= end_hr; ahr = ahr + hr_step) {
			var str = aday.toString() + "日-" + ahr.toString() + ":00";
			time.push(str);
		}
	}
	return time;
}

//动态加载热力图的数据
//options 为 option.options  allData为所有的Jason数据数组 count为时间轴节点数
function setDetailOfOptions_trans(options, allData, json_start, start_day, end_day, day_step, start_hr, end_hr, hr_step) {
	for (var aday = start_day; aday <= end_day; aday = aday + day_step) {
		for (var ahr = start_hr; ahr <= end_hr; ahr = ahr + hr_step) {
			var i = (aday - json_start) * 24 + ahr;
			var detail = {
				series: [{
					data: allData[i],
				}],
			};
			options.push(detail);
		}
	}
}

var firstVisitHMTrans = true;
var isShowingHMTrans = false;
var echartsTransLayer;
var optionHMTrans;

function show_heatMap_transport() {
	if(isShowingHMDanger || isShowingHMPeople){
		if(isShowingHMDanger){
			show_heatMap_danger();
		} else {
			show_heatMap_people();
		}
		show_heatMap_transport();
		return;
	}
	if (firstVisitHMTrans) {
		alert("正在加载,请稍等");
		firstVisitHMTrans = false;
		minemap.util.getJSON(jsonUrl_trans, function(error, jsonData) {
			// option的参数设置API：http://echarts.baidu.com/option.html#title
			optionHMTrans = {
				baseOption: {
					timeline: {
						autoPlay: true,
						show: true,
						data: setTimeLineData_trans(start_day_trans, end_day_trans, day_step_trans, start_hr_trans, end_hr_trans,
							hr_step_trans),
						realtime: true, //改变时间轴是否实时显示
						//时间轴左上角  右下角的位置
						x: '9%',
						y: '90%',
						width: '85%',
						//时间轴轴线样式
						lineStyle: {
							color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 1,
								y2: 0,
								colorStops: [{
									offset: 0,
									color: '#aaaaff' // 0% 处的颜色
								}, {
									offset: 1,
									color: '#F07AAD' // 100% 处的颜色
								}],
								globalCoord: false // 缺省为 false
							}
						},
						//时间轴标签文本
						label: {
							show: true,
							interval: 'auto',
							rotate: 0,
							formatter: null,
							textStyle: {
								color: 'MintCream'
							}
						},
						//时间轴控制器样式
						controlStyle: {
							normal: {
								color: '#e4ebff'
							},
							emphasis: {
								color: '#ff9389'
							}
						},
						axisType: 'category',
						currentIndex: 0,
						orient: 'horizontal'
					},
					GLMap: {
						roam: true
					},
					coordinateSystem: 'GLMap',
					title: {
						text: title_text_trans,
						subtext: '',
						left: 'center',
						textStyle: {
							color: '#fff'
						}
					},
					tooltip: {
						trigger: 'item'
					},
					visualMap: {
						show: true,
						top: 'top',
						min: 0,
						max: 1, //??10
						seriesIndex: 0,
						calculable: true,
						inRange: {
							color: ['aqua', 'lime', 'LawnGreen', 'yellow', 'yellow', 'orange', 'red', 'red']
						}
					},
					series: [{
						type: 'heatmap',
						coordinateSystem: 'GLMap',
						//data:points,
						pointSize: 6,
						blurSize: 5
					}]
				},

				options: []
			}
			setDetailOfOptions_trans(optionHMTrans.options, jsonData, json_start_trans,
				start_day_trans, end_day_trans, day_step_trans, start_hr_trans, end_hr_trans, hr_step_trans);
			/**
			 * 最终要的就是下面这两句，首先创建一个echartslayer
			 * 然后再调用echartslayer.chart.setOption 这个charts就是echarts.init 返回的实例
			 * echartslayer 拥有的方法
			 * resize 重置大小
			 * remove 删除
			 * dispose 清空
			 * getChartId 获取div对应id号，方便样式设置
			 */
			echartsTransLayer = minemap.Template.create({
				map: map,
				type: 'heatmap'
			});
			echartsTransLayer.chart.setOption(optionHMTrans);
			alert("加载完毕");
		});
		isShowingHMTrans = true;
	} else {
		if (isShowingHMTrans) {
			echartsTransLayer.remove();
			isShowingHMTrans = false;
		} else {
			echartsTransLayer = minemap.Template.create({
				map: map,
				type: 'heatmap'
			});
			echartsTransLayer.chart.setOption(optionHMTrans);
			isShowingHMTrans = true;
		}
	}
}
