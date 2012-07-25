steal("funcunit").then(function() {
	module("consultant", {
		setup : function() {
			S.open('../consultant.html');
		}
	});

	test("insert", function() {
		S(".add").is(":visible");
		S(".add").click();
		S(".name").is(":visible");
		var name="Test name";
		S(".name").type(name);
		S(".lname").type("Test lname");
		S(".fc").type("Test fc");
		S(".save").click();
		S(".search > .val").type("test");
		S(".search > .search").click(function() {
			S.wait(100, function(){
				  equals( S(".consultant").last().find(":first").html(), 
						  "Test name", "Consulente appena inserito trovato");
				});
		});
	});
	
	test("revise", function() {
		S(".search > .val").type("test");
		S(".search > .search").click();
		S.wait(500, function(){
			S(".consultant").last().find(".modify").click();
			S(".name").is(":visible");
			S(".name").type(" 2");
			S(".save").click();
			S.wait(500, function(){
				equals( S(".consultant").last().find(":first").html(), 
					  "Test name 2", "Consulente modificato");
			});
		});
	});
	
	test("delete", function() {
		S(".search > .val").type("test");
		S(".search > .search").click();
		S.wait(500, function(){
			var cnt=S(".consultant").size();
			S(".consultant").last().find(".destroy").is(":visible");
			S(".consultant").last().find(".destroy").click();
			S(".consultant").size(cnt-1, null, null, "Eliminazione di un consulente");
		});
	});
	
});