steal('jquery/class', 'acme/globalize.js').then('acme/cultures/globalize.culture.it.js', 
		function($) {
	Globalize.culture( "it" );
	$.EJS.Helpers.prototype.formatDate = function(params) {
		return Globalize.format(params, 'd');
	};
});