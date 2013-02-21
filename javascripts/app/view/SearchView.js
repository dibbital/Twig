/**
 * @module Backbone
 * @submodule Backbone.View
 * @class SearchView
 * @constructor
 */

var SearchView = Backbone.View.extend({

	'events': {},

	'initialize': function(options) {
		var view = this;
		_.bindAll(view);

		view.mouse = false;

		App.trigger('header:check', {
			'callback': function () {
				view.pageURL = 'templates/search_plant.php';
				view.$el.addClass('loading').load(view.pageURL, function () {
					view.$el.removeClass('loading');
					view.render();
				});
			}
		});
		
		log('Backbone : SearchView : Initialized');
		
	},

	'render': function() {
		var view = this;

		App.Utilities.supportPlaceholders();

		App.trigger('header:change', {
			'header': 'Database',
			'subtext': 'Search Plants',
			'callback': function(){
				//$('#header_global .button.right').attr('class', 'button right').addClass('backToDash');
			}
		});



		view.$el.find('#advancedOptions').hide();

		var $advancedBtn = view.$el.find(".advancedButton");
		var $searchBtn = view.$el.find(".searchButton");
		$advancedBtn.on('click', view.expandOptions);
		$searchBtn.on('click', view.finishSearch);
		$('#plantName').on('input', function(e){ if($(this).val().length >= 2){  view.finishSearch(e); } });

		var $options = view.$el.find(".option");
		$options.on("click",view.showSearchModal);

		view.$el.find(".returnList").hide();
		Walt.animateEachChild({
			'container': view.$el.find('.returnList').show(),
			'transition': 'fadeInUp',
			'delay': 0.05,
			'duration': '0.4s',
		});
		view.selectPlant();

		view.$page = $('.returnList li').eq(0).data('page');
		view.$totalPages = $('.returnList li').eq(0).data('total');

		view.$searched = false;

		view.$el.find('.returnList').on('scroll', function(){view.checkBottom(this)});


		$('#searchDatabase').submit(function(e){ e.preventDefault(); e.stopPropagation(); view.finishSearch(); });

	},

	'showSearchModal':function(e){
		var view = this;
		var $element = e.currentTarget;
		view.$el.addClass('modal');

		$('#header_global .button.right').fadeOut();
		$('#header_global .button.left').fadeOut();

		$("#side_menu").css({'pointer-events':'none'});
		$("#advancedOptions").css({'pointer-events':'none'});

		switch($($element).data('search')){
			case 'type': $typeSelects = $('#plantType option');
					$html = "<div class='selectModal'><div data-value='none'>None</div>";

					//Because the phone crashes when all the types are loaded in at once, separate how they are loaded
					view.$totalTypes = $typeSelects.length - 1;
					view.$start = 1;
					view.$count = 0;

					//only load the first 5
					for(var i = 1; i< 6; i++){
						$value = $($typeSelects[i]).val();
						$html += "<div data-value='"+$value+"'>"+$value+"</div>";
						//console.log("showing" + i);
						view.$count++;
					}

					$html += "</div>";

				  var $typeEl = $($html);
						$typeEl.insertAfter(view.$el);
						view.makeCancelButton($typeEl);

						
						view.$types = $('.selectModal div');

						//when the user scrolls, load 5 every iteration
						$(".selectModal").on('scroll', function(){view.loadMoreTypes(view.$start * 6,this,$typeSelects)});

						setInterval(function(){
							view.$types.on('click', function(e){
								e.preventDefault();
								e.stopPropagation();
								$selected = e.currentTarget;
								$type = $($selected).data('value');
								
								var $typeSelect = $('#plantType');
								if($type == 'none'){
									$typeSelect.val('');
									$('.option.type h3').html($type);
								}else{
									$typeSelect.val($type);
									$('.option.type h3').html($type);
								}
								
								$('.selectModal').remove();
								$('.cancel').remove();

								view.$el.removeClass('modal');

								$("#side_menu").css({'pointer-events':'auto'});
								$("#advancedOptions").css({'pointer-events':'auto'});

								$('#header_global .button.right').fadeIn();
								$('#header_global .button.left').fadeIn();
							});
						},300);

						break;
			case 'maintenance': var $mainSelects = $("#plantMaintenance option");
								$html = "<div class='selectModal'><div data-value='none'>None</div>";
								for(var i = 1; i < $mainSelects.length; i++){
									$value = $($mainSelects[i]).val();
						 			$html += "<div data-value='"+$value+"'>"+$value+"</div>";
								}

								$html +="</div>";
								var $mainEl = $($html);
								$mainEl.insertAfter(view.$el);
								view.makeCancelButton($mainEl);

								var $maintenanceLevels = $('.selectModal div');
								$maintenanceLevels.on('click', function(e){
									$selected = e.currentTarget;
									$maintenanceLevel = $($selected).data('value');
									var $mainSelect = $('#plantMaintenance');
									if($maintenanceLevel == 'none'){
										$mainSelect.val('');
										$('.option.maintenance h3').html($maintenanceLevel);
									}else{
										$mainSelect.val($maintenanceLevel);
										$('.option.maintenance h3').html($maintenanceLevel);
									}

									$('.selectModal').remove();
									$('.cancel').remove();

									view.$el.removeClass('modal');
									view.changeImage('maintenance',$maintenanceLevel);

									$("#side_menu").css({'pointer-events':'auto'});
									$("#advancedOptions").css({'pointer-events':'auto'});

									$('#header_global .button.right').fadeIn();
									$('#header_global .button.left').fadeIn();
								});
							break;

			case 'size': var $sizeSelects = $('#plantSize option');
						 $html = "<div class='selectModal'><div data-value='none'>None</div>";
						 for(var i = 1; i < $sizeSelects.length; i++){
						 	$value = $($sizeSelects[i]).val();
						 	$html += "<div data-value='"+$value+"'>"+$value+"</div>";
						 }

						 $html += "</div>";

						var $sizeEl = $($html);
						$sizeEl.insertAfter(view.$el);
						view.makeCancelButton($sizeEl);

						var $sizes = $('.selectModal div');
						$sizes.on('click', function(e){
							$selected = e.currentTarget;
							$size = $($selected).data('value');
							var $sizeSelect = $('#plantSize');
							if($size == 'none'){
								$sizeSelect.val('');
								$('.option.size h3').html($size);
							}else{
								$sizeSelect.val($size);
								$('.option.size h3').html($size);
							}
							
							$('.selectModal').remove();
							$('.cancel').remove();

							view.changeImage('size',$size);
							view.$el.removeClass('modal');

							$("#side_menu").css({'pointer-events':'auto'});
							$("#advancedOptions").css({'pointer-events':'auto'});

							$('#header_global .button.right').fadeIn();
							$('#header_global .button.left').fadeIn();
						});

						break;
		}
	},

	'makeCancelButton':function(elem){
		var view = this;
		console.log(elem);
		$cancelButton = $("<div class='cancel'>Cancel</div>");
		$cancelButton.insertAfter($(elem)).on("click", function(){
			$('.selectModal').remove();
			$(this).remove();
			view.$el.removeClass('modal');
			$("#side_menu").css({'pointer-events':'auto'});
			$("#advancedOptions").css({'pointer-events':'auto'});
			$('#header_global .button.right').fadeIn();
			$('#header_global .button.left').fadeIn();
		});
	},

	'expandOptions': function() {
		var view = this;
		if(!$('#plantResults').hasClass('advancedOptionsOpened')){
			view.$el.find("#advancedOptions").show();
			setTimeout(function(){
				$('#plantResults').addClass('advancedOptionsOpened');
				$('#advancedOptions').addClass('advancedOptionsOpened');
				$('.advancedButton').addClass('active');
				App.trigger('nav:left:disable');

				$('#header_global .button.left').addClass('close').on('click', function(e){
					if($('#advancedOptions').hasClass('advancedOptionsOpened')){
						e.preventDefault();
						e.stopImmediatePropagation();
						$('#plantResults').removeClass('advancedOptionsOpened');
						$('#advancedOptions').removeClass('advancedOptionsOpened');
						$('.advancedButton').removeClass('active');
						$('#header_global .button.left').removeClass('close');
						App.trigger('nav:left:enable');
					}
				});


			}, 5);
		}else{
			$('#plantResults').removeClass('advancedOptionsOpened');
			$('#advancedOptions').removeClass('advancedOptionsOpened');
			$('.advancedButton').removeClass('active');
			App.trigger('nav:enable:left');
			setTimeout(function(){view.$el.find("#advancedOptions").hide();}, 500);
		}
	},

	'finishSearch': function() {
		var view = this;

		if(view.$el.find("#searchDefault").length == 1){
			view.$el.find("#searchDefault").remove();
		}

		view.$el.find("#results").show();

		view.$el.find('#plantResults').addClass('loading');
		//close the advance search tab if open
		if($('.advancedButton').hasClass('active')){
			view.expandOptions();
		}
		//lets run some validation
		var $plantName = $('#plantName').val();
		var $plantSize = $('#plantSize').val();
		var $plantMain = $('#plantMaintenance').val();
		var $plantType = $('#plantType').val();

		view.$urlString = "query.php?a=searchDatabase"
		//if the user hasn't entered anything in the search field
		if($plantName == ''){

			//fade out header buttons
			$('#header_global .button.right').fadeOut();
			$('#header_global .button.left').fadeOut();

			//remove loading from plant div and apply the modal background 
			view.$el.find('#plantResults').removeClass('loading');
			view.$el.addClass('modal');

			//create pop up
			$warningEl = $("<div class='selectModal'><h2>You must enter something in the search field!</h2><div class='submit'>OK</div></div>");
			$warningEl.insertAfter(view.$el);
			$('.selectModal').css({'top':($(window).height() / 3) + 'px', 'left' : ($(window).width() / 13) + 'px'});

			//bounce-in animation
			Walt.animate({
				'$el': $warningEl,
				'transition':'bounceIn',
				'delay': 0,
				'duration': '.4s',
				'callback': function(){
					//only things selectable is the submit button
					$("#side_menu").css({'pointer-events':'none'});
					$("#advancedOptions").css({'pointer-events':'none'});

					//bounce-out animation
					$('.selectModal .submit').on('click', function(){
						Walt.animate({
							'$el': $warningEl,
							'transition':'bounceOut',
							'delay': 0,
							'duration': '.4s',
							'callback': function(){
								//make things available again
								$("#side_menu").css({'pointer-events':'auto'});
								$("#advancedOptions").css({'pointer-events':'auto'});

								//remove modals and fade back in header buttons
								$warningEl.remove();
								view.$el.removeClass('modal');
								$('#header_global .button.right').fadeIn();
								$('#header_global .button.left').fadeIn();
							}
						});
					});
				}
			});
		}else{

			//set url parameter of the search field
			view.$urlString += "&plantName=" + $plantName;

			//if type is selected, add to url string
			if($plantType != '-'){
				view.$urlString += "&plantType=" + $plantType;
			}

			//if size is selected, add to the string
			if($plantSize != '-'){
				view.$urlString += "&plantSize=" + $plantSize;
			}

			//if maintenance is selected, add to the string
			if($plantMain != '-'){
				view.$urlString += "&plantMaintenance=" + $plantMain;
			}

			if(typeof view.$ajax != 'undefined'){
				view.$ajax.abort();
			}
			view.$ajax = $.ajax({
				url: view.$urlString+"&page=1",
				dataType: 'json',
				type: 'GET',
				success: function(data){
					var numResults = data.num_rows;
					var $html ="";
					view.$page = data.page;
					view.$totalPages = data.total_pages;

					//alert(JSON.stringify(data));
					if(numResults == 0){
						console.log('no results');
						view.$results = false;
						//alert(JSON.stringify(data));
						$html += "<h2>Could not find plants that matched your query. Please modify your search.</h2>";
					}else{
						console.log('results');
						var $plants = data.plants;
						//alert(JSON.stringify(data));
						for (var i = 0; i< $plants.length ;i++){
							var $name = $plants[i].common_name;
							var $latin = $plants[i].family;
							var $id = $plants[i].id;
							var $img = "<img src='http://placekitten.com/150/150' />";
							$html+="<li data-plant-id='"+$id+"'>"+$img+"<h2>"+$name+"</h2><h3>"+$latin+"</h3></li>";
						}
					}

					view.$searched = true;
					view.$results = true;
					view.$el.find(".returnList").hide().html($html);
					Walt.animateEachChild({
						'container': view.$el.find('.returnList').show(),
						'transition': 'fadeInUp',
						'delay': 0.05,
						'duration': '0.4s'
					});
					view.selectPlant();
				},

				error: function(error){
					//view.$el.find(".returnList").html("<h2>Error connecting to database. Please check your connection</h2>" + error.responseText);
					//view.$el.find("#plantResults").removeClass('loading');
				}
			}).done(function(){
				view.$el.find("#plantResults").removeClass('loading');
			});
		}
	},

	'checkBottom': function(elem){
		var view = this;
		//console.log(elem.scrollHeight+","+elem.offsetHeight+","+elem.scrollTop);
		if(elem.offsetHeight + elem.scrollTop >= elem.scrollHeight - 250 && $(".returnList li").length != 0){
			view.pagination(elem.scrollTop,view.$page);
		}
	},

	'pagination': function(offset, page){

		var view = this;
		//console.log(view.$page + "," + view.$totalPages);
		

		if(view.$page <= view.$totalPages && $(".ajaxLoader").length == 0){
			view.$el.find('.returnList').append("<li class='loader'><div class='ajaxLoader loading'></div></li>");
			//console.log($(".ajaxLoader").length);
			view.$page++;

			if(view.$searched == true && view.$results == true){
				var $html ='';
				$.ajax({
					url: view.$urlString+'&page='+view.$page,
					dataType: 'json',
					success: function(data){
						//alert(JSON.stringify(data));
						$('.returnList li.loader').remove();
						$plants = data.plants;
						for (var i = 0; i< $plants.length ;i++){
							var $name = $plants[i].common_name;
							var $latin = $plants[i].family;
							var $id = $plants[i].id;
							var $img = "<img src='http://placekitten.com/150/150' />";
							$html+="<li data-plant-id='"+$id+"'>"+$img+"<h2>"+$name+"</h2><h3>"+$latin+"</h3></li>";
						}

						view.$el.find('.returnList').append($html);
						view.selectPlant();
					},
					error: function(){
						view.$el.find(".returnList").html("<h2>Error connecting to database. Please check your connection</h2>");
					}
				});
			}else{
				$.ajax({
					url: 'query.php?a=paginateAllPlants&page='+view.$page,
					success: function(data){
						$('.returnList li.loader').remove();
						$('.returnList').append(data);
						view.selectPlant();
					},
					error: function(){
						view.$el.find(".returnList").html("<h2>Error connecting to database. Please check your connection</h2>");
					}
				});
			}
		}

	},

	'selectPlant':function(){
		var view = this;
		view.$el.find('.returnList li').on('click', function(e){
					e.preventDefault();
					e.stopPropagation();
					var elem = $('#section_content').children();
					$plantID = $(this).data('plant-id');
					Walt.animate({
						'el': this,
						'transition':'fadeOutUp',
						'delay':0,
						'duration':'.5s',
						'callback': function(){
							$(elem).css('visibility','hidden');
							//console.log($plantID);
							Backbone.history.navigate('#plant/' + $plantID, {
								'trigger': true
							});
						}				
					});
					// Walt.animateEach({
					// 	'list': view.$el.find('.returnList').not(this),
					// 	'transition':'fadeOutDown',
					// 	'delay':0,
					// 	'duration':'.5s'					
					// });
				});

	},

	'changeImage': function(i,v){
		
		v = v.toLowerCase(v);
		switch(i){
			case 'size':
				switch(v){
					case 'none': $('.sizeImage').css({'background-image':"url('/images/sizeNone.png')"}); break;
					case 'small' : $('.sizeImage').css({'background-image':"url('/images/sizeSmall.png')"}); break;
					case 'medium' : $('.sizeImage').css({'background-image':"url('/images/sizeMedium.png')"}); break;
					case 'large' : $('.sizeImage').css({'background-image':"url('/images/sizeLarge.png')"}); break;
					default: $('.sizeImage').css({'background-image':"url('/images/sizeNone.png')"}); break;
				}
				break;

			// case 'type':
			// 	switch(v){
			// 		case 'none': $('.sizeImage').css({'background-image':"url('/images/sizeNone.png')"}); break;
			// 		case 'small' : $('.sizeImage').css({'background-image':"url('/images/sizeSmall.png')"}); break;
			// 		case 'medium' : $('.sizeImage').css({'background-image':"url('/images/sizeMedium.png')"}); break;
			// 		case 'large' : $('.sizeImage').css({'background-image':"url('/images/sizeLarge.png')"}); break;
			// 		default: $('.sizeImage').css({'background-image':"url('/images/sizeNone.png')"}); break;
			// 	}
			// 	break;

			// case 'maintenance':
			// 	switch(v){
			// 		case 'none': $('.maintenanceImage').css({'background-image':"url('/images/mainNone.png')"}); break;
			// 		case 'low' : $('.maintenanceImage').css({'background-image':"url('/images/mainLow.png')"}); break;
			// 		case 'medium' : $('.maintenanceImage').css({'background-image':"url('/images/mainMedium.png')"}); break;
			// 		case 'high' : $('.maintenanceImage').css({'background-image':"url('/images/mainHigh.png')"}); break;
			// 		default: $('.maintenanceImage').css({'background-image':"url('/images/mainNone.png')"}); break;
			// 	}
			// 	break;
		}
	},

	'loadMoreTypes':function(offset,modal,elem){
		var view = this;
		var $html = "";
		//if the user is almost at the bottom of the modal, and the count is one less than the totat
		//amount of select divs (we never made a div for the 0 index :P)
		if(modal.offsetHeight + modal.scrollTop >= modal.scrollHeight - 300 && view.$count < view.$totalTypes - 1){
			
			//load in the next 5 types
			for(var i = offset; i < offset + 6; i++){
				var $value = $(elem[i]).val();
				$html += "<div data-value='"+$value+"'>"+$value+"</div>";
				//console.log("showing" + i);
				view.$count++;
			}


			view.$start++;
			var $selects = $(".selectModal div");
			//stick the new types after the last one loaded
			$($html).insertAfter($selects[$selects.length - 1]);

			view.$types = $selects;
		}
	}

});