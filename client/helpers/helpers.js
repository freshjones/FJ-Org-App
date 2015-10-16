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


Template.registerHelper("maxObjects",function(list,allowed)
{
	if( typeof list == 'undefined' || ( typeof list == 'object' && list.length < allowed ) )
	{	
		return true;
	}
	return false;
});



UI.registerHelper('breaklines', function(text, options) {
  text = s.escapeHTML(text);
  text = text.replace(/(\r\n|\n|\r)/gm, '<br/>');
  return new Spacebars.SafeString(text);
});



