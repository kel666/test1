steal('jquery/class', 'jquery/controller', 'acme/models/contract.js',
		'acme/commons/consultantCombo.js', 'acme/commons/commons.js',
		function($) {
	/**
	 * @class ContractEditor
	 * @parent cont
	 * @constructor Controller per la gestione del form di inserimento/modifica di un contratto.
	 * @param {Object} element Un elemento del DOM di tipo div a cui agganciare il controller 
	 */
			$.Controller('ContractEditor', {
				/* @prototype */
				/*
				 * Aggiorna il contenuto del form.  
				 * @param {Object} options Un oggetto con le seguenti proprietà:
				 * <ul>
				 * <li>"contract" - un oggetto di tipo Contract</li>
				 * </ul>
				 */
				update : function(options){
							this._super(options);
							this.element.show();
							this.element.html('../contract/views/contract_detail.ejs', this.options.contract);
			  			},
				  ".save click": function() {
					  var cont=this.options.contract;
					  var el=this.element;
					  cont.attr("code", el.find(".code").val());
					  cont.attr("customer", el.find(".customer").val());
					  cont.attr("consultantId", el.find(".consultantId").val());
					  cont.attr("consultantName", el.find(".consultantId :selected").html().trim());
					  cont.attr("date", Globalize.parseDate(el.find(".date").val().trim()));
					  if (cont.validate()) {
						  cont.save();
						  el.hide();
					  } else
						  this.update();
				  }
				});
		});