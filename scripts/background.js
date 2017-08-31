let json1 = json();

var cities = [];

for (i in json1)
{
  cities.push(json1[i]);
}

function json() {
	let json = null;
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