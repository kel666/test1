steal('jquery/class', 'jquery/dom/fixture', function($) {
	// findAll
	$.fixture("GET /hello", function() {
		return [ HelloWorld.HELLO ];
	});

	// findOne
	$.fixture("GET /hello/{id}", function(orig) {
		return HelloWorld.HELLO[(+orig.data.id) - 1];
	})

	// create
	$.fixture("POST /hello", function() {
		return {
			id : (++HelloWorld.LASTID)
		};
	})

	// update
	$.fixture("PUT /hello/{id}", function() {
		return {};
	})

	// destroy
	$.fixture("DELETE /helllo/{id}", function() {
		return {};
	})
});
