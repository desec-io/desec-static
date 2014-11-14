//Ultima HTML5 Landing Page v2.1
//Copyright 2014 8Guild.com
//All scripts for Ultima Landing Page version #1

/*Page Preloading*/
$(window).load(function() {
	$('#spinner').fadeOut();
	$('#preloader').delay(300).fadeOut('slow');
	setTimeout(function(){$('.first-slide div:first-child').addClass('fadeInDown');},100);
	setTimeout(function(){$('.first-slide div:last-child').addClass('fadeInRight');},100);
	setTimeout(function(){$('#top-navi').addClass('bounceInDown');},100);
	setTimeout(function(){$('.side-navi').addClass('slideInRight');},100);
	setTimeout(function(){$('.color-switcher').addClass('slideInLeft');},100);
});

/*Checking if it's touch device we disable some functionality due to inconsistency*/
if (Modernizr.touch) { 
	$('*').removeClass('animated');
}

/*Document Ready*/
$(document).ready(function(e) {
	
	/*Hero Slider*/
	$('.hero-slider').bxSlider({
		mode: 'fade',
		adaptiveHeight: true,
		controls: false,
		video: true,
		touchEnabled: false
	});
	
	/*Vertically Center Side Navigation*/
	var sideNav = $('.side-navi');
	var sideNavH = sideNav.innerHeight();
	var sideNavMT = -sideNavH/2;
	$('.side-navi').css('margin-top', sideNavMT);
	
	////////////////////////////////////////////////////////////
	//INTERNAL ANCHOR LINKS SCROLLING (NAVIGATION)
	$(".scroll").click(function(event){		
		event.preventDefault();
		$('html, body').animate({scrollTop:$(this.hash).offset().top}, 1000, 'easeInOutQuart');
	});
	
	/*Scroll Up*/
	$('.scroll-up').click(function(){
    $("html, body").animate({ scrollTop: 0 }, 1000, 'easeInOutQuart');
    return false;
	});
	
	$(window).scroll(function(){
		if ($(this).scrollTop() > 500) {
			$('#scroll-top').addClass('visible');
		} else {
			$('#scroll-top').removeClass('visible');
		}
	});
	
	//SCROLL-SPY
	// Cache selectors
	var lastId,
		topMenu = $(".side-navi"),
		topMenuHeight = topMenu.outerHeight(),
		// All list items
		menuItems = topMenu.find("a"),
		// Anchors corresponding to menu items
		scrollItems = menuItems.map(function(){
		  var item = $($(this).attr("href"));
		  if (item.length) { return item; }
		});
	
	// Bind to scroll
	$(window).scroll(function(){
	   // Get container scroll position
	   var fromTop = $(this).scrollTop()+topMenuHeight;
	   
	   // Get id of current scroll item
	   var cur = scrollItems.map(function(){
		 if ($(this).offset().top < fromTop)
		   return this;
	   });
	   // Get the id of the current element
	   cur = cur[cur.length-1];
	   var id = cur && cur.length ? cur[0].id : "";
	   
	   if (lastId !== id) {
		   lastId = id;
		   // Set/remove active class
		   menuItems
			 .parent().removeClass("current")
			 .end().filter("[href=#"+id+"]").parent().addClass("current");
	   }
	});
	////////////////////////////////////////////////////////////////////
	
	
	//Enable Touch / swipe events for carousel 
	$(".carousel-inner").swipe( {
		//Generic swipe handler for all directions
		swipeRight:function(event, direction, distance, duration, fingerCount) {
			$(this).parent().carousel('prev'); 
		},
		swipeLeft: function() {
			$(this).parent().carousel('next'); 
		},
		//Default is 75px, set to 0 for demo so any distance triggers swipe
		threshold:0
	});
	
	/*Adding Placeholder Support in Older Browsers*/
	$('input, textarea').placeholder();
	
	/*Gallery Plugin Initializing*/
	Grid.init();
	
	/*Tooltips*/
	$('.tooltipped').tooltip();
	
	/*Login Form Validation*/
	$('.login-form').validate();
	
	/*Subscriptions Form Validation*/
	$('.subscribe-form').validate();

	/*Feedback Form Validation*/
	$('.feedback-form').validate();
	

////////////////////////////*APPLICATION WIZARD*/////////////////////////

	/*Application Wizard Form Validation*/
	var wizardForm = $('.wizard-form');
	wizardForm.validate({
		rules: {
    phone: {
      required: true,
      number: true
    },
		security: {
      required: true,
      number: true
    }
  }	
	});
	
	/*Cashing variables*/
	var prevTab = $('.prev-tab');
	var nextTab = $('.next-tab');
	var submitWiz = $('#submit-wizard');
	var tabLink = $('.tab-links > .tab-link');
	var stepLink = $('.progress-bar > .step-link');
	
	/*Steps*/
	stepLink.click(function(){
		stepLink.removeClass('current');
		$(this).addClass('current');
	});
	
	/*Tabs (inside each step)*/
	tabLink.click(function(){
		tabLink.removeClass('active');
		$(this).addClass('active');
		if($(this).index() == 0) {
			prevTab.addClass('hidden');
		} else {
			prevTab.removeClass('hidden');
		}
	});
	
	nextTab.on('click', function (e) {
			moveTab("Next");
			e.preventDefault();
	});
	prevTab.on('click', function (e) {
			moveTab("Previous");
			e.preventDefault();
	});
	
	function moveTab(nextOrPrev) {
			var currentTab = "";
			tabLink.each(function () {
					if ($(this).hasClass('active')) {
							currentTab = $(this);
							return false;
					}
			});
			
			var currentStep = "";
			stepLink.each(function () {
					if ($(this).hasClass('current')) {
							currentStep = $(this);
							return false;
					}
			});
			
			if (nextOrPrev == "Next" && wizardForm.valid() == true) {
					
					if (currentTab.next().length) 
					{
						currentTab.removeClass('active');
						currentTab.next().addClass('active').find('a').trigger('click');
					}
					else {
						if (currentStep.next().length) 
						{
							currentStep.removeClass('current').addClass('complete');
							currentStep.next().addClass('current').trigger('click');
							var curStepId = currentStep.next().attr('href');
							$(curStepId + ' .tab-links>.tab-link:first').addClass('active').find('a').trigger('click');
						} else {
							nextTab.addClass('hidden');
							prevTab.addClass('hidden');
							submitWiz.removeClass('hidden');
						}
					} 
	
			} else if(nextOrPrev == "Previous"){
	
					if (currentTab.prev().length) 
					{
						currentTab.removeClass('active');
						currentTab.prev().addClass('active').find('a').trigger('click');
					}
					else {
					} //do nothing for now 
	
			} else{
				return false;
				}
	}	
	
	
///////////////////////////////////*CHARTS*/////////////////////////////

	//////////*Line Chart*///////////
	var lineChartData = {
		labels : ["NOV","DEC","JAN","FEB","MAR","APR"],
		datasets : [
			{
				fillColor : "rgba(220,220,220,0)",
				strokeColor : "rgba(255,111,105,1)",
				pointColor : "rgba(49,52,71,1)",
				pointStrokeColor : "#fff",
				data : [68,58,91,80,37,53]
			},
			{
				fillColor : "rgba(151,187,205,0)",
				strokeColor : "rgba(49,52,71,1)",
				pointColor : "rgba(255,111,105,1)",
				pointStrokeColor : "#fff",
				data : [28,48,40,19,96,27]
			}
		]
	}
	$('#lineChart').waypoint(function() {
		var lineChart = new Chart(document.getElementById("lineChart").getContext("2d")).Line(lineChartData);
	}, { offset: '75%', triggerOnce: true });
	
	
	//////////*Bar Chart*///////////
	var barChartData = {
	labels : ["NOV","DEC","JAN","FEB","MAR","APR"],
		datasets : [
			{
				fillColor : "rgba(255,111,105,0.5)",
				strokeColor : "rgba(255,111,105,1)",
				data : [65,59,90,81,56,55]
			},
			{
				fillColor : "rgba(49,52,71,0.5)",
				strokeColor : "rgba(49,52,71,1)",
				data : [28,70,40,19,27,100]
			}
		]
	}
	$('#barChart').waypoint(function() {
		var barChart = new Chart(document.getElementById("barChart").getContext("2d")).Bar(barChartData);
	}, { offset: '75%', triggerOnce: true });
	
	
	//////////*Pie Chart*///////////
		var pieChartData = [
		{
			value: 20,
			color:"#ff6f69"
		},
		{
			value : 25,
			color : "#e7e7ea"
		},
		{
			value : 40,
			color : "#313447"
		},
		{
			value : 15,
			color : "#ffad10"
		}			
	]

	$('#pieChart').waypoint(function() {
		var barChart = new Chart(document.getElementById("pieChart").getContext("2d")).Pie(pieChartData);
		$('.animated-legend').addClass('fadeInRight')
	}, { offset: '75%', triggerOnce: true });
	
	
	//////////*Doughnut Chart*///////////
		var doughnutChartData = [
		{
			value: 20,
			color:"#ff6f69"
		},
		{
			value : 25,
			color : "#e7e7ea"
		},
		{
			value : 40,
			color : "#313447"
		},
		{
			value : 15,
			color : "#ffad10"
		}			
	]

	$('#doughnutChart').waypoint(function() {
		var barChart = new Chart(document.getElementById("doughnutChart").getContext("2d")).Doughnut(doughnutChartData);
		$('.animated-legend').addClass('fadeInRight')
	}, { offset: '75%', triggerOnce: true });
	
});/*/Document ready*/


