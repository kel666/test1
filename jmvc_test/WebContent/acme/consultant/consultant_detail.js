steal('jquery/class', 'jquery/controller', 'acme/models/consultant.js',
		function($) {
	/**
	 * @class ConsultantEditor
	 * @parent cons
	 * @constructor Controller per la gestione del form di inserimento/modifica di un consulente.
	 * @param {Object} element Un elemento del DOM di tipo div a cui agganciare il controller 
	 */
			$.Controller('ConsultantEditor', {
				/* @prototype */
				/*
				 * Aggiorna il contenuto del form.  
				 * @param {Object} options Un oggetto con le seguenti proprietà:
				 * <ul>
				 * <li>"consultant" - un oggetto di tipo Consultant</li>
				 * </ul>
				 */
				update : function(options){
							this._super(options);
							this.element.show();
							this.element.html('//acme/consultant/views/consultant_detail.ejs', 
									this.options.consultant);
			  			},
				  ".save click": function() {
					  var cons=this.options.consultant;
					  var el=this.element;
					  cons.attr("firstName", el.find(".firstName").val());
					  cons.attr("lastName", el.find(".lastName").val());
					  cons.attr("fiscalCode", el.find(".fiscalCode").val());
					  if (cons.validate()) {
						  cons.save();
						  el.hide();
					  } else
						  this.update();
				  }
				});
		});