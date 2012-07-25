steal(	'acme/acme.css',
	'jquery/class', 'jquery/controller', 'acme/models/consultant.js', 'jquery/view/ejs', 
		'acme/consultant/consultant_list.js','acme/consultant/consultant_detail.js',
		'acme/consultant/consultant_search.js',
		function($) {
			/*
			// use bind to simulate insert/update/delete
			Consultant.bind('created', function(ev, consultant) {
				steal.dev.log("Consultant created: "+consultant.name);
				Consultant.DATA.push({
					id : consultant.id,
					name : consultant.name,
					lname: consultant.lname,
					fc : consultant.fc
				});
			});
			Consultant.bind('updated', function(ev, consultant) {
				steal.dev.log("Consultant  updated: "+consultant.name);
				var ix = Consultant.indexOf(consultant.id);
				if (ix != -1)
					Consultant.DATA[ix].name = consultant.attr("name");
			});
			Consultant.bind('destroyed', function(ev, consultant) {
				steal.dev.log("Consultant  destroyed: "+consultant.name);
				var ix = Consultant.indexOf(consultant.id);
				if (ix != -1)
					Consultant.DATA[ix] = null;
			});
			*/
			var editor = new ConsultantEditor("#edit");
			var conslist = new Consultants("#conslist", { detail : editor});
			new Search("#searchbox", { list : conslist });
		});