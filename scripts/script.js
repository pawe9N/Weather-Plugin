$(document).ready(function(){
	$.ajax({
		type: "GET",
		url: "http://api.openweathermap.org/data/2.5/weather?q=Gdynia&APPID=b1c1023185273553b424682ce98c6144&mode=xml&units=metric",
		dataType: "xml",
   	    success: function(xml){
            firstPage(xml);
        }
	});

	$.ajax({
		type: "GET",
		url: "http://api.openweathermap.org/data/2.5/forecast?q=Gdynia&APPID=b1c1023185273553b424682ce98c6144&mode=xml&units=metric&cnt=10",
		dataType: "xml",
   	    success: function(xml){
            secondPageSelect(xml);
        }
	});

	$.ajax({
		type: "GET",
		url: "http://api.openweathermap.org/data/2.5/uvi?appid=b1c1023185273553b424682ce98c6144&lat=54.51889&lon=18.531879",
		dataType: "json",
   	    success: function(data){
            thirdPageUVToday(data, "Gdynia");
        }
	});

    $('.getCity').on("keyup focus mousedown", function(){
    	let submit = $(this).parent().find('.submit');

        $(submit).prop('disabled', this.value == "" ? true : false);     

        if(event.which == 13 &&
		   !$(submit).attr('disabled')){
				$(submit).click();
		}
    });

	$('.submit').click(function(){
		let parent = $(this).parent();
		let city = $(parent).find('.getCity').val();
		let latitude, longitude;
		city = city.charAt(0).toUpperCase() + city.substr(1);
		let isCity = false;
		for(i in cities){
			if(cities[i].name == city){
				isCity = true;
				latitude = cities[i].coord.lat;
				longitude = cities[i].coord.lon;
				break;
			}
		}
		if(isCity){
			$.ajax({
				type: "GET",
				url: "http://api.openweathermap.org/data/2.5/weather?q="+city+"&APPID=b1c1023185273553b424682ce98c6144&mode=xml&units=metric",
				dataType: "xml",
		   	    success: function(xml){
		            changeFirstPage(xml);
		        }
			});

			$.ajax({
				type: "GET",
				url: "http://api.openweathermap.org/data/2.5/forecast?q="+city+"&APPID=b1c1023185273553b424682ce98c6144&mode=xml&units=metric&cnt=10",
				dataType: "xml",
		   	    success: function(xml){
		            changeSecondPageSelect(xml);
		        }
			});

			$.ajax({
				type: "GET",
				url: "http://api.openweathermap.org/data/2.5/uvi?appid=b1c1023185273553b424682ce98c6144&lat="+latitude+"&lon="+longitude,
				dataType: "json",
		   	    success: function(data){
		            changethirdPageUVToday(data, city);
		        }
			});

			if($(this).hasClass("welcomeButton")){
				 $('#carousel').carousel("next");
			}

			$(".getCity").each(function() {
  				$(this).val("");
			});
		}else{
			 let alerts = $(parent).next();
			 if($(".alert-info").length){
			 	 $(".alert-info").remove();
				 $(alerts).append("<h6 class='alert alert-info bg-danger'>City doesn't exist!</h6>");
				 $(".alert-info").fadeOut(3000);
			 }else{
			 	 $(alerts).append("<h6 class='alert alert-info bg-danger'>City doesn't exist!</h6>");
				 $(".alert-info").fadeOut(3000);
			 }
		}
	});

	$(".middle:eq(0) > select").change(function(){
		let city = $(".up:eq(1)").find('#cityS').text();
		let id = $(this).find(":selected").attr("id");

		$.ajax({
				idVariable: id,
				type: "GET",
				url: "http://api.openweathermap.org/data/2.5/forecast?q="+city+"&APPID=b1c1023185273553b424682ce98c6144&mode=xml&units=metric",
				dataType: "xml",
		   	    success: function(xml){
		   	    	let id = this.idVariable;
		            changeShowingWeatherOfSecondPage(xml, id);
		        }
		});
	});
});

function firstPage(xml) {
	let night;

	$(xml).find("current").each(function () {
		let city = $(this).find('city').attr('name');
	    $(".up:eq(0)").append("<h4 id='city'>"+ city +"</h4>");
	    let sunRise = $(this).find('sun').attr('rise');
	    sunRise = sunRise.substr(11,18);
	    $(".up:eq(0)").append("<h6 id='sunRise'>sun rise: "+sunRise.replace('T', " ")+"</h6>");
	    let sunSet = $(this).find('sun').attr('set');
	    sunSet = sunSet.substr(11,18);
	    night = dayTime($(this).find('sun').attr('rise'), $(this).find('sun').attr('set'));
	    $(".up:eq(0)").append("<h6 id='sunSet'>sun set: "+sunSet.replace('T', " ")+"</h6>");
	    let temperature = $(this).find('temperature').attr('value');
	    $(".up:eq(0)").append("<h6 id='temperature'>temperature: "+temperature+"&#8451;</h6>");
	    let humidity  = $(this).find('humidity').attr('value');
	    $(".up:eq(0)").append("<h6 id='humidity'>humidity: "+humidity+"%</h6>");
	    let pressure  = $(this).find('pressure').attr('value');
	    $(".up:eq(0)").append("<h6 id='pressure'>pressure: "+pressure+" hPa</h6>");
	    let wind  = $(this).find('wind').find('direction').attr('name');
	    if(wind == ""){
	    	wind  = $(this).find('wind').find('speed ').attr('name');
	    	$(".up:eq(0)").append("<h6 id='wind'>wind: "+wind+"</h6>");
	    }else{
	    	$(".up:eq(0)").append("<h6 id='wind'>wind direction: "+wind+"</h6>");
		}
	    let clouds = $(this).find('clouds').attr('name');
	    $(".up:eq(0)").append("<h6 id='clouds'>clouds: "+clouds+"</h6>");
	    let weather = $(this).find('weather ').attr('value');
	    $(".up:eq(0)").append("<h6 id='weather'>weather: "+weather+"</h6>");
	    pageImage(weather, night,0);
	 });

}

function changeFirstPage(xml){
	let night;

	$(xml).find("current").each(function () {
		let city = $(this).find('city').attr('name');
	    $(".up:eq(0) > #city").text(city);
	    let sunRise = $(this).find('sun').attr('rise');
		sunRise = sunRise.substr(11,18);
	    $(".up:eq(0) > #sunRise").text('sun rise: '+sunRise);
	    let sunSet = $(this).find('sun').attr('set');
	    sunSet = sunSet.substr(11,18);
	    night = dayTime($(this).find('sun').attr('rise'), $(this).find('sun').attr('set'));
	    $(".up:eq(0) > #sunSet").text('sun set: '+sunSet);
	    let temperature = $(this).find('temperature').attr('value');
	    $(".up:eq(0) > #temperature").html('temperature: '+temperature+"&#8451;");
	    let humidity  = $(this).find('humidity').attr('value');
	    $(".up:eq(0) > #humidity").text('humidity: '+humidity+"%");
	    let pressure  = $(this).find('pressure').attr('value');
	    $(".up:eq(0) > #pressure").text('pressure: '+pressure+' hPa');
	    let wind  = $(this).find('wind').find('direction').attr('name');
	    if(wind == ""){
	    	wind  = $(this).find('wind').find('speed ').attr('name');
	    	$(".up:eq(0) > #wind").text("wind: "+wind);
	    }else{
	    	$(".up:eq(0) > #wind").text("wind direction: "+wind);
		}
	    let clouds = $(this).find('clouds').attr('name');
	    $(".up:eq(0) > #clouds").text('clouds: '+clouds);
	    let weather = $(this).find('weather').attr('value');
	    $(".up:eq(0) > #weather").text('weather: ' + weather);
	    pageImage(weather, night, 0);
	 });
}

function pageImage(weather, night, upIndex){
	let upImage =  $(".up:eq("+upIndex+") > img");
	if(night){
		switch(weather){
			case "scattered clouds": upImage.attr('src', 'images/n_3_M.png'); break;
			case "clear sky": upImage.attr('src', 'images/n_0_M.png'); break;
			case "few clouds": upImage.attr('src', 'images/n_10_M.png'); break;
			case "light rain": upImage.attr('src', 'images/n_5_M.png'); break;
			case "broken clouds": upImage.attr('src', 'images/d_30_M.png'); break;
			case "shower rain": upImage.attr('src', 'images/n_8_M.png'); break;
			case "rain": upImage.attr('src', 'images/n_50_M.png'); break;
			case "thunderstorm": upImage.attr('src', 'images/n_95_M.png'); break;
			case "snow": upImage.attr('src', 'images/n_84_M.png'); break;
			case "mist": upImage.attr('src', 'images/n_40_M.png'); break;
			default: 
				if(weather.includes('thunderstorm')){
					upImage.attr('src', 'images/n_95_M.png');break;
				}else if(weather.includes('drizzle')){
					upImage.attr('src', 'images/n_8_M.png');break;
				}else if(weather.includes('rain')){
					upImage.attr('src', 'images/n_50_M.png');break;
				}else if(weather.includes('snow')){
					 upImage.attr('src', 'images/n_84_M.png');break;
				}else if(weather.includes('clouds')){
					 upImage.attr('src', 'images/n_3_M.png');break;
				}
		}
	}else{
		switch(weather){
			case "scattered clouds": upImage.attr('src', 'images/n_3_M.png'); break;
			case "clear sky": upImage.attr('src', 'images/d_0_M.png'); break;
			case "few clouds": upImage.attr('src', 'images/d_10_M.png'); break;
			case "light rain": upImage.attr('src', 'images/d_5_M.png'); break;
			case "broken clouds": upImage.attr('src', 'images/d_30_M.png'); break;
			case "shower rain": upImage.attr('src', 'images/d_8_M.png'); break;
			case "rain": upImage.attr('src', 'images/d_53_M.png'); break;
			case "thunderstorm": upImage.attr('src', 'images/d_9_M.png'); break;
			case "snow": upImage.attr('src', 'images/d_40_M.png'); break;
			case "mist": upImage.attr('src', 'images/d_5_M.png'); break;
			default: 
				if(weather.includes('thunderstorm')){
					upImage.attr('src', 'images/d_9_M.png');break;
				}else if(weather.includes('drizzle')){
					upImage.attr('src', 'images/d_8_M.png');break;
				}else if(weather.includes('rain')){
					upImage.attr('src', 'images/d_53_M.png');break;
				}else if(weather.includes('snow')){
					upImage.attr('src', 'images/d_40_M.png');break;
				}else if(weather.includes('clouds')){
					 upImage.attr('src', 'images/n_3_M.png');break;
				}
		}
	}
}

function dayTime(sunRise, sunSet){
	let date = new Date();
	let dayTime = date.toISOString();

	if(!(sunRise <= dayTime && sunSet >= dayTime)){
	    return true;
	}else{
		return false;
	}
}

function secondPageSelect(xml){
	$(xml).find("time").each(function (index) {
		let timeFrom = $(this).attr('from').replace("T", " ").substr(5,18);
		let timeTo = $(this).attr('to').replace("T", " ").substr(5,18);
	    $(".middle:eq(0) > select").append("<option id="+index+">From: "+timeFrom+"  To: "+timeTo+"</option>");
	 });
	showingWeatherOfSecondPage(xml, 0);
}

function changeSecondPageSelect(xml){
	$(".middle:eq(0) > select").find('option').remove();
	$(xml).find("time").each(function (index) {
		let timeFrom = $(this).attr('from').replace("T", " ").substr(5,18);
		let timeTo = $(this).attr('to').replace("T", " ").substr(5,18);
	    $(".middle:eq(0) > select").append("<option id="+index+">From: "+timeFrom+"  To: "+timeTo+"</option>");
	 });
	changeShowingWeatherOfSecondPage(xml, 0);
}

function showingWeatherOfSecondPage(xml, index){
	let night = false;

	$(xml).find("location:eq(0)").each(function(){
		 let cityS = $(this).find("name").text();
		 $(".up:eq(1)").append("<h4 id='cityS'>"+ cityS +"</h4>");
	});

	$(xml).find("time:eq("+index+")").each(function(){
	     let weather = $(this).find('symbol').attr('name');
	     $(".up:eq(1)").append("<h6 id='weatherS'>weather: "+ weather +"</h6>");
	     let wind = $(this).find('windSpeed').attr('name');
	     if(wind != undefined && wind != "")
	     	$(".up:eq(1)").append("<h6 id='windS'>wind: "+ wind +"</h6>");
	     let windSpeed = $(this).find('windSpeed').attr('mps');
	     $(".up:eq(1)").append("<h6 id='windSpeedS'>wind Speed: "+ windSpeed +" mps</h6>");
	     let windDirection = $(this).find('windDirection').attr('name');
	     $(".up:eq(1)").append("<h6 id='windDirectionS'>wind direction: "+ windDirection +"</h6>");
	     let temperature = $(this).find('temperature').attr('value');
	     $(".up:eq(1)").append("<h6 id='temperatureS'>temperature: "+ temperature +"&#8451;</h6>");
	     let pressure = $(this).find('pressure').attr('value');
	     $(".up:eq(1)").append("<h6 id='pressureS'>pressure: "+ pressure +" hPa</h6>");
	     let humidity = $(this).find('humidity').attr('value');
	     $(".up:eq(1)").append("<h6 id='humidityS'>humidity: "+ humidity +"%</h6>");
	     let clouds = $(this).find('clouds').attr('value');
	     $(".up:eq(1)").append("<h6 id='cloudsS'>clouds: "+ clouds +"</h6>");
	     pageImage(weather, night, 1);
	});
}

function changeShowingWeatherOfSecondPage(xml, index){
	let night = false;

	$(xml).find("location:eq(0)").each(function(){
		 let cityS = $(this).find("name").text();
		 $(".up:eq(1) > #cityS").html(cityS);
	});

	$(xml).find("time:eq("+index+")").each(function(){		
	     let weather = $(this).find('symbol').attr('name');
	     $(".up:eq(1) > #weatherS").html("weather: "+ weather);
	     let wind = $(this).find('windSpeed').attr('name');
	     if(wind != undefined && wind != "")
	     	$(".up:eq(1) > #windS").html("wind: "+ wind);
	     let windSpeed = $(this).find('windSpeed').attr('mps');
	     $(".up:eq(1) > #windSpeedS").html("wind Speed: "+ windSpeed +" mps");
	     let windDirection = $(this).find('windDirection').attr('name');
	     $(".up:eq(1) > #windDirectionS").html("wind direction: "+ windDirection);
	     let temperature = $(this).find('temperature').attr('value');
	     $(".up:eq(1) > #temperatureS").html("temperature: "+ temperature +"&#8451;");
	     let pressure = $(this).find('pressure').attr('value');
	     $(".up:eq(1) > #pressureS").html("pressure: "+ pressure +" hPa");
	     let humidity = $(this).find('humidity').attr('value');
	     $(".up:eq(1) > #humidityS").html("humidity: "+ humidity +"%");
	     let clouds = $(this).find('clouds').attr('value');
	     $(".up:eq(1) > #cloudsS").html("clouds: "+ clouds);
	     pageImage(weather, night, 1);
	});
}

function thirdPageUVToday(data, city){
    $(".up:eq(2)").append("<h4 id='cityT'>"+ city +"</h4>");
    let date = data.date_iso.replace("T", " ").replace("Z", "").substr(0,10);
    $(".up:eq(2)").append("<h5 id='date'><center>UV index for "+date+"</center></h5>");
	let uvIndex = data.value;
	$(".up:eq(2)").append("<h6 id='uvIndex'>UV index: <span>"+ uvIndex +"</span></h6>");
	changingColorOFUV(uvIndex);
}

function changethirdPageUVToday(data, city){
    $(".up:eq(2) > #cityT").html(city);
    let date = data.date_iso.replace("T", " ").replace("Z", "").substr(0,10);
	$(".up:eq(2) > #date").html("<center>UV index for today "+date+"</center>");
	let uvIndex = data.value;
	$(".up:eq(2) > #uvIndex").html("UV index: <span>"+ uvIndex +"</span>");
	changingColorOFUV(uvIndex);
}

function changingColorOFUV(uvIndex){
	if(uvIndex >= 0 && uvIndex < 3){
		$("#uvIndex").css("color", "green");
	}else if(uvIndex >= 3 && uvIndex < 6){
		$("#uvIndex").css("color", "deepskyblue");
	}else if(uvIndex >= 6 && uvIndex < 8){
		$("#uvIndex").css("color", "blue");
	}else if(uvIndex >= 8 && uvIndex < 11){
		$("#uvIndex").css("color", "#999900");
	}else{
		$("#uvIndex").css("color", "red");
	}
}