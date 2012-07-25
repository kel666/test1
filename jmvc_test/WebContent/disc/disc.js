/*
 * @page index disc 
 * @tag Home
 *
 * Disc database
 *  
 * Gestione dei dischi
 * * elenco dischi
 * * modifica
 * 
 */


steal('jquery/class', 'jquery/controller', 'jquery/model', 'jquery/view/ejs', 
		'jquery/view/jaml',
		'jquery/view/micro',
		'jquery/view/tmpl',
		'disc/disc.css',
		'disc/fixture.js',
		function($) {
	/*  
	 * @class Disc 
	 * @parent index 
	 * @constructor
	 * Creates a new disc.
	 */
	$.Model('Disc', {
				/*
				* @static
				*/
				findAll : "GET /discs",
				findOne : "GET /discs/{id}",
				create : "POST /discs",
				update : "PUT /discs/{id}",
				destroy : "DELETE /discs/{id}",
				 /*
				    * find index of a disc inside the data array
				    * @param {String} id Disc identification number.
				    * @return {Int} the index inside the data array
				    */				
				indexOf : function(id) {
					for (d in Disc.DISCS) {
						if ((Disc.DISCS[d]) && (Disc.DISCS[d].id == id))
							return d;
					}
					return -1;
				},
				LASTID : 3,
				DISCS : [ {
					id : 1,
					name : "Killers"
				}, {
					id : 2,
					name : "Powerslave"
				}, {
					id : 3,
					name : "Somewhere in time"
				} ]
			}, {});

			// use bind to simulate insert/update/delete
			Disc.bind('created', function(ev, disc) {
				steal.dev.log("Album created: "+disc.name);
				Disc.DISCS.push({
					id : disc.id,
					name : disc.name
				});
			});
			Disc.bind('updated', function(ev, disc) {
				steal.dev.log("Album updated: "+disc.name);
				var ix = Disc.indexOf(disc.id);
				if (ix != -1)
					Disc.DISCS[ix].name = disc.attr("name");
			});
			Disc.bind('destroyed', function(ev, disc) {
				steal.dev.log("Album destroyed: "+disc.name);
				var ix = Disc.indexOf(disc.id);
				if (ix != -1)
					Disc.DISCS[ix] = null;
			});

			// disc controller
			$.Controller("Discs", {
				"init" : function(element, options) {
					// ----------- JAML --------------
					/*Disc.findAll({}, function(discs) {
						element.html($.View( 'discs', discs));
						// manual hookup (mandatory with JAML)
						$('.disc').each(function(i, el){
					        discs[i].hookup(el);
					    });
					});*/
					// ----------- EJS --------------
					this.element.html('./views/discs.ejs', Disc.findAll());
				},
				"li click" : function(li) {
					li.trigger('selected', li.model());
					editor.update({disc: li.model()});
				},
				"li .destroy click" : function(el, ev) {
					var li = el.closest('.disc');
					li.model().destroy();
					ev.stopPropagation();
				},
				"{Disc} destroyed" : function(Disc, ev, destroyedDisc) {
					destroyedDisc.elements(this.element).remove();
				},
				"{Disc} updated" : function(Disc, ev, updatedDisc) {
					// -------------- JAML ------------
					/*var li=updatedDisc.elements(this.element);
					// store <li> index inside of the <ul>
					var ix=this.element.children().index(li);
					// replace <li> with the new one
					updatedDisc.elements(this.element).replaceWith("discs", [updatedDisc]);
					// hook model to the <li>, using index previously found
					updatedDisc.hookup(this.element.children()[ix]);*/
					// -------------- EJS ------------
					updatedDisc.elements(this.element).replaceWith('./views/discs.ejs',
							[ updatedDisc ]);
				},
				"{Disc} created" : function(Disc, ev, createdDisc) {
					// -------------- JAML ------------
					/*this.element.append('discs', [ createdDisc ]);
					createdDisc.hookup(this.element.children().last()[0]);*/
					// -------------- EJS -------------
					this.element.append('./views/discs.ejs', [ createdDisc ]);
				}
			});
			
			// editor controller
			$.Controller('Editor',{
				  update : function(options){
				    this._super(options);
				    this.setName();
				  },
				  setName : function(){
				    this.element.children("input[type=text]").val(this.options.disc.name);
				  },
				  getName: function() {
					return   this.element.children("input[type=text]").val();
				  },
				  "{disc} updated" : function(){
				    this.setName();
				  },
				  "change" : function(){
				    var disc = this.options.disc;
				    if (disc) {
				    	disc.attr('name', this.getName() );
				    	disc.save();
				    }
				  },
				  "input[type=button] click": function() {
					  var disc=new Disc();
					  disc.attr("name", this.getName());
					  disc.save();
				  }
				});
			

			new Discs("#discs", {});
			var editor = new Editor("#edit");
		});