//------------------------------  NOTES --->--->--->--->--->--->--->--->--->--->--->--->--->--->---v---v---v---v---v---v---v---v---v
//Event Listeners

//$(".bg-filter").on("click", function(){ closeEditPanel(); });
$(".ul-container").on("click", function(){ generateArrayTable($(this))});
//$(".mutable").on("click", function(){ editRow($(this).parent())});
//$(".dataRow").on("click", function(){ editRow($(this)); });

//------------------------------
//Temporary Data
let type = "";
let dicts = {
  activations: ["aid","name","age","rac","trauma","notes"],
  rac:         ["rid","name","activationCodes","notes"],
  hospital:    ["hid","name","rac","traumaLevel","services","address","phoneDirectory","email","notes"],
  trauma:      ["tid","name","criteria","notes"],
  temp2:  ["f0","f1","f2","f3","f4","f5"]
}

//------------------------------
//Methods//

function getType(){
  type = $(".type").attr("id");
}

function findIndex(tr){
  return $(".mainTable tbody").children().index(tr);
}

function closeEditPanel(){
  $(".bg-filter").hide();
  $(".edit-panel").hide();
  $(".openInArray").removeClass("openInArray");
}

function submitEditPanel(){   //this could use some prechecking to reduce superfluous code
  $(".bg-filter").hide();
  $(".edit-panel").hide();
  let temp = "<ul>";
  switch(type){
    case "trauma":
      $.each( $(".arrayTableBody").find("tr"), function(){
        if(!$(this).hasClass("addRow")){
          temp += "<li>"+ $(this).find("td textarea:lt(1)").val();
          temp += "<ul>";
          $.each( $(this).find("td:lt(1)").children("span"), function(){
            temp += "<li>"+ $(this).find("textarea").val() +"</li>";
          } );
          temp += "</ul></li>";
        }
      });
      break;
    case "rac":
      $.each( $(".arrayTableBody").find("tr"), function(){
        if(!$(this).hasClass("addRow")){
          temp += "<li>"+ $(this).find(".first").val() + " : " + $(this).find(".second").val() + "</li>";
        }
      });
      break;
    case "hospital":
      if( $(".openInArray").parent().parent().children().index( $(".openInArray").parent() ) == 7 ){
        $.each( $(".arrayTableBody").find("tr"), function(){
          if(!$(this).hasClass("addRow")){
            temp += "<li>"+ $(this).find(".first").val() + " : " + $(this).find(".second").val() + "</li>";
          }
        });
      }else{
        $.each( $(".arrayTableBody").find("textarea"), function(){
          temp += "<li>"+ $(this).val() +"</li>";
        });
      }
      break;
    default:
      $.each( $(".arrayTableBody").find("textarea"), function(){
        temp += "<li>"+ $(this).val() +"</li>";
      });
      break;
  }
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

function addActivation(end){
  $("<span><button class='fas fa-minus-circle button-table' style='vertical-align: super;' onclick=' $(this).parent().remove(); '></button><textarea class='fieldInput'>New Activation</textarea><br></span>").insertBefore(end);
}

function generateArrayTable(td){
  if(td.parent().parent().hasClass("editing")){
    $(".bg-filter").show();
    $(".edit-panel").show();
    td.addClass("openInArray");
    $(".arrayTableBody").html("");
    switch(type){
      case "trauma":
        $.each( td.find("ul:lt(1)").children("li"), function(){
          let tag = $(this).clone().children().remove().end().text();
          let content = "<tr><td><textarea class='arrayTableField'>"+tag+"</textarea>";
          //console.log($(this));
          $.each($(this).find("li"), function(){
            content += "<span><button class='fas fa-minus-circle button-table' style='vertical-align: super;' onclick='$(this).parent().remove();'></button><textarea class='fieldInput'>"+ $(this).text() +"</textarea><br></span>";
          });
          content += "<button class='fas fa-plus-circle button-table' onclick='addActivation( $(this) )'> Add Activation</button>";
          content += "</td><td><button class='fas fa-minus-circle button-table' onclick='removeArrayRow( $(this).parent().parent() );'></button></td></tr>";
          $(".arrayTableBody").append( content );
        });
        break;
      case "rac":
        $.each( td.find("ul:lt(1)").children("li"), function(){
          let pair = $(this).text().split(" : ");
          let content = "<tr><td>ID: <textarea class='arrayTableField short first'>"+pair[0]+"</textarea> &nbsp; Code: <textarea class='arrayTableField long second'>"+ pair[1] +"</textarea>";
          content += "</td><td><button class='fas fa-minus-circle button-table' onclick='removeArrayRow( $(this).parent().parent() );'></button></td></tr>";
          $(".arrayTableBody").append( content );
        });
        break;
      case "hospital":
        let j = $(td).parent().parent().children().index($(td).parent());
        if(j == 7){
          $.each( td.find("ul:lt(1)").children("li"), function(){
            let pair = $(this).text().split(" : ");
            let content = "<tr><td>Dept: <textarea class='arrayTableField long first'>"+pair[0]+"</textarea> &nbsp; Ext: <textarea class='arrayTableField short second'>"+ pair[1] +"</textarea>";
            content += "</td><td><button class='fas fa-minus-circle button-table' onclick='removeArrayRow( $(this).parent().parent() );'></button></td></tr>";
            $(".arrayTableBody").append( content );
          });
        }else{
          $.each( td.find("li"), function(){
            $(".arrayTableBody").append("<tr><td><textarea class='arrayTableField'>"+$(this).text()+"</textarea></td><td><button class='fas fa-minus-circle button-table' onclick='removeArrayRow( $(this).parent().parent() );'></button></td></tr>");
          });
        }
        break;
      default:
        $.each( td.find("li"), function(){
          $(".arrayTableBody").append("<tr><td><textarea class='arrayTableField'>"+$(this).text()+"</textarea></td><td><button class='fas fa-minus-circle button-table' onclick='removeArrayRow( $(this).parent().parent() );'></button></td></tr>");
        });
        break;
    }
    $(".arrayTableBody").append("<tr class='addRow'><td></td><td><button class='fas fa-plus-circle button-table' onclick='createArrayRow( $(this).parent().parent() );'></button></td></tr>");
  }
}

function removeArrayRow(tr){
  tr.remove();
}

function createArrayRow(tr){//this gives a handle to the "addRow" tr element under the arrayEditor. This way we can insertBefore();
  switch(type){
    case "trauma":
      $("<tr><td><textarea class='arrayTableField'></textarea><button class='fas fa-plus-circle button-table' onclick='addActivation( $(this) )'> Add Activation</button></td><td><button class='fas fa-minus-circle button-table' onclick='removeArrayRow( $(this).parent().parent() );'></button></td></tr>").insertBefore(tr);
      break;
    case "rac":
      $( "<tr><td>ID: <textarea class='arrayTableField short first'></textarea> &nbsp; Code: <textarea class='arrayTableField long second'></textarea></td><td><button class='fas fa-minus-circle button-table' onclick='removeArrayRow( $(this).parent().parent() );'></button></td></tr>").insertBefore(tr);
      break;
    case "hospital":
      if(  $(".openInArray").parent().parent().children().index( $(".openInArray").parent() ) == 7){
        $( "<tr><td>Dept: <textarea class='arrayTableField long first'></textarea> &nbsp; Ext: <textarea class='arrayTableField short second'></textarea></td><td><button class='fas fa-minus-circle button-table' onclick='removeArrayRow( $(this).parent().parent() );'></button></td></tr>").insertBefore(tr);
      }else{
        $("<tr><td><textarea class='arrayTableField'></textarea></td><td><button class='fas fa-minus-circle button-table' onclick='removeArrayRow( $(this).parent().parent() );'></button></td></tr>").insertBefore(tr);
      }
      break;
    default:
      $("<tr><td><textarea class='arrayTableField'></textarea></td><td><button class='fas fa-minus-circle button-table' onclick='removeArrayRow( $(this).parent().parent() );'></button></td></tr>").insertBefore(tr);
      break;
  }
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

function saveRow(tr){
  if( ( tr.hasClass("editing") ) ){
    toggleButtons(tr);
    if(tr.hasClass("undocumented")){
      tr.removeClass("undocumented");
      createRequest( "/"+type+"/", createJsonBody(dicts[type],tr) );
    }else{
      updateRequest( "/"+type+"/"+tr.children("td:nth-child(2)").text(), createJsonBody(dicts[type],tr) );
    }
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
  if(confirm("Are you sure you want to delete this row?")){
    deleteRequest( "/"+type+"/"+tr.children("td:nth-child(2)").text() );
    tr.remove();
  }
}

function findNextId(){
  let set = [];
  $.each( $(".mainTable tbody").children(), function(){
    set.push( parseInt( $(this).children("td:nth-child(2)").text() ) );
  } );
  return Math.max.apply(null,set)+1;
}

function createRow(){
  if($(".undocumented").length == 0){
    let content = '<tr class="dataRow undocumented"><td><button class="far fa-save button-table" style="display: none;" onclick="saveRow($(this).parent().parent());"></button><button class="fa fa-edit button-table" style="display: inherit;"onclick="editRow($(this).parent().parent());"></button><button class="fas fa-ban button-table" style="display: none;" onclick="cancelEdit($(this).parent().parent());"></button><button class="fas fa-trash-alt button-table" style="display: inherit;"onclick="deleteRow($(this).parent().parent());"></button></td><td>'+findNextId();+'</td>';
    switch(type){
      case "activations":
        content += '<td class="mutable">name</td><td class="mutable">age</td><td class="mutable">rac</td><td><div class="ul-container" onclick="generateArrayTable($(this));"><ul><li>trauma</li></ul></div></td><td class="mutable large">notes</td></tr>';
        break;
      case "rac":
        content +='<td class="mutable">name</td><td><div class="ul-container" onclick="generateArrayTable($(this));"><ul><li>aid : code</li></ul></div></td><td class="mutable large">notes</td></tr>';
        break;
      case "trauma":
        content +='<td class="mutable large">Name</td><td><div class="ul-container" onclick="generateArrayTable($(this));"><ul><li>Rac<ul><li>Activation Code</li></ul></li></ul></div></td><td class="mutable large">Notes</td>';
        break;
      case "hospital":
        content += '<td class="mutable">N/A</td><td class="mutable">N/A</td><td class="mutable">N/A</td><td><div class="ul-container" onclick="generateArrayTable($(this));"><ul><li>Services</li></ul></div></td><td class="mutable">N/A</td><td><div class="ul-container" onclick="generateArrayTable($(this));"><ul><li>Connection : #</li></ul></div></td><td class="mutable">N/A</td><td class="mutable large">N/A</td>';
        break;
    }
    $(".mainTable tbody").append(content);
    //editRow( $(".mainTable tbody").children().last() );
  }
}

function createJsonBody(dict,tr){
  if(tr != null){
    let temp = {};
    let i = 0;
    //console.log(tr);
    //console.log(findIndex(tr));
    $.each( $( ".mainTable tbody tr:nth-child("+ (findIndex(tr)+1) +")" ).find("td"),function(){               // I know the ")" makes it confusing to look at.... srry
      if( $(this).children("button").length == 0 ){                                                 // to make sure we account for the first row of buttons
        if( $(this).find("ul").length > 0 ){                                                       // then we parse the array
          let dataArray = [];
          switch(type){
            case "activations":
              $.each( $(this).find("li"), function(){
                dataArray.push( $(this).text() );                                                       //Additon of list items' textContent into array
              } );
              break;
            case "rac":
              $.each( $(this).find("li"), function(){
                let pair = $(this).text().split(" : ");
                let temp = {aid: parseInt(pair[0]), code: pair[1]};
                dataArray.push( temp );
              } );
              break;
            case "hospital":
              switch(dict[i]){
                case "services":
                  $.each( $(this).find("li"), function(){
                    dataArray.push( $(this).text() );                                                       //Additon of list items' textContent into array
                  } );
                  break;
                case "phoneDirectory":
                  $.each( $(this).find("li"), function(){
                    let pair = $(this).text().split(" : ");
                    let temp = {connection: pair[0], number: pair[1]};
                    dataArray.push( temp );
                  } );
                  break;
              }
              break;
            case "trauma":
              $.each( $(this).find("ul:lt(1)").children("li"), function(){
                let tempArray = [];
                $.each( $(this).find("ul li"), function(){
                  tempArray.push($(this).text());
                });
                let temp = {rac: $(this).clone().children().remove().end().text().replace(/\s+/g, " "), activationCodes: tempArray};
                dataArray.push(temp);
              });
              break;
          }
          //console.log(dataArray);
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
	 xhrFields: {withCredentials: true},
	 success: function(response) {
		  // successful create of itinerary
      console.log(response);
	 },
	 error: function(err) { console.log("Could not connect to server..."); console.log(err); }
  });
}
