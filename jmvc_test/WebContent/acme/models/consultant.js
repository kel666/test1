/**
 * @page consmodel Modelli 
 * @parent cons
 *
 * ###Modelli
 */
steal('jquery/class', 'jquery/model', 'acme/models/contract.js',  
		function($) {
	/**
	 * @class Consultant
	 * @parent consmodel
	 * @constructor Crea un oggetto di tipo Consultant
	 */
	$.Model('Consultant', {
				/* @Static */
				attributes: {
				},
				search : function(params, success, error){
			          return $.ajax({
			            url: 'Consultant',
			            type: 'get',
			            dataType: 'json consultant.models',
			            data: params,
			            success: success,
			            error: error});
			        },
				/* @attribute findAll
				 * REST implementation to get all Consultant */
				findAll : "GET Consultant?all&page={page}",
				/* @attribute findOne
				 * REST implementation to get a specific Consultant */
				findOne : "GET Consultant?id={id}",
				/* @attribute create
				 * REST implementation to create a Consultant */
				create : "POST Consultant",
				/* @attribute update
				 * REST implementation to update a Consultant */
				update : "PUT Consultant?id={id}",
				/* @attribute destroy
				 * REST implementation to delete a Consultant */
				destroy : "DELETE Consultant?id={id}",
				/*
				 * @function indexOf
				 * Cerca l'indice di un Consultant all'interno dell'array di dati. 
				 * @param {Int} id ID del consulente
				 * @return {Int} l'indice all'interno dell'array dei dati
				 */
				indexOf : function(id) {
					for (d in Consultant.consultants) {
						if ((Consultant.consultants[d]) && (Consultant.consultants[d].id == id))
							return d;
					}
					return -1;
				}
			}, 
			/* @Prototype */
			{
				/* @attribute name
				 * Nome del consulente */
				name: "",
				/* @attribute lname
				 * Cognome del consulente */
				lname: "",
				/* @attribute fc
				 * Codice fiscale del consulente */
				fc: "",
				/* @attribute conts
				 * Array di contratti (oggetti Contract) del consulente */
				conts: [],
				errs: [],
				/*
				 * @function validate
				 * Controlla che l'istanza del consulente sia formalmente corretta. 
				 * @return {boolean} true se l'istanza &egrave; corretta, altrimenti false
				 */
				validate: function() {
					this.errs=[];
					var ok=true;
					// name
					if (this.attr("name")=="") {
						this.errs["name"]="Nome obbligatorio"; 
						ok=false;
					}
					// l name
					if (this.attr("lname")=="") {
						this.errs["lname"]="Cognome obbligatorio";
						ok=false;
					}
					// fc
					if (this.attr("fc")=="") {
						this.errs["fc"]="C.F. obbligatorio";
						ok=false;
					}
					//
					return ok;
				}
			});

		});