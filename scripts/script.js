$(document).ready(function(){
	$.ajax({
		type: "GET",
		url: "http://api.openweathermap.org/data/2.5/weather?q=Gdynia&APPID=b1c1023185273553b424682ce98c6144&mode=xml&cnt=2&units=metric",
		dataType: "xml",
   	    success: firstPage
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
		city = city.charAt(0).toUpperCase() + city.substr(1);
		let isCity = false;
		for(i in cities){
			if(cities[i].name == city){
				isCity = true;
				break;
			}
		}
		if(isCity){
			$.ajax({
				type: "GET",
				url: "http://api.openweathermap.org/data/2.5/weather?q="+city+"&APPID=b1c1023185273553b424682ce98c6144&mode=xml&cnt=2&units=metric",
				dataType: "xml",
		   	    success: changeFirstPage
			});

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

});

function firstPage(xml) {
	$(xml).find("current").each(function () {
		let city = $(this).find('city').attr('name');
	    $(".up:eq(0)").append("<h4 id='city'>"+ city +"</h4>");
	    let sunRise = $(this).find('sun').attr('rise');
	    sunRise = sunRise.substr(11,18);
	    $(".up:eq(0)").append("<h6 id='sunRise'>sun rise: "+sunRise.replace('T', " ")+"</h6>");
	    let sunSet = $(this).find('sun').attr('set');
	    sunSet = sunSet.substr(11,18);
	    $(".up:eq(0)").append("<h6 id='sunSet'>sun set: "+sunSet.replace('T', " ")+"</h6>");
	    let temperature = $(this).find('temperature').attr('value');
	    $(".up:eq(0)").append("<h6 id='temperature'>temperature: "+temperature+"&#8451;</h6>");
	    let humidity  = $(this).find('humidity').attr('value');
	    $(".up:eq(0)").append("<h6 id='humidity'>humidity: "+humidity+"%</h6>");
	    let pressure  = $(this).find('pressure').attr('value');
	    $(".up:eq(0)").append("<h6 id='pressure'>pressure: "+pressure+"hpa</h6>");
	    let wind  = $(this).find('wind').find('direction').attr('name');
	    if(wind == ""){
	    	wind  = $(this).find('wind').find('speed ').attr('name');
	    	$(".up:eq(0)").append("<h6 id='wind'>wind: "+wind+"</h6>");
	    }else{
	    	$(".up:eq(0)").append("<h6 id='wind'>wind direction: "+wind+"</h6>");
		}
	    let clouds   = $(this).find('clouds').attr('name');
	    $(".up:eq(0)").append("<h6 id='clouds'>clouds: "+clouds+"</h6>");
	 });

}

function changeFirstPage(xml){
	$(xml).find("current").each(function () {
		let city = $(this).find('city').attr('name');
	    $(".up:eq(0) > #city").text(city);
	    let sunRise = $(this).find('sun').attr('rise');
		sunRise = sunRise.substr(11,18);
	    $(".up:eq(0) > #sunRise").text('sun rise: '+sunRise);
	    let sunSet = $(this).find('sun').attr('set');
	    sunSet = sunSet.substr(11,18);
	    $(".up:eq(0) > #sunSet").text('sun set: '+sunSet);
	    let temperature = $(this).find('temperature').attr('value');
	    $(".up:eq(0) > #temperature").html('temperature: '+temperature+"&#8451;");
	    let humidity  = $(this).find('humidity').attr('value');
	    $(".up:eq(0) > #humidity").text('humidity: '+humidity+"%");
	    let pressure  = $(this).find('pressure').attr('value');
	    $(".up:eq(0) > #pressure").text('pressure: '+pressure+'hpa');
	    let wind  = $(this).find('wind').find('direction').attr('name');
	    if(wind == ""){
	    	wind  = $(this).find('wind').find('speed ').attr('name');
	    	$(".up:eq(0) > #wind").text("wind: "+wind);
	    }else{
	    	$(".up:eq(0) > #wind").text("wind direction: "+wind);
		}
	    let clouds   = $(this).find('clouds').attr('name');
	    $(".up:eq(0) > #clouds").text('clouds: '+clouds);
	 });
}
