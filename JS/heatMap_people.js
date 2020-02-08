map.repaint = true; // 启动动画
//改变此处的参数
var json_start_people = 16; //json 中数据开始的日期
var start_day_people = 16; //热力图展示的开始的日期
var end_day_people = 30; //结束的天数
var day_step_people = 5; //天数间隔
var start_hr_people = 0; //开始的小时
var end_hr_people = 23; //结束的小时
var hr_step_people = 4; //小时间隔

var jsonUrl_people = 'Data/people.json'
var title_text_people = '人群分布热力图'

//设置时间轴的数据
function setTimeLineData(start_day, end_day, day_step, start_hr, end_hr, hr_step) {
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
function setDetailOfOptions(options, allData, json_start, start_day, end_day, day_step, start_hr, end_hr, hr_step) {
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


var firstVisitHMPeople = true;
var isShowingHMPeople = false;
var echartsPeopleLayer;
var optionHMPeople;

function show_heatMap_people() {
	if(isShowingHMDanger || isShowingHMTrans){
		if(isShowingHMDanger){
			show_heatMap_danger();
		} else {
			show_heatMap_transport();
		}
		show_heatMap_people();
		return;
	}
	if (firstVisitHMPeople) {
		alert("正在加载,请稍等");
		firstVisitHMPeople = false;
		minemap.util.getJSON(jsonUrl_people, function(error, jsonData) {
			// option的参数设置API：http://echarts.baidu.com/option.html#title
			optionHMPeople = {
				baseOption: {
					timeline: {
						autoPlay: true,
						show: true,
						data: setTimeLineData(start_day_people, end_day_people, day_step_people, start_hr_people, end_hr_people, hr_step_people),
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
						text: title_text_people,
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
			setDetailOfOptions(optionHMPeople.options, jsonData, json_start_people, start_day_people, end_day_people, day_step_people, start_hr_people, end_hr_people, hr_step_people);
			/**
			 * 最终要的就是下面这两句，首先创建一个echartslayer
			 * 然后再调用echartslayer.chart.setOption 这个charts就是echarts.init 返回的实例
			 * echartslayer 拥有的方法
			 * resize 重置大小
			 * remove 删除
			 * dispose 清空
			 * getChartId 获取div对应id号，方便样式设置
			 */
			echartsPeopleLayer = minemap.Template.create({
				map: map,
				type: 'heatmap'
			});
			echartsPeopleLayer.chart.setOption(optionHMPeople);
			alert("加载完毕");
		});
		isShowingHMPeople = true;
	} else {
		if(isShowingHMPeople){
			echartsPeopleLayer.remove();
			isShowingHMPeople = false;
		} else{
			echartsPeopleLayer = minemap.Template.create({
				map: map,
				type: 'heatmap'
			});
			echartsPeopleLayer.chart.setOption(optionHMPeople);
			isShowingHMPeople = true;
		}
	}
}
