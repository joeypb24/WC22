jQuery(function($) {
	'use strict';
	var isPredictionProd = true;

	var urlParamLang = state.user.locale;
	// var urlParamLang = "th-TH";
	let langList;

	var predictionJson;
	let teamListResult;
	let teamGroupArr = [];

	function fetchLangJson(trans){
		Object.entries(trans).map(obj => {
			const key   = obj[0];
			const val = obj[1];
			const langArgList = val[urlParamLang];

			if(langArgList){
				langArgList.forEach((argV, argI) => {
					$('[data-txt="btn1"]').html(argV['btn1']);
					$('[data-txt="txt21"]').html(argV['txt21']);
					$('[data-placeholder="placeholder2"]').attr("placeholder", argV['placeholder2']);
				});
			}

		});
	}

	fetchLangJson(langcontent);


	jQuery.fn.extend({
		initDropdown: function () {
			$(this).each(function(){
				var that = this;
				var clickDetect = 0;
				$(that).find('.dropdown-selected, .dropdown-selection').mouseenter(function(){
					clickDetect = 1;
				});
				$(that).find('.dropdown-selected, .dropdown-selection').mouseleave(function(){
					clickDetect = 0;
				});
				$(that).find('.dropdown-selected').click(function(){
					if(!$(this).hasClass('active')) {
						$(this).addClass('active');
					}
					else {
						$(this).removeClass('active');
					}
				});
				$(document).click(function(){
					if(clickDetect == 0) {
						$(that).find('.dropdown-selected').removeClass('active');
					}
				});
				$(that).find('.dropdown-selection dd').click(function(){
					var hiddenVal = ($(this).attr('data-value') != 'placeholder') ? $(this).attr('data-value') : '';
					$(that).find('.dropdown-selected').text($(this).text()).attr('data-country', $(this).attr('data-country'));
					$(that).find('input[type="hidden"]').val(hiddenVal);
					$(that).removeClass('valid');
					if($(that).find('input[type="hidden"]').val() != '') {
						$(that).addClass('valid');
					}
					$(that).find('.dropdown-selected').removeClass('active');
				});
				
				var dropdownHiddenField = $(that).find('input[type="hidden"]').attr('name');
				$(that).find('.dropdown-selected').text($(that).find('dd:eq(0)').text()).attr('data-country', $(that).find('dd:eq(0)').attr('data-country'));
				if($(that).find('dd:eq(0)').attr('data-value') == 'placeholder') {
					$(that).find('input[type="hidden"]').val('');
				}
				else {
					$(that).find('input[type="hidden"]').val($(that).find('dd:eq(0)').attr('data-value'));
				}
			});
		}
	});
	$('.dropdown-box').initDropdown();

	
	/**Team List START */
	function fetchTeams(result){
        teamListResult = result;
		Object.entries(result).map(obj => {
            const key = obj[0];
            const val = obj[1];
			langList = urlParamLang + "-list";
			const teamArgList = val[langList];

			
			if(teamArgList ){
				// console.log(teamArgList)
			
				teamArgList.forEach(elem => {
					if(teamGroupArr.indexOf(elem.group) === -1) {
						teamGroupArr.push(elem.group);
						teamGroupArr[elem.group] = [];
					}
					// teamGroupArr[elem.group].push('<div class="test">dsf</div>')
					(teamGroupArr[elem.group]).push('<div class="dd-option icon " data-val="'+elem.id+'">'+elem.name+'</div>')
				});
				// console.log(teamGroupArr[val.group])
				
			}
		});

		bracketResponsive();
	}

	fetchTeams(teams);
	/**Team List END */
	
	/**Break HTML START */
	var prevDesk;

	function bracketResponsive(){
		var bracketFormat = ($(window).width() >= 768) ? bracketFormat = 'desktop' : bracketFormat = 'mobile';
		if(typeof prevDesk == "undefined" || prevDesk != bracketFormat) {
			prevDesk = bracketFormat;
			$('.bracket-wrap').load('views/pred-dd-'+bracketFormat+'.html', function(){
	
				$('.dd-wrap').each(function(i){
					var ddGroups = $(this).attr('data-groups');
					ddGroups = ddGroups.split(",");
					let ddListElem = $(this).find('.dd-option-wrap .list');
					for(var i=0;i<ddGroups.length;i++) {
						ddListElem.append(teamGroupArr[ddGroups[i]]);
					}
				});
				$('.dd-option-wrap .scrollbar-inner').scrollbar();
				if(urlParamLang) {
					if(urlParamLang != 'id-ID' && urlParamLang != 'vn-VI' && urlParamLang != 'th-TH') {
						urlParamLang = 'en-US';
					}
					fetchLangJson(urlParamLang);
				}
			});
		}
	}

	$(window).on('resize',function(){
		bracketResponsive();
	});
	/**Break HTML END */

	$(document).on('click', '.dd-wrap', function(){
		$('.dd-wrap').not(this).removeClass('active');
		$(this).toggleClass('active');
		if($(this).hasClass('active')) {
			$(this).closest('.bracket').addClass('active');
			$('.bracket-scroller-x').removeClass('scroll-holder scroll-x');
			if($(window).width() <= 480) {
				$('body').attr('data-popupactive', 'true');
			}
		} else {
			$(this).closest('.bracket').removeClass('active');
			$('.bracket-scroller-x').addClass('scroll-holder scroll-x');
			$('body').removeAttr('data-popupactive');
		}
	});

	$(document).on('click mouseup', '.dd-wrap .dd-option', function(){
		let ddVal = $(this).data('val');
		let ddTxt = $(this).find('.txt').text(); 
		
		$(this).closest('.dd-wrap').find(".dd-selected[class*='icon']").removeClass (function (index, css) {
		   return (css.match (/(^|\s)icon\S+/g) || []).join(' ');
		});
		$(this).closest('.dd-wrap').find('.dd-selected').removeClass('placeholder').addClass('icon icon-'+ddVal);
		$(this).closest('.dd-wrap').find('.dd-selected').attr('data-val', ddVal);
		$(this).closest('.dd-wrap').find('.dd-selected .txt').text(ddTxt);
		
		let counter = 0;
		$('.dd-wrap').each(function(){
			counter += $(this).find('.dd-selected[data-val]').length;
		});
		if(counter >= 15) {
			$('.cta-area .btn').removeClass('inactive');
		}
	});

	$(document).on('mouseup', function(e) {
		let container = $(".dd-wrap");
		if(!container.is(e.target) && container.has(e.target).length === 0 && $(window).width() >= 481) {
			$('.dd-wrap, .bracket').removeClass('active');
			$('.bracket-scroller-x').addClass('scroll-holder scroll-x');
		}
	});

	$(document).on('keyup change', '.dd-wrap .dd-selected input', function(){
		var inputVal = $(this).val();
		var ddWrap = $(this).closest('.dd-wrap');
		var inputField = this;
		var result = $(inputField).val().toLowerCase();
		var wordsToBold = result.split(' ');
		
		if($(inputField).val() != '') {
			Object.entries(teamListResult.teams).map(obj => {
				const key   = obj[0];
				const value = obj[1];
				var dataVal = value.name;
				var checkRes = result.toLowerCase();
				
				if((dataVal.toLowerCase()).includes(checkRes)) {
					$(ddWrap).find('.dd-option[data-val="'+value.id+'"]').removeClass('input-hidden');
				} else {
					$(ddWrap).find('.dd-option[data-val="'+value.id+'"]').addClass('input-hidden');
				}
			});
		}
	});

	$(document).on('mouseup', '.dd-wrap .dd-option', function(){
		let ddWrapSelVal = $(this).closest('.dd-wrap').find('.dd-selected').attr('data-val');
		let ddWrapSelf = $(this).closest('.dd-wrap').attr('data-self');
		let ddWrapColGroup = $(this).closest('.dd-wrap').attr('data-colgroup');
		let ddWrapTarget = $(this).closest('.dd-wrap').attr('data-target');
		let ddWrapPrvTarget = $(this).closest('.dd-wrap').attr('data-prvtarget');
		let selTeamsArr = [];
		let selTeamsPrvArr = [];
		
		$('.dd-wrap[data-self="'+ddWrapTarget+'"] .dd-option').addClass('hidden');
		$('.dd-wrap[data-target="'+ddWrapTarget+'"]').each(function(){
			let ddVal = $(this).find('.dd-selected').attr('data-val');
			selTeamsArr.push(ddVal);
		});
		
		$('.dd-wrap[data-self="'+ddWrapTarget+'"]').find('.dd-option').each(function(){
			let ddVal = $(this).attr('data-val');
			if(($.inArray(ddVal, selTeamsArr)) != -1) {
				$(this).removeClass('hidden');
			}
		});
		autoHeightDDOption(ddWrapTarget);
		
		//prev
		if(typeof ddWrapPrvTarget !== "undefined") {
			let ddWrapPrvTargetArr = ddWrapPrvTarget.split(",");
			$.each(ddWrapPrvTargetArr, function(key, value){
				$('.dd-wrap[data-self="'+value.trim()+'"]').each(function(){
					let ddVal = $(this).find('.dd-selected').attr('data-val');
					selTeamsPrvArr.push(ddVal);
				});
			});
			
			let ddSelectedPrv = $('.dd-wrap[data-self="'+ddWrapSelf+'"]').find('.dd-selected').attr('data-val');
			if(($.inArray(ddSelectedPrv, selTeamsPrvArr)) == -1 && $.inArray(undefined, selTeamsPrvArr) == -1) {
				$.each(ddWrapPrvTargetArr, function(key, value){
					$('.dd-wrap[data-self="'+value.trim()+'"]').find('.dd-selected').removeAttr('data-val').addClass('placeholder').find('.txt').text('');
					$('.dd-wrap[data-self="'+value.trim()+'"]').find('.dd-selected').removeClass(function (index, className) {
						$(this).removeClass('icon');
						return (className.match (/(^|\s)icon\S+/g) || []).join(' ');
					});
				});
			}
		}
		
		//next
		if($('.dd-wrap[data-self="'+ddWrapSelf+'"]').length >= 2) {
			$('.dd-wrap[data-self="'+ddWrapSelf+'"]').each(function(){
				let ddVal = $(this).find('.dd-selected').attr('data-val');
				selTeamsArr.push(ddVal);
			});
			
			let ddSelected = $('.dd-wrap[data-self="'+ddWrapTarget+'"]').find('.dd-selected').attr('data-val');
			if(($.inArray(ddSelected, selTeamsArr)) == -1 && $.inArray(undefined, selTeamsArr) == -1) {
				$('.dd-wrap[data-self="'+ddWrapTarget+'"]').find('.dd-selected').removeAttr('data-val').addClass('placeholder').find('.txt').text('');
				$('.dd-wrap[data-self="'+ddWrapTarget+'"]').find('.dd-selected').removeClass(function (index, className) {
					$(this).removeClass('icon');
					return (className.match (/(^|\s)icon\S+/g) || []).join(' ');
				});
			}
		} else {
			$('.dd-wrap[data-colgroup="'+ddWrapColGroup+'"]').each(function(){
				let ddVal = $(this).find('.dd-selected').attr('data-val');
				selTeamsArr.push(ddVal);
			});
			
			let ddSelected = $('.dd-wrap[data-self="'+ddWrapTarget+'"]').find('.dd-selected').attr('data-val');
			if(($.inArray(ddSelected, selTeamsArr)) == -1 && $.inArray(undefined, selTeamsArr) == -1) {
				$('.dd-wrap[data-self="'+ddWrapTarget+'"]').find('.dd-selected').removeAttr('data-val').addClass('placeholder').find('.txt').text('');
				$('.dd-wrap[data-self="'+ddWrapTarget+'"]').find('.dd-selected').removeClass(function (index, className) {
					$(this).removeClass('icon');
					return (className.match (/(^|\s)icon\S+/g) || []).join(' ');
				});
			}
		}
		
		//distinct col group
		let bracketClass = $(this).closest('.bracket').attr('class');
		bracketClass = bracketClass.split(' ');
		$('.'+bracketClass[1]+' .dd-wrap').each(function(){
			if(ddWrapSelVal == $(this).find('.dd-selected').attr('data-val')) {
				$(this).find('.dd-selected').removeAttr('data-val').addClass('placeholder').find('.txt').text('');
				$(this).find('.dd-selected').removeClass(function (index, className) {
					$(this).removeClass('icon');
					return (className.match (/(^|\s)icon\S+/g) || []).join(' ');
				});
			}
		});
	});

	function autoHeightDDOption(ddWrap) {
		let ddOptionLength = $('.dd-wrap[data-self="'+ddWrap+'"]').find('.dd-option:not(.hidden)').length;
		let accumulateHeight = ddOptionLength * $('.dd-option').height();
		$('.dd-wrap[data-self="'+ddWrap+'"] .list').height(accumulateHeight);
	}
	
	function capitalizeFirstLetter(str) {

		const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
	
		return capitalized;
	}
	
});