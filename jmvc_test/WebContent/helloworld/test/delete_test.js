steal("funcunit").then(function() {

	module("h	elloworld", {
		setup : function() {
			S.open('../helloworld.html');
		}
	});

	test("li deleted", function() {
		S("li").visible(function() {
			var cnt = S("li").size();
			// wait delete
			S("a").first().visible().click();
			// assert
			S("li").size(cnt-1, null, null, "Element destroy test");
			
		});
	});

});