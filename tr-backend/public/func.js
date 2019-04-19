//------------------------------  NOTES --->--->--->--->--->--->--->--->--->--->--->--->--->--->---v---v---v---v---v---v---v---v---v
//Event Listeners

$(".bg-filter").on("click", function(){ closeEditPanel(); });
$(".ul-container").on("click", function(){ generateArrayTable($(this))});
//$(".mutable").on("click", function(){ editRow($(this).parent())});
//$(".dataRow").on("click", function(){ editRow($(this)); });

//------------------------------
//Temporary Data
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
  return $(".mainTable tbody").children().index(tr);
}

function closeEditPanel(){
  $(".bg-filter").hide();
  $(".edit-panel").hide();
  let temp = "<ul>";
  $.each( $(".arrayTableBody").find("textarea"), function(){
    temp += "<li>"+ $(this).val() +"</li>";
  });
  temp += "</ul>";
  $(".openInArray").html(temp);
  $(".openInArray").removeClass("openInArray");
}

function toggleButtons(tr){
  tr.find(".fa-save").toggle();                                                      //Justa' buncha' button togglin... I should really make a helper class at some point... XP
  tr.find(".fa-edit").toggle();
  tr.find(".fa-ban").toggle();
  tr.find(".fa-trash-alt").toggle();
}

function generateArrayTable(td){
  if(td.parent().parent().hasClass("editing")){
    $(".bg-filter").show();
    $(".edit-panel").show();
    td.addClass("openInArray");
    $(".arrayTableBody").html("");
    $.each( td.find("li"), function(){
      $(".arrayTableBody").append("<tr><td><textarea class='arrayTableField'>"+$(this).text()+"</textarea></td><td><button class='fas fa-minus-circle button-table' onclick='removeArrayRow( $(this).parent().parent() );'></button></td></tr>");
    });
    $(".arrayTableBody").append("<tr class='addRow'><td></td><td><button class='fas fa-plus-circle button-table' onclick='createArrayRow( $(this).parent().parent() );'></button></td></tr>");
  }
}

function removeArrayRow(tr){
  tr.remove();
}

function createArrayRow(tr){
  $("<tr><td><textarea class='arrayTableField'></textarea></td><td><button class='fas fa-minus-circle button-table' onclick='removeArrayRow( $(this).parent().parent() );'></button></td></tr>").insertBefore(tr);
}

function toggleField(td){
  if( $(td).hasClass("mutable") ){
    if($(td).find(".field").length != 0){
      $(td).html( $(td).find("textarea:lt(1)").val() );
    }else{
      $(td).html( "<textarea class='field'>"+ $(td).html() +"</textarea>" );
    }
  }
}

function cancelEdit(tr){
  if( tr.hasClass("editing") ){
    toggleButtons(tr);
    $.each( tr.children(".mutable"), function(){
      $(this).html( $(this).find("textarea").text() );                                                //The "textContent" property of a textarea stores the "default" un-modified. This can be reached via the ".text()" DOM traversal.
    } );                                                                                              //Note: This action also conveiently removes the textbox object, making garbage disposal easy!
    tr.removeClass("editing");
  }
}

function saveRow(tr, type){
  if( ( tr.hasClass("editing") ) ){
    toggleButtons(tr);
    updateRequest( "/activations/"+tr.children("td:nth-child(2)").text(), createJsonBody(type,tr) );
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
    toggleButtons(tr);
    tr.addClass("editing");
  }else{
    console.log("You are already editing this row!");
  }
}

function deleteRow(tr){

  console.log("Are you sure you want to delete the row at index " + findIndex(tr) + "?");
}

function createJsonBody(dict,tr){
  if(tr != null){
    let temp = {};
    let i = 0;
    console.log(findIndex(tr));
    $.each( $( ".mainTable tbody tr:nth-child("+ (findIndex(tr)+1) +")" ).find("td"),function(){               // I know the ")" makes it confusing to look at.... srry
      if( $(this).children("button").length == 0 ){                                                 // to make sure we account for the first row of buttons
        if( $(this).find("ul").length > 0 ){                                                       // then we parse the array
          let dataArray = [];
          $.each( $(this).find("li"), function(){
            dataArray.push( $(this).text() );                                                       //Additon of list item tectContent into array
          } );
          console.log(dataArray);
          temp[ dict[i] ] = dataArray;                                                              //Here we reference the global dictionary storing field names in arrays sorted by "json-doc model" and their appearence in the GUI......Whew...
        }else{
          temp[ dict[i] ] = $(this).children("textarea:lt(1)").val();                               //And again, but for the text areas. Note: We are storing them in our new "JSON-frienly format" vanilla js 'Dictionary' data structure.
        }
        i++;
      }
    } );
    console.log(JSON.stringify(temp));
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
