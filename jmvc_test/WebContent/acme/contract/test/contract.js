steal("funcunit").then(function() {
	module("contract", {
		setup : function() {
			S.open('../contract.html');
		}
	});

	test("insert", function() {
		S(".add").is(":visible");
		S(".add").click();
		S(".name").is(":visible");
		S(".code").type("TEST1");
		S(".customer").type("Customer test");
		S(".date").type("29/02/2012");
		S(".save").click();
		S.wait(100, function(){
			  equal( S(".contract").last().find(":first").html(), 
					  "TEST1", "Contratto corretto inserito");
			});
	});

	test("datecheck1", function() {
		S(".add").is(":visible");
		S(".add").click();
		S(".name").is(":visible");
		S(".code").type("TESTDATE1");
		S(".customer").type("Customer test");
		S(".date").type("fail date");
		S(".save").click();
		S.wait(200, function(){
			  notEqual( S(".contract").last().find(":first").html(), 
					  "TESTDATE1", "Controllo data 1 funzionante");
			  S(".date").type("29/02/2011");
				S(".save").click();
				S.wait(200, function(){
					  notEqual( S(".contract").last().find(":first").html(), 
							  "TESTDATE1", "Controllo data 2 funzionante");
				});
			});
	});
	
	test("revise", function() {
		S(".contract").last().find(".modify").click();
		S(".customer").is(":visible");
		S(".customer").type(" 2");
		S(".save").click();
		S.wait(500, function(){
			equals( S(S(".contract").last().children()[1]).html(), 
				  "Customer test 2", "Contratto modificato");
		});
	});
	
	test("delete", function() {
		var cnt=S(".contract").size();
		S(".contract").last().find(".destroy").is(":visible");
		S(".contract").last().find(".destroy").click();
		S.wait(500, function(){
			S(".contract").size(cnt-1, null, null, "Eliminazione di un contratto");
		});
	});
});