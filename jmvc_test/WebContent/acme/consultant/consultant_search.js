steal('jquery/class', 'jquery/controller', 'acme/models/consultant.js',
		function($) {
	/**
	 * @class Search
	 * @parent cons
	 * @constructor Controller per la gestione del form di ricerca di un consulente.
	 * @param {Object} element Un elemento del DOM di tipo div a cui agganciare il controller 
	 * @param {Object} options Un oggetto con le seguenti propriet&agrave;
	 * <ul>
	 * <li>"list" - un oggetto di tipo Consultants</li>
	 * </ul> 
	 */
			$.Controller('Search', {
				init:	function(element, options) {
					this.list=options.list;
					this.element.html('//acme/consultant/views/consultant_search.ejs', {});
				},
				".search click": function(el, ev) {
					this.list.mode="search";
					this.list.page=1;
					this.list.field=this.element.find(".field").val();
					this.list.val=this.element.find(".val").val();
					this.list.update();
				}
		});
	});