/**
 * @page cont Contratti
 * @parent index
 *
 * ###Modelli e controller per i contratti
 */
steal('jquery/class', 'jquery/controller', 'acme/models/contract.js',
		'acme/commons/commons.js', 'acme/contract/contract_detail.js',
		function($) {
	/**
	 * @class Contracts
	 * @parent cont
	 * @constructor Controller per la gestione dell'elenco dei contratti tramite una HTML table.
	 * La lista &egrave; sensibile ai cambiamenti di dati nei modelli Consultant e Contract
	 * @param {Object} element Un elemento del DOM di tipo table a cui agganciare il controller 
	 * @param {Object} options Un oggetto con le seguenti propriet&agrave; 
	 * 	<ul>
	 * <li>detail: un oggetto di tipo ContractEditor</li> 
	 * </ul>
	 */
			$.Controller("Contracts", {
				/* @prototype */
				/* @attribute page
				 * Pagina da visualizzare */
				page: 1,
				/* @attribute pageSize
				 * Records per pagina */
				pageSize: 999,
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
						this.load(Contract.findAll({"page": this.page, "pageSize": this.pageSize}));
					if (this.mode=="search")
						this.load(Contract.search({
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
				 * Carica la lista di contratti
				 * @param {Array} contList Un array di oggetti Contract
				 */
				load: function(contList) {
					this.element.html('../contract/views/contracts.ejs', this);
					this.element.append('../contract/views/contract_item.ejs', contList);
				},
				".contract .destroy click" : function(el, ev) {
					var li = el.closest('.contract');
					li.model().destroy();
					ev.stopPropagation();
				},
				".contract .modify click" : function(el, ev) {
					var cont = el.closest('.contract');
					this.editor.update({contract: cont.model()});
					ev.stopPropagation();
				},
				".add click" : function(el, ev) {
					this.editor.update({contract: new Contract()});
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
				"{Contract} destroyed" : function(Contract, ev, destroyedContract) {
					destroyedContract.elements(this.element).remove();
					//this.update();
				},
				"{Contract} updated" : function(Contract, ev, updatedContract) {
					updatedContract.elements(this.element).replaceWith('../contract/views/contract_item.ejs',
							[ updatedContract ]);
					//this.update();
				},
				"{Contract} created" : function(Contract, ev, createdContract) {
					this.element.append('../contract/views/contract_item.ejs', [ createdContract ]);
					//this.update();
				},
				"{Consultant} destroyed" : function(Consultant, ev, cons) {
					this.update();
				},
				"{Consultant} updated" : function(Consultant, ev, cons) {
					this.update();
				},
				"{Consultant} created" : function(Consultant, ev, cons) {
					this.update();
				}
			});
			
		});