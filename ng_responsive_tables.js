/**
* NG Responsive Tables v1.0
* Inspiration: http://css-tricks.com/examples/ResponsiveTables/responsive.php
* Author: Tomislav Matijević
* List of functions:
*	- targetTable: Searches for each table row , find td and take its current index.
*      Apply to that index same index of table head or td in first table row ( in case there are no table header applied )
*	- checkForTableHead: If there is no table head defined, use td in first table row as table head (prevention mode)
* Config:
* - Adjust paddings
* - On each td there is class named "tdno-[index]", so you can modify each td if you need custom padding
*/

(function(){

	var defaults = {
		tableSelector: '.ng-table',
		smallPaddingCharNo: 0,
		mediumPaddingCharNo: 0,
		largePaddingCharNo: 0
	},
	ngResponsiveTables = {
		opt: '',
		dataContent: '',
		globalWidth: 0,
		init: function(params){
			this.opt = $.extend( defaults, params );
			ngResponsiveTables.targetTable();
		},
		targetTable: function(){
			var that = this;
			$(this.opt.tableSelector).find('tr').each(function(){
				$(this).find('td').each(function(i, v){
					that.checkForTableHead( $(this), i );
					$(this).addClass('tdno' + i);
				});
			});
		},
		checkForTableHead: function(element, index){
			if( $(this.opt.tableSelector).find('th').length ){
				this.dataContent = $(this.opt.tableSelector).find('th')[index].textContent;
			}else{
				this.dataContent = $(this.opt.tableSelector).find('tr:first td')[index].textContent;
			}
			// This padding is for large texts inside header of table
			// Use small, medium and large paddingMax values from defaults to set-up offsets for each class
			if( this.opt.smallPaddingCharNo > this.dataContent.length ){
				element.addClass('small-padding');
			}else if( this.opt.mediumPaddingCharNo > this.dataContent.length ){
				element.addClass('medium-padding');
			}else{
				element.addClass('large-padding');
			}
			element.attr('data-content', this.dataContent);
		}
	};
	window.ngResponsiveTables = ngResponsiveTables;
})();
