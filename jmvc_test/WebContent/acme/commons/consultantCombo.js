steal('jquery/class', 'jquery/controller', 'acme/models/consultant.js',
		function($) {
	/**
	 * @class ConsultantCombo
	 * @parent index
	 * @constructor Controller per la gestione di una combobox di Consulenti
	 * @param {Object} element Un elemento del DOM di tipo select a cui agganciare il controller 
	 * @param {Object} options Un oggetto con una sola propriet&agrave; "value" che indichi l'ID attualmente selezionato
	 * 							esempio: { value: 12 }
	 */
			$.Controller("ConsultantCombo", {
				/* @prototype */
				update : function(options) {
					this._super(options);
					this.load(Consultant.findAll({
						"page" : 1,
						"pageSize" : 999
					}));
				},
				"init" : function(element, options) {
					this.value=options.value;
					this.update();
				},
				/*
				 * @function load
				 * Carica la combo di consulenti 
				 * @param {Array} consList Un array di oggetti Consultant
				 */
				load : function(consList) {
					this.element.html('../commons/views/consultantCombo.ejs',
							{ data: consList, selected: this.value });
				}
			});

			$.EJS.Helpers.prototype.consultantCombo = function(consId) {
				return function(element) {
					new ConsultantCombo($(element), { value : consId });
				};
			};
		});