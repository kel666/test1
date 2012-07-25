steal('jquery/class', 'jquery/controller', 'jquery/model', 'jquery/view/ejs',
		'helloworld/fixture.js').
then('helloworld/helloworld.ejs', function($) {
			// ------------------ MODEL ---------------------------------------
			$.Model('HelloWorld', {
				findAll : "GET /hello",
				findOne : "GET /hello/{id}",
				create : "POST /hello",
				update : "PUT /hello/{id}",
				destroy : "DELETE /hello/{id}",
				// find index of a disc inside the data array
				indexOf : function(id) {
					for (d in HelloWorld.HELLO) {
						if ((HelloWorld.HELLO[d])
								&& (HelloWorld.HELLO[d].id == id))
							return d;
					}
					return -1;
				},
				LASTID : 2,
				HELLO : [ {
					id : 1,
					name : "Gino"
				}, {
					id : 2,
					name : "Pino"
				} ]
			}, {});

			// ------------------ BINDINGS
			// use bind to simulate insert/update/delete
			HelloWorld.bind('created', function(ev, hello) {
				steal.dev.log("Name added: " + hello.name);
				HelloWorld.HELLO.push({
					id : hello.id,
					name : hello.name
				});
			});
			HelloWorld.bind('updated', function(ev, hello) {
				steal.dev.log("Name updated: " + hello.name);
				var ix = HelloWorld.indexOf(hello.id);
				if (ix != -1)
					HelloWorld.HELLO[ix].name = hello.attr("name");
			});
			HelloWorld.bind('destroyed', function(ev, hello) {
				steal.dev.log("Name destroyed: " + hello.name);
				var ix = HelloWorld.indexOf(hello.id);
				if (ix != -1)
					HelloWorld.HELLO[ix] = null;
			});

			// ------------------ LIST CONTROLLER ----------------------
			$.Controller("HelloList", {
				init : function(element, options) {
					this.element.html('helloworld', HelloWorld.findAll());
				},
				"li click" : function(element, event) {
					console.log("You clicked "+element.model().attr("id"));
				},
				"li .delete click": function(element, event) {
					var li=element.closest(".hello_world");
					li.model().destroy();
					event.stopPropagation();
				},
				"{HelloWorld} destroyed" : function(HelloWorld, ev, destroyedHello) {
					destroyedHello.elements(this.element).remove();
				}
			});

			new HelloList("#hello", {});
			
		});