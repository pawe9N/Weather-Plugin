$(document).ready(function(){
	$.ajax({
		type: "GET",
		url: "http://api.openweathermap.org/data/2.5/weather?q=Gdynia&APPID=b1c1023185273553b424682ce98c6144&mode=xml&cnt=2&units=metric",
		dataType: "xml",
   	    success: firstPage
	});

	var json1 = json();
	console.log(json1[0].name)


});

function firstPage(xml) {
	$(xml).find("current").each(function () {
		let city = $(this).find('city').attr('name');
	    $(".up:eq(0) > #city").append(city);
	    let sunRise = $(this).find('sun').attr('rise');
	    $(".up:eq(0) > #sunRise").append(' '+sunRise);
	    let sunSet = $(this).find('sun').attr('set');
	    $(".up:eq(0) > #sunSet").append(' '+sunSet);
	    let temperature = $(this).find('temperature').attr('value');
	    $(".up:eq(0) > #temperature").append(' '+temperature+'&#8451;');
	    let humidity  = $(this).find('humidity').attr('value');
	    $(".up:eq(0) > #humidity").append(' '+humidity+'%');
	    let pressure  = $(this).find('pressure').attr('value');
	    $(".up:eq(0) > #pressure").append(' '+pressure+'hpa');
	    let wind  = $(this).find('wind').find('direction').attr('name');
	    $(".up:eq(0) > #wind").append(' '+wind);
	    let clouds   = $(this).find('clouds').attr('name');
	    $(".up:eq(0) > #clouds ").append(' '+clouds);
	 });

}

function json() {
    var json = null;
    $.ajax({
    	'async': false,
        'global': false,
        url: 'city.list.json',
        dataType: "json",
        success: function (data) {
            json = data;
        }
    });
    return json;
}