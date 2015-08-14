Template.registerHelper("selectedIfEquals",function(left,right){
  return left==right?"selected":"";
});

Template.registerHelper("checkedIfEquals",function(id,assigned){

	var checked = '';

	if( $.isArray(assigned) && assigned.length > 0)
	{
		$.each( assigned, function( key, value ) {
		  
		  if(id == value)
		  {
		  	checked = 'checked';
		  }

		});
	}
	
	return checked;
});