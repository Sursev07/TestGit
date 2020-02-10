 AOS.init({
 	duration: 800,
 	easing: 'slide',
 	once: false
 });

jQuery(document).ready(function($) {

	"use strict";
	// $("#header").load("./layout/header.html"); 
    // $("#mlogin").load("./modal/modallogin.html");
    // $("#mtodo").load("./modal/modaltodo.html");
	var token = window.localStorage.getItem('access_token');
	var username = window.localStorage.getItem('username');
	if(token)
	{
		$('#uname').val(username);
		afterLogin();
	}

	// $('body').on('click', 'a[data-toggle="modal"]', function(e) {
	// 	e.preventDefault;
	// 	modalUpdate();
	// 	$('#modalUpdateToDoForm').modal('show');
	// });

	//datepicker
	var date_input=$('#datepick'); //our date input has the name "date"
      var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
      var options={
        format: 'yyyy/mm/dd',
        container: container,
        todayHighlight: true,
        autoclose: true,
      };
      date_input.datepicker(options);

	// $(".loader").delay(1000).fadeOut("slow");
 //  $("#overlayer").delay(1000).fadeOut("slow");	
	var siteMenuClone = function() {

		$('.js-clone-nav').each(function() {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});


		setTimeout(function() {
			
			var counter = 0;
      $('.site-mobile-menu .has-children').each(function(){
        var $this = $(this);
        
        $this.prepend('<span class="arrow-collapse collapsed">');

        $this.find('.arrow-collapse').attr({
          'data-toggle' : 'collapse',
          'data-target' : '#collapseItem' + counter,
        });

        $this.find('> ul').attr({
          'class' : 'collapse',
          'id' : 'collapseItem' + counter,
        });

        counter++;

      });

    }, 1000);

		$('body').on('click', '.arrow-collapse', function(e) {
      var $this = $(this);
      if ( $this.closest('li').find('.collapse').hasClass('show') ) {
        $this.removeClass('active');
      } else {
        $this.addClass('active');
      }
      e.preventDefault();  
      
    });

		$(window).resize(function() {
			var $this = $(this),
				w = $this.width();

			if ( w > 768 ) {
				if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		})

		$('body').on('click', '.js-menu-toggle', function(e) {
			var $this = $(this);
			e.preventDefault();

			if ( $('body').hasClass('offcanvas-menu') ) {
				$('body').removeClass('offcanvas-menu');
				$this.removeClass('active');
			} else {
				$('body').addClass('offcanvas-menu');
				$this.addClass('active');
			}
		}) 

		// click outisde offcanvas
		$(document).mouseup(function(e) {
	    var container = $(".site-mobile-menu");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
	    }
		});
	}; 
	siteMenuClone();


	var sitePlusMinus = function() {
		$('.js-btn-minus').on('click', function(e){
			e.preventDefault();
			if ( $(this).closest('.input-group').find('.form-control').val() != 0  ) {
				$(this).closest('.input-group').find('.form-control').val(parseInt($(this).closest('.input-group').find('.form-control').val()) - 1);
			} else {
				$(this).closest('.input-group').find('.form-control').val(parseInt(0));
			}
		});
		$('.js-btn-plus').on('click', function(e){
			e.preventDefault();
			$(this).closest('.input-group').find('.form-control').val(parseInt($(this).closest('.input-group').find('.form-control').val()) + 1);
		});
	};
	// sitePlusMinus();


	var siteSliderRange = function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 500,
      values: [ 75, 300 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );
	};
	// siteSliderRange();


	

	var siteCarousel = function () {
		if ( $('.nonloop-block-13').length > 0 ) {
			$('.nonloop-block-13').owlCarousel({
		    center: false,
		    items: 1,
		    loop: true,
				stagePadding: 0,
		    margin: 0,
		    smartSpeed: 1000,
		    autoplay: true,
		    nav: true,
				navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
		    responsive:{
	        600:{
	        	margin: 0,
	        	nav: true,
	          items: 2
	        },
	        1000:{
	        	margin: 0,
	        	stagePadding: 0,
	        	nav: true,
	          items: 2
	        },
	        1200:{
	        	margin: 0,
	        	stagePadding: 0,
	        	nav: true,
	          items: 3
	        }
		    }
			});
		}

		let owl2 = $('.slide-one-item-alt-text').owlCarousel({
	    center: false,
	    items: 1,
	    loop: true,
			stagePadding: 0,
	    margin: 0,
	    smartSpeed: 1000,
	    autoplay: true,
	    pauseOnHover: true,
	    onDragged: function(event) {
	    	console.log('event : ',event.relatedTarget['_drag']['direction'])
	    	if ( event.relatedTarget['_drag']['direction'] == 'left') {
	    		$('.owl-1').trigger('next.owl.carousel');
	    	} else {
	    		$('.owl-1').trigger('prev.owl.carousel');
	    	}
	    }
	  });

		let owl = $('.owl-1').owlCarousel({
			// animateOut: 'fadeOut',
			center: true,
			items: 1,
			loop: true,
			margin: 0,
			smartSpeed: 1500,
			dots: true,
	    autoplay: true,
	    pauseOnHover: false,
	    onDragged: function(event) {
	    	console.log('event : ',event.relatedTarget['_drag']['direction'])
	    	if ( event.relatedTarget['_drag']['direction'] == 'left') {
	    		$('.slide-one-item-alt-text').trigger('next.owl.carousel');
	    	} else {
	    		$('.slide-one-item-alt-text').trigger('prev.owl.carousel');
	    	}
	    }
		})

		$( '.owl-dot' ).on( 'click', function() {
		  console.log(owl2.trigger('to.owl.carousel', $(this).index()));
		})




		$('.owl-2').owlCarousel({
			animateOut: 'fadeOut',
			center: true,
			items: 1,
			loop: true,
			margin: 0,
			smartSpeed: 1500,
	    autoplay: true,
	    pauseOnHover: false
		});
		$('.owl-3').owlCarousel({
			animateOut: 'fadeOut',
			center: true,
			items: 1,
			loop: true,
			margin: 0,
			smartSpeed: 1500,
	    autoplay: true,
	    pauseOnHover: false
		})

		$('.slide-one-item').owlCarousel({
	    center: false,
	    items: 1,
	    loop: true,
			stagePadding: 0,
	    margin: 0,
	    smartSpeed: 1500,
	    autoplay: true,
	    pauseOnHover: false,
	    dots: true,
	    nav: false,
	    navText: ['<span class="icon-keyboard_arrow_left">', '<span class="icon-keyboard_arrow_right">']
	  });


	  

	  $('.slide-one-item-alt').owlCarousel({
	    center: false,
	    items: 1,
	    loop: true,
			stagePadding: 0,
	    margin: 0,
	    smartSpeed: 1000,
	    autoplay: true,
	    pauseOnHover: true,
	    onDragged: function(event) {
	    	console.log('event : ',event.relatedTarget['_drag']['direction'])
	    	if ( event.relatedTarget['_drag']['direction'] == 'left') {
	    		$('.slide-one-item-alt-text').trigger('next.owl.carousel');
	    	} else {
	    		$('.slide-one-item-alt-text').trigger('prev.owl.carousel');
	    	}
	    }
	  });

	  if ( $('.owl-all').length > 0 ) {
			$('.owl-all').owlCarousel({
		    center: false,
		    items: 1,
		    loop: false,
				stagePadding: 0,
		    margin: 0,
		    autoplay: false,
		    nav: false,
		    dots: true,
		    touchDrag: true,
  			mouseDrag: true,
  			smartSpeed: 1000,
				navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
		    responsive:{
	        768:{
	        	margin: 30,
	        	nav: false,
	        	responsiveRefreshRate: 10,
	          items: 1
	        },
	        992:{
	        	margin: 30,
	        	stagePadding: 0,
	        	nav: false,
	        	responsiveRefreshRate: 10,
	        	touchDrag: false,
  					mouseDrag: false,
	          items: 3
	        },
	        1200:{
	        	margin: 30,
	        	stagePadding: 0,
	        	nav: false,
	        	responsiveRefreshRate: 10,
	        	touchDrag: false,
  					mouseDrag: false,
	          items: 3
	        }
		    }
			});
		}
		
	};
	siteCarousel();

	

	var siteCountDown = function() {

		$('#date-countdown').countdown('2020/10/10', function(event) {
		  var $this = $(this).html(event.strftime(''
		    + '<span class="countdown-block"><span class="label">%w</span> weeks </span>'
		    + '<span class="countdown-block"><span class="label">%d</span> days </span>'
		    + '<span class="countdown-block"><span class="label">%H</span> hr </span>'
		    + '<span class="countdown-block"><span class="label">%M</span> min </span>'
		    + '<span class="countdown-block"><span class="label">%S</span> sec</span>'));
		});
				
	};
	// siteCountDown();

	var siteDatePicker = function() {

		if ( $('.datepicker').length > 0 ) {
			$('.datepicker').datepicker();
		}

	};
	// siteDatePicker();

	var siteSticky = function() {
		$(".js-sticky-header").sticky({topSpacing:0});
	};
	siteSticky();

	// navigation
  var OnePageNavigation = function() {
    var navToggler = $('.site-menu-toggle');

   	$("body").on("click", ".main-menu li a[href^='#'], .smoothscroll[href^='#'], .site-mobile-menu .site-nav-wrap li a[href^='#']", function(e) {
      e.preventDefault();

      var hash = this.hash;

      $('html, body').animate({
        'scrollTop': $(hash).offset().top - 50
      }, 600, 'easeInOutExpo', function() {
        // window.location.hash = hash;

      });

    });
  };
  OnePageNavigation();

  var siteScroll = function() {

  	

  	$(window).scroll(function() {

  		var st = $(this).scrollTop();

  		if (st > 100) {
  			$('.js-sticky-header').addClass('shrink');
  		} else {
  			$('.js-sticky-header').removeClass('shrink');
  		}

  	}) 

  };
  siteScroll();


  var counter = function() {
		
		$('#about-section').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.number > span').each(function(){
					var $this = $(this),
						num = $this.data('number');
					$this.animateNumber(
					  {
					    number: num,
					    numberStep: comma_separator_number_step
					  }, 7000
					);
				});
				
			}

		} , { offset: '95%' } );

	}
	counter();

	//add todo
	$( '#add-todo' ).on( 'click', function() {
		addToDo();
	})

	$('#login-default').click(function(){
		var username = $('#username').val();
		var password = $('#password').val();
		login(username, password);
	});

	$('.log-out').click(function(){
		var auth2 = gapi.auth2.getAuthInstance();
		logout();
		if(auth2)
		{
			auth2.signOut().then(function () {
				console.log('User signed out.');
				});
		}
		else 
		{
			logout();
		}
		
		$('.login-btn').show();
		$('.log-out').hide();
		$('.username').hide();
		$('#what-ido').hide();
		$('#landing-todo').hide();
	});

	$('#update-todo').click(function(){
		updateToDo();
	})


});


function imgError(image) {
    image.onerror = "";
    image.src = "fonts/flaticon/svg/1.svg";
    return true;
}

function getTodo(username)
{
	
	var token = 'Bearer '+window.localStorage.getItem('access_token');
	$.ajax({
		type: "GET",
		url: 'http://localhost:3000/todos',
		//data: $(this).serialize(),
		headers: {"Authorization": token},//localStorage.getItem('token')},
		success: function(response)
		{
			console.log(response);
			$('#todo-list').empty();
			var i =1;
			$.each(response,function(id,results){
				var imageId = i + '.svg';
				$('#todo-list').append('<div class="col-md-6 mb-4 col-lg-4" data-aos="fade-up" data-aos-delay="">\
				<div class="service-29193 text-center">\
				  <span class="img-wrap mb-5">\
					<img src="fonts/flaticon/svg/'+imageId +'" onerror="imgError(this);" alt="Image" class="img-fluid">\
				  </span>\
				  <h3 class="mb-4"><a href="#">'+results.title+'</a></h3>\
				  <p>'+results.description+'</p>\
				  <input type="hidden" id="todoId'+results.id+'" value="'+results.id+'">\
				  <p><a href="" data-toggle="modal" onclick="modalUpdate('+results.id+')" class="nav-link login-btn"><i class="fa fa-edit">Edit</i></a><p>\
				  <p>'+ new Date(results.due_date).toDateString('dd/mm/yyyy')+'</p>\
				</div>\
				</div>'
				);
				i++;

			});
	   }
   });
}

function addToDo()
{
	var title = $('#todo-title').val();
	var description = $('#todo-description').val();
	var dueDate = $('#todo-date').val();
	var token = 'Bearer '+window.localStorage.getItem('access_token');
	$.ajax({
		type: "POST",
		url: 'http://localhost:3000/todos',
		data: {title:title, description: description, due_date:dueDate},
		headers: {"Authorization": token},//localStorage.getItem('token')},
		success: function(response)
		{
			$('#modalAddToDOForm').hide();
			getTodo($('#uname').val());
	   }
   });
}

function modalUpdate(id)
{
	//var id = $('#todoId').val();
	var token = 'Bearer '+window.localStorage.getItem('access_token');
	$.ajax({
		type: "GET",
		url: 'http://localhost:3000/todos/'+ id,
		//data: {title:title, description: description, due_date:dueDate},
		headers: {"Authorization": token},//localStorage.getItem('token')},
		success: function(response)
		{
			$('#t-title').val(response.title);
			$('#t-description').val(response.description);
			$('#t-date').val(new Date(response.due_date).toLocaleDateString());
			$('#update-todo').attr('onClick', 'updateToDo('+id+')')
	   }
   });

   $('#modalUpdateToDoForm').modal('show');
}

function updateToDo(id)
{
	var title = $('#t-title').val();
	var description = $('#t-description').val();
	var dueDate = $('#t-date').val();
	var token = 'Bearer '+window.localStorage.getItem('access_token');

	//ev.preventDefault(); // to stop the form from submitting
        // var csrftoken = $("meta[name='_csrf']").attr("content");
        // var paramName = $("meta[name='_csrf_parameter_name']").attr("content");
        // $('<input>').attr('type', 'hidden').attr('name', paramName).attr('value', csrftoken).appendTo('#modalUpdateToDoForm');
	$.ajax({
		type: "PUT",
		url: 'http://localhost:3000/todos/'+ id,
		data: {title:title, description: description, due_date:dueDate},
		headers: {"Authorization": token},//localStorage.getItem('token')},
		success: function(response)
		{
			$('#modalUpdateToDoForm').modal('hide');
			$('.modal-backdrop').hide();
			$('#todo-list').empty();
			getTodo($('#uname').val());
	   }
   });
}

function onSignIn(googleUser) {
    
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    // $('.profile').attr('src', profile.getImageUrl());
    var id_token = googleUser.getAuthResponse().id_token;
	console.log("ID Token: " + id_token);
	$('#uname').val(profile.getName());
	afterLogin();
	
}

function afterLogin()
{
	$('#modalLoginForm').hide();
	$('.modal-backdrop').hide();
    $('.login-btn').hide();
	$('.log-out').show();
	$('.username').text($('#uname').val());
	$('.username').show();
	$('#what-ido').show();
	$('#landing-todo').show();
	getTodo($('#uname').val());
}

function login(username, password)
{
	$.ajax({
		type: "POST",
		url: 'http://localhost:3000/user/login',
		data: {username:username, password: password},
		//headers: {  'Access-Control-Allow-Origin': 'http://localhost:3000' },
		 crossDomain: true,
		success: function(response)
		{
			console.log(response.username);
			window.localStorage.setItem('access_token', response.accessToken);
			window.localStorage.setItem('username', response.username);
			
			$('#uname').val(window.localStorage.getItem('username'));
			afterLogin();
			//$('.username').text('('+profile.getName()+')');
	   },
	   error: function(XMLHttpRequest, textStatus, errorThrown) {
		console.log(textStatus, errorThrown);
		}
   });
}

function logout()
{
	window.localStorage.removeItem("access_token");
	window.localStorage.removeItem("username");
}