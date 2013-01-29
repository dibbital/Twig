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
		App.trigger('header:change', {
			'header': 'Database',
			'subtext': 'Search Plants',
			'callback': function(){
				$('#header_global .button.right').addClass('dashboard');
			}
		});

		view.$el.find('#advancedOptions').hide();

		var $advancedBtn = view.$el.find(".advancedButton");
		var $searchBtn = view.$el.find(".searchButton");
		$advancedBtn.on('click', view.expandOptions);
		$searchBtn.on('click', view.finishSearch);

		var $menuBtn = $("#header_global .button.left");
		console.log($menuBtn);
		$menuBtn.on('click', function(e){
			e.preventDefault();
			e.stopImmediatePropagation();
			if($('#advancedOptions').hasClass('advancedOptionsOpened')){
				$('#plantResults').removeClass('advancedOptionsOpened');
				$('#advancedOptions').removeClass('advancedOptionsOpened');
				$('.advancedButton').removeClass('active');
			}
		});

		var $options = view.$el.find(".option");
		$options.on("click",view.showSearchModal);

		
	},

	'showSearchModal':function(e){
		var view = this;
		var $element = e.currentTarget;
		view.$el.addClass('modal');
		$('#header_global .button.right').fadeOut();
		$('#header_global .button.left').fadeOut();
		switch($($element).data('search')){
			case 'type': $typeSelects = $('#plantType option');
					$html = "<div class='selectModal'><div data-value='none' class='cancel'>Cancel</div>"
					for(var i = 1; i< $typeSelects.length; i++){
						$value = $($typeSelects[i]).val();
						$html += "<div data-value='"+$value+"'>"+$value+"</div>";
					}

					$html += "</div>";

				  var $typeEl = $($html);
						$typeEl.insertAfter(view.$el);

						var $types = $('.selectModal div');
						$types.on('click', function(e){
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
							view.$el.removeClass('modal');
							$('#header_global .button.right').fadeIn();
							$('#header_global .button.left').fadeIn();
						});

						break;
			case 'maintenance': var $mainSelects = $("#plantMaintenance option");
								$html = "<div class='selectModal'><div data-value='none' class='cancel'>Cancel</div>";
								for(var i = 1; i < $mainSelects.length; i++){
									$value = $($mainSelects[i]).val();
						 			$html += "<div data-value='"+$value+"'>"+$value+"</div>";
								}

								$html +="</div>";
								var $mainEl = $($html);
								$mainEl.insertAfter(view.$el);
								var $maintenanceLevels = $('.selectModal div');
								$maintenanceLevels.on('click', function(e){
									$selected = e.currentTarget;
									$maintenanceLevel = $($selected).data('value');
									var $mainSelect = $('#plantMaintenance');
									if($maintenanceLevel == 'none'){
										$mainSelect.val('')
										$('.option.maintenance h3').html($maintenanceLevel);
									}else{
										$mainSelect.val($maintenanceLevel);
										$('.option.maintenance h3').html($maintenanceLevel);
									}

									$('.selectModal').remove();
									view.$el.removeClass('modal');
									$('#header_global .button.right').fadeIn();
									$('#header_global .button.left').fadeIn();
								});
							break;

			case 'size': var $sizeSelects = $('#plantSize option');
						 $html = "<div class='selectModal'><div data-value='none' class='cancel'>Cancel</div>";
						 for(var i = 1; i < $sizeSelects.length; i++){
						 	$value = $($sizeSelects[i]).val();
						 	$html += "<div data-value='"+$value+"'>"+$value+"</div>";
						 }

						 $html += "</div>";

						var $sizeEl = $($html);
						$sizeEl.insertAfter(view.$el);

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
							view.$el.removeClass('modal');
							$('#header_global .button.right').fadeIn();
							$('#header_global .button.left').fadeIn();
						});

						break;
		}
	},

	'expandOptions': function() {
		var view = this;
		if(!$('#plantResults').hasClass('advancedOptionsOpened')){
			view.$el.find("#advancedOptions").show();
			setTimeout(function(){
				$('#plantResults').addClass('advancedOptionsOpened');
				$('#advancedOptions').addClass('advancedOptionsOpened');
				$('.advancedButton').addClass('active');
			}, 5);
		}else{
			$('#plantResults').removeClass('advancedOptionsOpened');
			$('#advancedOptions').removeClass('advancedOptionsOpened');
			$('.advancedButton').removeClass('active');
			setTimeout(function(){view.$el.find("#advancedOptions").hide();}, 500);
		}
	},

	'finishSearch': function() {
		var view = this;

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

		var $urlString = "searchDatabase.php?"
		if($plantName == ''){
			$('#header_global .button.right').fadeOut();
			$('#header_global .button.left').fadeOut();
			view.$el.find('#plantResults').removeClass('loading');
			view.$el.addClass('modal');
			$warningEl = $("<div class='selectModal'><h2>You must enter something in the search field!</h2><div class='submit'>OK</div></div>");
			$warningEl.insertAfter(view.$el);

			Walt.animateEach({
				'list': $warningEl,
				'transition':'bounceIn',
				'delay': 0,
				'duration': '.4s',
				'callback': function(){
					$('.selectModal .submit').on('click', function(){
						Walt.animateEach({
							'list': $warningEl,
							'transition':'bounceOut',
							'delay': 0,
							'duration': '.4s',
							'callback': function(){
								setTimeout(function(){
									$warningEl.remove();
									view.$el.removeClass('modal');
									$('#header_global .button.right').fadeIn();
									$('#header_global .button.left').fadeIn();
								}, 400);

							}
						});
					});
				}
			});
		}else{

			$urlString += "plantName=" + $plantName;

			if($plantType != '-'){
				$urlString += "&plantType=" + $plantType;
			}

			if($plantSize != '-'){
				$urlString += "&plantSize=" + $plantSize;
			}

			if($plantMain != '-'){
				$urlString += "&plantMaintenance=" + $plantMain;
			}

			$.ajax({
				url: $urlString,
				dataType: 'json',
				type: 'GET',
				success: function(data){
					var numResults = data.num_rows;
					var $html ="";
					//alert(JSON.stringify(data));
					if(numResults == 0){
						console.log('no results');
						//alert(JSON.stringify(data));
						$html += "<h2>Could not find plants that matched your query. Please modify your search.</h2>";
					}else{
						console.log('results');
						var $plants = data.plants;
						//alert(JSON.stringify(data));
						for (var i = 0; i< $plants.length ;i++){
							var $name = $plants[i].common_name;
							var $latin = $plants[i].family;
							var $img = "<img src='http://placekitten.com/150/150' />";
							$html+="<li>"+$img+"<h2>"+$name+"</h2><h3>"+$latin+"</h3></li>";
						}
					}

					view.$el.find(".returnList").html($html);
				},

				error: function(error){
					console.log("error\n" + error.responseText);
					view.$el.find("#plantResults").removeClass('loading');
				}
			}).done(function(){
				view.$el.find("#plantResults").removeClass('loading');
			});
		}
	}

});