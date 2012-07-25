/**
 * @page contmodel Modelli 
 * @parent cont
 *
 * ###Modelli
 */
steal(
		'jquery/class',
		'jquery/model',
		'jquery/model',
		function($) {
			/**
			 * @class Contract
			 * @parent contmodel
			 * @constructor Crea un oggetto di tipo Contract
			 */
			$.Model('Contract',
							/* @Static */
							{
								attributes : {
									date : "date"
								},
								search : function(params, success, error) {
									return $.ajax({
										url : 'Contract',
										type : 'get',
										dataType : 'json contract.models',
										data : params,
										success : success,
										error : error
									});
								},
								/* @attribute findAll
								 * REST implementation to get all Contract */
								findAll : "GET Contracts?all&page={page}",
								/* @attribute findOne
								 * REST implementation to get a specific Contract */
								findOne : "GET Contracts?id={id}",
								/* @attribute create
								 * REST implementation to create a Contract */
								create : "POST Contracts",
								/* @attribute update
								 * REST implementation to update a Contract */
								update : "PUT Contracts?id={id}",
								/* @attribute destroy
								 * REST implementation to ddelete a Contract */
								destroy : "DELETE Contracts?id={id}",
								/*
								 * @function indexOf
								 * Cerca l'indice di un Contract all'interno dell'array di dati. 
								 * @param {String} id ID del contratto
								 * @return {Int} l'indice all'interno dell'array dei dati
								 */
								indexOf : function(id) {
									for (d in Contract.contracts) {
										if ((Contract.contracts[d])
												&& (Contract.contracts[d].id == id))
											return d;
									}
									return -1;
								}
							},
							/* @Prototype */
							{
								/* @attribute id
								 * Codice del contratto */
								id: "",
								/* @attribute customer
								 * Cliente */
								customer: "",
								/* @attribute date
								 * Data contratto */
								date: null,
								/* @attribute consultantId
								 * ID consulente associato */
								consultantId: 0,
								/* @attribute consultantName
								 * Nome consulente associato */
								consultantName: "",
								errs : [],
								/*
								 * @function validate
								 * Controlla che l'istanza del contratto sia formalmente corretta. 
								 * @return {boolean} true se l'istanza &egrave; corretta, altrimenti false
								 */
								validate : function() {
									this.errs = [];
									var ok = true;
									// name
									if (this.attr("customer") == "") {
										this.errs["customer"] = "Cliente obbligatorio";
										ok = false;
									}
									// date valid?
									if (this.attr("date") == null) {
										this.errs["date"] = "Data non corretta";
										ok = false;
									}
									if (this.attr("date") > new Date()) {
										this.errs["date"] = "Data contratto successiva ad oggi";
										ok = false;
									}
									//
									return ok;
								}
							});

		});