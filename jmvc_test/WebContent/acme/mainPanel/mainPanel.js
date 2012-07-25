/**
 * @page index ACME 
 *
 * ###Gestione dei consulenti/contratti
 * 
 * Modello per la gestione dei dati dei contratti. Attributi
 * <ul>
 * <li>ID contratto</li>
 * <li>nome cliente</li>
 * <li>data contratto</li>
 * <li>cliente</li>
 * <li>consulente di riferimento</li>
 * </ul>
 */
steal(	'acme/acme.css',
	'jquery/class', 'jquery/controller', 'acme/models/consultant.js', 'jquery/view/ejs', 
		'acme/consultant/consultant_list.js','acme/consultant/consultant_detail.js',
		'acme/consultant/consultant_search.js', 'acme/contract/contract_list.js','acme/contract/contract_detail.js',
		function($) {
			var consEdit = new ConsultantEditor("#consEdit");
			var consultantList = new Consultants("#consultantList", { detail : consEdit});
			new Search("#consSearchbox", { list : consultantList });
			var contEdit = new ContractEditor("#contEdit");
			new Contracts("#contracttList", { detail : contEdit});
		});