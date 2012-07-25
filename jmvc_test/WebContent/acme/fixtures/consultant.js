steal('jquery/class',
      'jquery/dom/fixture',
      function($){

	var LASTID = 3;
	var DATA = [ {
		id : 1,
		name : "Pinco",
		lname: "Pallino",
		fc	 : "PPL123CVB"
	}, {
		id : 2,
		name : "Paolino",
		lname: "Paperino",
		fc	 : "PAOPAP456"
	}, {
		id : 3,
		name : "Paolo",
		lname: "Rossi",
		fc	 : "PAOROS333"
	}, {
		id : 4,
		name : "Dante",
		lname: "Alighieri",
		fc	 : "DANALI848"
	}		, {
		id : 5,
	name : "Alessandro",
		lname: "Manzoni",
		fc	 : "ALEMAN555"
}];
	
	// findAll
$.fixture("GET /consultants", function(){
  return [DATA];
});

// findOne
$.fixture("GET /consultants/{id}", function(orig){
  return DATA[(+orig.data.id)-1];
})

// create
$.fixture("POST /consultants", function(){
	return {id: (++LASTID)};
})

// update
$.fixture("PUT /consultants/{id}", function(){
  return {};
})

// destroy
$.fixture("DELETE /consultants/{id}", function(){
  return {};
})
}
);