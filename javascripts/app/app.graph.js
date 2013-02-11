/**
 * @module App
 * @class Animation
 * @static
 */
var App = App || {};

App.Graph = (function (window, document) {

	var self = {

		'init': function () {
			var pablo = self;
			pablo.unitsShown = 15;
			pablo.MAX_VIEW = 100;
			pablo.MIN_VIEW = 15;
			pablo.yAxisMax = 5;
			pablo.yAxisMin = 0;
			pablo.TIER_1 = (pablo.MAX_VIEW - (pablo.MAX_VIEW /6)) * .3;
			pablo.TIER_2 = (pablo.MAX_VIEW - (pablo.MAX_VIEW /6)) * .65;
			pablo.TIER_3 = (pablo.MAX_VIEW - (pablo.MAX_VIEW /6)) * .85;
			pablo.PADDING_BOTTOM = 100;
			 pablo.lastMonth = -123;
			 pablo.redrawInterval = null;
			  pablo.UPDATE_THROTTLE = 200;



			

			pablo.$graph = $('<canvas id="graph"></canvas>');
			$('.stage').append(pablo.$graph);
			// $('.stage').css('width', '100%').css('height', '150px');
			pablo.graph = pablo.$graph[0];
			pablo.context = pablo.graph.getContext('2d');


			$('.stage').append($('<input type="range" id="dateAdjust" min="' + pablo.MIN_VIEW + '" max="' + pablo.MAX_VIEW + '" value="' + pablo.unitsShown + '" step="1"  />'))


			pablo.refreshSize();

			$(window).on('resize', function () {
				// pablo.clear();

				pablo.redraw();
			});
			pablo.modFactor = 1;


			$(document.body).append($('<a href="#" id="btnPrev" style="margin-left:20%;display:block;width:100px;height:40px;border:1px solid black;">Prev</a>'));
			$(document.body).append($('<a href="#" id="btnNext" style="margin-left:20%;display:block;width:100px;height:40px;border:1px solid black;">Next</a>'));




			pablo.series = [];




			$('#dateAdjust').on('change', pablo.adjustSlider);

			$('#btnNext').on('click', function (e) {
				e.preventDefault();
				e.stopPropagation();

				pablo.next();
			});

			$('#btnPrev').on('click', function (e) {
				e.preventDefault();
				e.stopPropagation();

				pablo.prev();
			});

			pablo.transformTicker = 0;

			pablo.$graph.hammer().on("swipe", function (e) {
				e.preventDefault();
				var dir = "";
				if(e.direction == 'right') {
					pablo.prev();
				} else if(e.direction == 'left') {
					pablo.next();
				}
			}).on('transform', function (e) {
				e.preventDefault();
				e.stopPropagation();

				var $dateSlider = $('#dateAdjust');
				var value = parseInt($dateSlider.val(), 10);
				if(e.scale < 1) {
					pablo.transformTicker++;
					// if(pablo.transformTicker % 3 == 0){
					$('#dateAdjust').val(value + 1).trigger('change');
					// }
				} else if(e.scale >= 1) {
					pablo.transformTicker++;
					// if(pablo.transformTicker % 3 == 0){
					// alert(value);
					$('#dateAdjust').val(value - 1).trigger('change');
					// }
				}
			});

			

			pablo.updateData();

		},

		'refreshSize': function(){
			var pablo = self;


			pablo.graph.width = parseInt(pablo.$graph.parent().width(), 10);
			pablo.graph.height = parseInt(pablo.$graph.parent().height(), 10) * 0.7 + pablo.PADDING_BOTTOM;

			if(window.devicePixelRatio) {
				var hidefCanvasWidth = pablo.graph.width;
				var hidefCanvasHeight = pablo.graph.height;
				var hidefCanvasCssWidth = hidefCanvasWidth;
				var hidefCanvasCssHeight = hidefCanvasHeight;

				pablo.graph.width = hidefCanvasWidth * window.devicePixelRatio;
				pablo.graph.height = hidefCanvasHeight * window.devicePixelRatio;
				pablo.$graph.css('width', hidefCanvasCssWidth);
				pablo.$graph.css('height', hidefCanvasCssHeight);
				// pablo.context.scale(window.devicePixelRatio, window.devicePixelRatio);
			}


		},
		'drawGrid': function (cntxt) {
			var pablo = self;

			var $graph = pablo.$graph;
			var graph = pablo.graph;
			var context = cntxt || pablo.context;


			var graphWidth = graph.width;
			pablo.graphWSegments = graphWidth / pablo.unitsShown;
			graphWSegments = pablo.graphWSegments;

			var graphHeight = graph.height;
			pablo.graphHSegments = graphHeight / 10;
			graphHSegments = pablo.graphHSegments;

			var curX = 0;
			for(var i = 0; i <= pablo.unitsShown; i++) {

				context.strokeStyle = '#bebebe';

				pablo.modFactor = 1;
				MAX_VIEW = pablo.MAX_VIEW;



				if(pablo.unitsShown >= pablo.TIER_1 && pablo.unitsShown < pablo.TIER_2) {
					pablo.modFactor = 2;
				} else if(pablo.unitsShown >= pablo.TIER_2 && pablo.unitsShown < pablo.TIER_3) {
					pablo.modFactor = 4;
				} else if(pablo.unitsShown >= pablo.TIER_3) {
					pablo.modFactor = 8;
				}

				context.lineWidth = 0.5;
				context.beginPath();
				curX = i * (graphWSegments);
				context.moveTo(curX, 0);
				context.lineTo(curX, graphHeight);
				context.closePath();
				if(i % pablo.modFactor == 0) {
					context.strokeStyle = 'rgba(190,190,190,0.3)';
					context.stroke();
				} else {
					context.strokeStyle = 'rgba(190,190,190,0.1)';
					context.stroke();
				}
				context.closePath();
			}

			var curY = 0;
			for(var j = 0; j <= 10; j++) {
				var grad = context.createLinearGradient(0, 0, 0, graphHeight);
				grad.addColorStop(0, "rgba(0,0,0,0)");
				grad.addColorStop(0.05, "rgba(0,0,0,.1)");
				grad.addColorStop(0.5, "rgba(0,0,0,1)");
				grad.addColorStop(0.95, "rgba(0,0,0,.1)");
				grad.addColorStop(1, "rgba(0,0,0,0)");

				context.strokeStyle = grad;

				context.lineWidth = 0.5;
				context.beginPath();
				curY = j * (graphHSegments);
				context.moveTo(0, curY);
				context.lineTo(graphWidth, curY);
				context.closePath();
				context.strokeStyle = 'rgba(0,0,0, 0.1)';
				context.stroke();
			}

			return pablo;

		},

		'clear': function () {
			var pablo = self;

			pablo.context.clearRect(0, 0, pablo.graph.width, pablo.graph.height);

			return pablo.context;
		},

		'offscreenCanvas': function () {
			var pablo = self;

			var $theCanvas = $('#graph');
			var $dummy = $('<canvas></canvas>');
			var dummyCanvas = $dummy[0];
			dummyCanvas.height = $theCanvas[0].height;
			dummyCanvas.width = $theCanvas[0].width;
			return dummyCanvas;
		},

		'redraw': function (animt, frwrd) {
			var pablo = self;

			var animate = animt || false;
			var forward = frwrd || false;


			pablo.getMinYwithinRange(pablo.series[0]);
			pablo.getMaxYwithinRange(pablo.series[0]);

			var oldCanvas = pablo.graph.toDataURL("image/png");
			var img = new Image();
			img.src = oldCanvas;

			if(animate) {
				var hiddenCanvas = pablo.offscreenCanvas();
				var hiddenContext = hiddenCanvas.getContext('2d');
				pablo.drawGrid(hiddenContext).drawAllLines(hiddenContext);

				var newCanvas = hiddenCanvas.toDataURL("image/png");
				var newImg = new Image();
				newImg.src = newCanvas;
			}

			img.onload = function () {
				pablo.context.drawImage(img, 0, 0);
				pablo.refreshSize();
				// pablo.graph.width = pablo.$graph.parent().width();
				if(animate) {
					var x = 0;
					var inc = 0.01;
					if(!forward) {
						inc = -0.01;
					}



					window.thisInterval = setInterval(function () {
						pablo.clear().drawImage(img, x, 0);
						if(forward) {
							pablo.context.drawImage(newImg, x + pablo.graph.width, 0);
						} else {
							pablo.context.drawImage(newImg, x - pablo.graph.width, 0);
						}

						x -= inc;
						inc += inc;
						if(inc >= 15) {
							inc = 15;
						} else if(inc <= -15) {
							inc = -15;
							// inc *= -0.9;
						}
						if(forward && (x <= -1 * pablo.graph.width)) {
							pablo.context.drawImage(newImg, -1 * pablo.graph.width, 0);
							clearInterval(window.thisInterval);
							pablo.redraw();
						} else if(!forward && (x >= pablo.graph.width)) {
							pablo.context.drawImage(newImg, pablo.graph.width, 0);
							clearInterval(window.thisInterval);
							pablo.redraw();
						}
					}, 10);
				} else {
					pablo.drawGrid().drawAllLines();
				}
			}
		},

		'drawSeeker': function () {
			var pablo = self;


		},

		'drawLine': function (data, cntxt) {
			var pablo = self;
			var lastX = null;
			var lastY = null;

			var context = cntxt || pablo.context;

			var dateCounter = 0;

			for(var i = pablo.startDate, j = 0; i >= pablo.startDate - pablo.unitsShown; i--, j++) {
				if(i < 0) {
					pablo.unitsShown = j;
					pablo.redraw();
					break;
				}
				var value = data[i]['value'] / 100;

				var valDif = value - pablo.yAxisMin;
				var relDif = valDif / (pablo.yAxisMax - pablo.yAxisMin);

				var relative = value / pablo.yAxisMax;
				var yPoint = ((relDif) * (pablo.graph.height - pablo.PADDING_BOTTOM)); // + ((value / (pablo.yAxisMax-pablo.yAxisMin))*pablo.graphHSegments));//( * pablo.graphHSegments) + pablo.yAxisMin;
				var xPoint = j * pablo.graphWSegments;


				context.beginPath();


				context.shadowOffsetX = 0; // Sets the shadow offset x, positive number is right
				context.shadowOffsetY = 1; // Sets the shadow offset y, positive number is down
				context.shadowBlur = 0; // Sets the shadow blur size
				context.shadowColor = 'rgba(0, 0, 0, 0.6)'; // Sets the shadow color
				// if(i == pablo.startDate - pablo.unitsShown - 1){
				// 	
				// 	log('wtf');
				// 	context.lineTo(xPoint, yPoint);
				// }else{
				// 	log('omg');

				context.moveTo(xPoint, yPoint);
				if(pablo.unitsShown < pablo.TIER_2 * 1.3) {
					// nope lol
					context.lineTo(lastX, lastY);
				}
				// }
				context.closePath();
				context.stroke();
				context.strokeStyle = 'rgba(0,0,0,0.3)';

				context.beginPath();
				if(true) {
					var gradient = context.createLinearGradient(0, 0, 14, 14);
					gradient.addColorStop(0, "rgb(255, 0, 0)");
					gradient.addColorStop(0.48, "rgb(255, 0, 0)");
					// gradient.addColorStop(0.51, "rgb(0, 0, 255)");
					gradient.addColorStop(1, "rgb(0, 0, 255)");
					context.fillStyle = gradient;
				}


				var tickerDate = pablo.series[0][i]['timestamp'];
				tickerDate = pablo.newDate(tickerDate);//new Date(tickerDate);
				var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
				// log(pablo.lastMonth, tickerDate.getDate());

				if(pablo.lastMonth = -123){
					pablo.lastMonth = tickerDate.getDate();
				}
				if(lastX == null) {
					context.arc(xPoint, yPoint, 7, 0, 2 * Math.PI, true);
					context.closePath();

					context.beginPath();
					context.rect(0, pablo.graph.height - 50, pablo.graphWSegments * 1.5 * pablo.modFactor, 50);
					context.fillStyle = '#83a725';
					context.fill();
					context.closePath();


					context.fillStyle = '#fff';
					context.font = '13px Asap 900';
					context.textBaseline = 'middle';

					context.fillText(monthNames[tickerDate.getMonth()], (pablo.graphWSegments * 1.5 / 2), pablo.graph.height - 25);
					context.fillText(tickerDate.getDate(), (pablo.graphWSegments * 1.5 / 2), pablo.graph.height - 10);

				} else if(pablo.lastMonth != tickerDate.getDate()){
						pablo.lastMonth = tickerDate.getDate();

						context.arc(xPoint, yPoint, 7, 0, 2 * Math.PI, true);
						context.closePath();

						context.beginPath();
						context.rect(xPoint + ((pablo.graphWSegments * pablo.modFactor) / 2), pablo.graph.height - 50, pablo.graphWSegments * pablo.modFactor, 50);
						context.fillStyle = '#83a725';
						context.fill();
						context.closePath();


						context.fillStyle = '#fff';
						context.font = '13px Asap 900';
						context.textBaseline = 'middle';

						context.fillText(monthNames[tickerDate.getMonth()], j*(pablo.graphWSegments * 1.5 / 2), pablo.graph.height - 25);
						context.fillText(tickerDate.getDate(), j * (pablo.graphWSegments * 1.5 / 2), pablo.graph.height - 10);



				}else{
					if((j - 1) % pablo.modFactor == 0) {

						context.arc(lastX, lastY, 7, 0, 2 * Math.PI, true);
						context.fill();
						context.closePath();
						context.beginPath();
						context.rect(xPoint + ((pablo.graphWSegments * pablo.modFactor) / 2), pablo.graph.height - 50, pablo.graphWSegments * pablo.modFactor, 50);
						if(dateCounter % 2 != 0) {
							context.fillStyle = '#8c8c8c';
						} else {
							context.fillStyle = '#a7a7a7';
						}
						dateCounter += 1;
						context.fill();
						context.closePath();

						if(j > 1) {
							context.fillStyle = '#fff';
							context.font = '13px Asap';
							context.textBaseline = 'middle';
							var tickerDate = pablo.series[0][i]['timestamp'];
							tickerDate = pablo.newDate(tickerDate); //new Date(tickerDate);



							context.fillText(((tickerDate.getHours() > 12) ? tickerDate.getHours() - 12 : tickerDate.getHours()) + ':' + ((tickerDate.getMinutes() < 10) ? '0' : '') + tickerDate.getMinutes(), j * pablo.graphWSegments, pablo.graph.height - 25);
						}
					} else {
						context.fillStyle = "#bebebe";
						context.arc(lastX, lastY, 3, 0, 2 * Math.PI, true);
						context.fill();
					}
				}


				context.closePath();
				lastX = xPoint;
				lastY = yPoint;


			}
			// }
		},

		'drawAllLines': function (cntxt) {
			var pablo = self;

			// log('drawAllLines', pablo.series, pablo.series.length);
			for(var i = 0; i < pablo.series.length; i++) {
				// log('drawing', pablo.series[i]);
				pablo.drawLine(pablo.series[i], cntxt);
			}
		},

		'setStartDate': function (date) {
			var pablo = self;

			pablo.startDate = date;
		},

		'getStartingDate': function () {
			var pablo = self;
			return pablo.startDate;
		},

		'getMinYwithinRange': function (data) {
			var pablo = self;


			var minY = 99999999999999999; //pablo.yAxisMax;
			for(var i = 0; i < pablo.series.length; i++) {
				for(var k = pablo.startDate, j = 0; k >= pablo.startDate - (pablo.unitsShown); k--, j++) {
					if((data[k]['value'] / 100) < minY) {
						minY = (data[k]['value'] / 100);
					}
				}
			}

			pablo.yAxisMin = minY - 0.01; //Math.round(minY + 0.5);
			return minY;

		},


		'getMaxYwithinRange': function (data) {
			var pablo = self;


			var maxY = 0; //pablo.yAxisMax;
			for(var i = 0; i < pablo.series.length; i++) {
				for(var k = pablo.startDate, j = 0; k >= pablo.startDate - (pablo.unitsShown); k--, j++) {
					if((data[k]['value'] / 100) > maxY) {
						maxY = (data[k]['value'] / 100);
					}
				}
			}

			pablo.yAxisMax = maxY + 0.01; //Math.round(maxY + 0.5);
			return maxY;

		},

		'adjustSlider': function (e) {
			var pablo = self;


			clearTimeout(pablo.redrawInterval);

			pablo.redrawInterval = setTimeout(function(){
				pablo.unitsShown = parseInt($(e.currentTarget).val(), 10);

				if(pablo.unitsShown > pablo.MAX_VIEW) {
					pablo.unitsShown = pablo.MAX_VIEW;
					$(e.currentTarget).val(pablo.MAX_VIEW);
				}
				pablo.redraw();
			}, pablo.UPDATE_THROTTLE);
		},

		'next': function () {
			var pablo = self;
			var dif = pablo.getStartingDate() - pablo.unitsShown;
			if(dif >= 0) {
				pablo.setStartDate(dif);
				pablo.redraw(true, true);
			} else if(dif < 0) {
				pablo.setStartDate(pablo.getStartingDate() - dif);
				pablo.unitsShown -= dif;
				pablo.redraw(true, true);
			}
		},

		'prev': function () {
			var pablo = self;
			if(pablo.getStartingDate() + pablo.unitsShown <= pablo.series[0].length - 1) {
				pablo.setStartDate(pablo.getStartingDate() + pablo.unitsShown);
				pablo.redraw(true, false);
			}
		},

		'updateData': function () {
			var pablo = self;
			var maxY = pablo.yAxisMax;

			$.ajax({
				'url': 'query.php?a=getOptimalSettings&plantID=3'
			}).done(function (res) {
				res = $.parseJSON(res);
				var optimalLight = res['light'];


				var lightLevels = ['N', 'SN', 'S', 'FSN', 'FS'];
				var optimal = lightLevels.indexOf(optimalLight)+1;


			});

			$.ajax({
				'url': 'query.php?a=getStatsHistory'
			}).done(function (res) {
				var importedSeries = $.parseJSON(res);

				// var date = new Date(importedSeries[0]['timestamp']);
				// log(importedSeries[0], date, date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear());


				// var date = new Date(importedSeries[importedSeries.length - 1]['timestamp']);
				// log(importedSeries[importedSeries.length - 1], date, date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear());

				pablo.series.push(importedSeries);
				pablo.setStartDate(importedSeries.length - 1);

				pablo.redraw();


			});
		},

		'newDate': function(input){
			var format = 'yyyy-mm-dd h:m:s'; // default format 2013-01-15 15:03:06
			  var parts = input.match(/(\d+)/g), 
			      i = 0, fmt = {};
			  // extract date-part indexes from the format
			  format.replace(/(yyyy|dd|mm|h|m|s)/g, function(part) { fmt[part] = i++; });

			  return new Date(parts[fmt['yyyy']], parts[fmt['mm']]-1, parts[fmt['dd']], parts[fmt['h']], parts[fmt['m']], parts[fmt['s']]);
		}

	};
	return self;

})(this, this.document);

var Pablo = Pablo || App.Graph;