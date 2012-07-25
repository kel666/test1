steal('jquery/class', 'jquery/controller', 'acme/models/contract.js', 'jquery/view/ejs', 
		'acme/contract/contract_list.js','acme/contract/contract_detail.js',
		function($) {
			var editor = new ContractEditor("#edit");
			var contlist = new Contracts("#contracts", { detail : editor});
		});