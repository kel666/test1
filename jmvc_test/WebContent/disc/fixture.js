steal('jquery/class',
      'jquery/dom/fixture',
      function($){
// findAll
$.fixture("GET /discs", function(){
  return [Disc.DISCS];
});

// findOne
$.fixture("GET /discs/{id}", function(orig){
  return Disc.DISCS[(+orig.data.id)-1];
})

// create
$.fixture("POST /discs", function(){
	return {id: (++Disc.LASTID)};
})

// update
$.fixture("PUT /discs/{id}", function(){
  return {};
})

// destroy
$.fixture("DELETE /discs/{id}", function(){
  return {};
})
}
);

