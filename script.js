$(document).ready(function(){
	$('#submit').click(function(){
		let city = $('#city').val();
		$('#submit').text(city);
	});
});