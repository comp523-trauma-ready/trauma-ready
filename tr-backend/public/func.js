//------------------------------
//Event Listeners

$(".bg-filter").on("click", function(){ toggleEditPanel(); });
$(".ul-container").on("click", function(){ toggleEditPanel(); generateArrayTable($(this))});
//$(".mutable").on("click", function(){ editRow($(this).parent())});
//$(".dataRow").on("click", function(){ editRow($(this)); });

//------------------------------
//Temporary Data
let index = null;
let dicts = {
  activations:  ["aid","name","age","rac","trauma","notes"],
  racs:         ["rid","name","aids","notes"],
  hospitals:    ["hid","name","rac","level","services","phone","email","notes"],
  temp:  ["t0","t1","t2","t3","t4","t5"],
  temp2:  ["f0","f1","f2","f3","f4","f5"]
}

//------------------------------
//Methods//

function findIndex(tr){
  return $("tbody").children().index(tr);
}

function toggleEditPanel(){
  $(".bg-filter").toggle();
  $(".edit-panel").toggle();
}

function generateArrayTable(td){
  console.log(td);
}

function toggleField(td){
  if( $(td).hasClass("mutable") ){
    if($(td).find(".field").length != 0){
      $(td).html( $(td).find("textarea:lt(1)").val() );
    }else{
      $(td).html("<textarea class='field'>"+ $(td).html() +"</textarea>");
    }
  }
}

function cancelEdit(tr){
  if( tr.hasClass("editing") ){
    tr.find(".fa-save").css({"display":"none"});
    tr.find(".fa-pencil").css({display:"inherit"});
    tr.find(".fa-ban").css({"display":"none"});
    tr.find(".fa-trash").css({display:"inherit"});
    //you need to finish putting the text reverted to the old through $($(".mutable")[0]).find("textarea").text() which stores the old text before being modified.
  }
}

function saveRow(tr, type){
  if( ( tr.hasClass("editing") ) ){
    tr.find(".fa-save").css({"display":"none"});
    tr.find(".fa-pencil").css({display:"inherit"});
    tr.find(".fa-ban").css({"display":"none"});
    tr.find(".fa-trash").css({display:"inherit"});
    updateRequest("/activations/"+tr.children("td:nth-child(2)").text(), createJsonBody(type,tr));
    $.each(tr.children(),function(){
      toggleField( $(this) );
    });
    tr.removeClass("editing");
  }else{
    console.log("There are no changes to be saved.");
  }
}

function editRow(tr){
  if( !( tr.hasClass("editing") ) ){ // change to if not being edited via empty class
    $.each(tr.children(),function(){
      toggleField( $(this) );
    });
    tr.find(".fa-save").css({display:"inherit"});
    tr.find(".fa-pencil").css({"display":"none"});
    tr.find(".fa-ban").css({display:"inherit"});
    tr.find(".fa-trash").css({"display":"none"});
    tr.addClass("editing");
  }else{
    console.log("You are already editing this row!");
  }
}

function deleteRow(tr){

  console.log("Are you sure you want to delete the row at index" + temp + "?");
}

function createJsonBody(dict,tr){
  if(tr != null){
    let temp = {};
    let i = 0;
    $.each( $( "tbody tr:nth-child("+ (findIndex(tr)+1) +")" ).children(),function(){               // I know the ")" makes it confusing to look at.... srry
      if( $(this).children("button").length == 0 ){                                                 // to make sure we account for the first row of buttons
        if( $(this).children("div").length > 0 ){                                                   // then we parse the array
          let dataArray = [];
          $.each( $(this).find("ul").children(), function(){
            dataArray.push( $(this).text() );                                                       //Additon of list item tectContent into array
          } );
          temp[ dict[i] ] = dataArray;                                                              //Here we reference the global dictionary storing field names in arrays sorted by "json-doc model" and their appearence in the GUI......Whew...
        }else{
          temp[ dict[i] ] = $(this).children("textarea:lt(1)").val();                               //And again, but for the text areas. Note: We are storing them in our new "JSON-frienly format" vanilla js 'Dictionary' data structure.
        }
        i++;
      }
    } );
    console.log(temp);
    return JSON.stringify(temp);
  }
}

function createRequest(url,data){
  $.ajax(url, {
	 async: true,
	 type: 'POST',
   contentType: 'application/json',
	 dataType: 'json',
	 data: data,
	 xhrFields: {withCredentials: true},
	 success: function(response) {
		  // successful create of itinerary
      console.log(response);
	 },
	 error: function(err) { console.log("Could not connect to server..."); console.log(err); }
  });
}

function updateRequest(url,data){ // PUT
  $.ajax(url, {
	 async: true,
	 type: 'PUT',
   contentType: 'application/json',
	 dataType: 'json',
	 data: data,
	 xhrFields: {withCredentials: true},
	 success: function(response) {
		  // successful create of itinerary
      console.log(response);
	 },
	 error: function(err) { console.log("Could not connect to server..."); console.log(err); }
  });
}

function deleteRequest(url){ // PUT
  $.ajax(url, {
	 async: true,
	 type: 'DELETE',
   contentType: 'application/json',
	 dataType: 'json',
	 data: data,
	 xhrFields: {withCredentials: true},
	 success: function(response) {
		  // successful create of itinerary
      console.log(response);
	 },
	 error: function(err) { console.log("Could not connect to server..."); console.log(err); }
  });
}
