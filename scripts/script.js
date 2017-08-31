$(document).ready(function(){
	$.ajax({
		type: "GET",
		url: "http://api.openweathermap.org/data/2.5/weather?q=Gdynia&APPID=b1c1023185273553b424682ce98c6144&mode=xml&cnt=2&units=metric",
		dataType: "xml",
   	    success: firstPage
	});

	$('#submit').click(function(){
		let city = $('#getCity').val();
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
		}else{
			 if($(".alert-info").length){
			 	 $(".alert-info").remove();
				 $(".down:eq(0)").append("<h6 class='alert alert-info bg-danger text-warning'>Nie ma takiego miasta</h6>");
				 $(".alert-info").fadeOut(3000);
			 }else{
			 	 $(".down:eq(0)").append("<h6 class='alert alert-info bg-danger text-warning'>Nie ma takiego miasta</h6>");
				 $(".alert-info").fadeOut(3000);
			 }
		}
	})

});

function firstPage(xml) {
	$(xml).find("current").each(function () {
		let city = $(this).find('city').attr('name');
	    $(".up:eq(0)").append("<h5 id='city'>"+ city +"</h5>");
	    let sunRise = $(this).find('sun').attr('rise');
	    $(".up:eq(0)").append("<h6 id='sunRise'>sun rise: "+sunRise+"</h6>");
	    let sunSet = $(this).find('sun').attr('set');
	    $(".up:eq(0)").append("<h6 id='sunSet'>sun set: "+sunSet+"</h6>");
	    let temperature = $(this).find('temperature').attr('value');
	    $(".up:eq(0)").append("<h6 id='temperature'>temperature: "+temperature+"&#8451;</h6>");
	    let humidity  = $(this).find('humidity').attr('value');
	    $(".up:eq(0)").append("<h6 id='humidity'>humidity: "+humidity+"%</h6>");
	    let pressure  = $(this).find('pressure').attr('value');
	    $(".up:eq(0)").append("<h6 id='pressure'>pressure: "+pressure+"hpa</h6>");
	    let wind  = $(this).find('wind').find('direction').attr('name');
	    $(".up:eq(0)").append("<h6 id='wind'>wind: "+wind+"</h6>");
	    let clouds   = $(this).find('clouds').attr('name');
	    $(".up:eq(0)").append("<h6 id='clouds'>clouds: "+clouds+"</h6>");
	 });

}

function changeFirstPage(xml){
	$(xml).find("current").each(function () {
		let city = $(this).find('city').attr('name');
	    $(".up:eq(0) > #city").text(city);
	    let sunRise = $(this).find('sun').attr('rise');
	    $(".up:eq(0) > #sunRise").text('sun rise: '+sunRise);
	    let sunSet = $(this).find('sun').attr('set');
	    $(".up:eq(0) > #sunSet").text('sun set: '+sunSet);
	    let temperature = $(this).find('temperature').attr('value');
	    $(".up:eq(0) > #temperature").html('temperature: '+temperature+"&#8451;");
	    let humidity  = $(this).find('humidity').attr('value');
	    $(".up:eq(0) > #humidity").text('humidity: '+humidity+"%");
	    let pressure  = $(this).find('pressure').attr('value');
	    $(".up:eq(0) > #pressure").text('pressure: '+pressure+'hpa');
	    let wind  = $(this).find('wind').find('direction').attr('name');
	    $(".up:eq(0) > #wind").text('wind: '+wind);
	    let clouds   = $(this).find('clouds').attr('name');
	    $(".up:eq(0) > #clouds").text('clouds: '+clouds);
	 });
}
