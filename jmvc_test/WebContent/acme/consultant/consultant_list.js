/**
 * @page cons Consulenti 
 * @parent index
 *
 * ###Modelli e controller per i consulenti
 */
steal('jquery/class', 'jquery/controller', 'acme/models/consultant.js',
		'acme/consultant/consultant_detail.js').then(
		/**
		 * @class Consultants
		 * @parent cons
		 * @constructor Controller per la gestione paginata dell'elenco dei consulenti tramite una HTML table.
		 * La lista &egrave; sensibile ai cambiamenti di dati nei modelli Consultant e Contract
		 * @param {Object} element Un elemento del DOM di tipo table a cui agganciare il controller 
		 * @param {Object} options Un oggetto con le seguenti propriet&agrave; 
		 * 	<ul>
		 * <li>detail: un oggetto di tipo ConsultantEditor</li> 
		 * </ul>
		 */
		function($) {
			$.Controller("Consultants", {
				/* @prototype */
				/* @attribute page
				 * Pagina da visualizzare */
				page: 1,
				/* @attribute pageSize
				 * Records per pagina */
				pageSize: 4,
				/* @attribute mode
				 * Modalit&agrave; di lavoro del widget:
				 * <ul><li>"all" - elenca tutti i consulenti</li>
				 * <li>"search" - elenca i consulenti secondo i criteri di ricerca</li></ul> 
				 */
				mode: "all",
				/* @attribute field
				 * Per la modalit&agrave; ricerca (mode="all"), campo di ricerca: 
				 * <ul>
				 * <li>"name" - per nome</li>
				 * <li>"lname" - per cognome</li>
				 * <li>"fc" - per codice fiscale</li>
				 * </ul>
				 */
				field: "",
				/* @attribute val 
				 * Per la modalit&agrave; ricerca (mode="all"), valore di ricerca */
				val: "",
				update : function(options){
					this._super(options);
					if (this.mode=="all")
						this.load(Consultant.findAll({"page": this.page, "pageSize": this.pageSize}));
					if (this.mode=="search")
						this.load(Consultant.search({
							field : this.field,
							val: this.val,
							page: this.page,
							pageSize: this.pageSize
						}));

	  			},
				"init" : function(element, options) {
					this.editor=options.detail;
					this.update();
				},
				/*
				 * @function load
				 * Carica la lista di consulenti 
				 * @param {Array} consList Un array di oggetti Consultant
				 */
				load: function(consList) {
					this.element.html($.View('consultants', this));
					this.element.append($.View('consultant_item', consList));
				},
				".consultant .destroy click" : function(el, ev) {
					var li = el.closest('.consultant');
					var cons=li.model(); 
					if (cons.conts.length>0) {
						this.error="Questo consulente ha ancora dei contratti associati";
						this.update();
					} else
						cons.destroy();
					ev.stopPropagation();
				},
				".consultant .modify click" : function(el, ev) {
					var cons = el.closest('.consultant');
					this.editor.update({consultant: cons.model()});
					ev.stopPropagation();
				},
				".add click" : function(el, ev) {
					this.editor.update({consultant: new Consultant()});
					ev.stopPropagation();
				},
				".prev click" : function(el, ev) {
					this.page--;
					this.update();
					ev.stopPropagation();
				},
				".next click" : function(el, ev) {
					this.page++;
					this.update();
					ev.stopPropagation();
				},
				"{Consultant} destroyed" : function(Consultant, ev, destroyedConsultant) {
					//destroyedConsultant.elements(this.element).remove();
					this.update();
				},
				"{Consultant} updated" : function(Consultant, ev, updatedConsultant) {
					//updatedConsultant.elements(this.element).replaceWith('../consultant/views/consultant_item.ejs',
					//		[ updatedConsultant ]);
					this.update();
				},
				"{Consultant} created" : function(Consultant, ev, createdConsultant) {
					//this.element.append('../consultant/views/consultant_item.ejs', [ createdConsultant ]);
					this.update();
				},
				"{Contract} destroyed" : function(Contract, ev, updatedContract) {
					this.update();
				},
				"{Contract} updated" : function(Contract, ev, updatedContract) {
					this.update();
				},
				"{Contract} created" : function(Contract, ev, updatedContract) {
					this.update();
				}
			});
			
		});