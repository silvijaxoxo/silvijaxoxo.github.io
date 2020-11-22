var source   = $("#screenshots-template").html();
var screenshots_template = Handlebars.compile(source);

source = $("#carousel-template").html();
var carousel_template = Handlebars.compile(source);

var screenshots_html = screenshots_template(data);
$('#screenshots-content').html(screenshots_html);

screenshots_html = carousel_template(data);
$('#carousel-content').html(screenshots_html);
