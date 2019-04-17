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

function toggleEditPanel(){
  $(".bg-filter").toggle();
  $(".edit-panel").toggle();
}

function generateArrayTable(td){
  console.log(td);
}

function toggleField(tag){
  if($(tag).hasClass("mutable")){
    if($(tag).find(".field").length != 0){
      let content = $(tag).find("textarea:lt(1)").val();
      $(tag).html(content);
    }else{
      let content = $(tag).html();
      //console.log($(tag) + " :: " + content);
      $(tag).html("<textarea class='field'>"+content+"</textarea>");
    }
  }
}

function saveRow(tr, type){
  let temp = $("tbody").children().index(tr);
  tr.find(".fa-save").css({"display":"none"});
  tr.find(".fa-pencil").css({display:"inherit"});
  updateRequest("/activations/"+tr.children("td:nth-child(2)").text(), createJsonBody(type,temp));
  $.each(tr.children(),function(index,val){
    toggleField(val);
  });
  index = null;
}

function editRow(tr){
  let temp = $("tbody").children().index(tr);
  if(index == null){
    index = temp;
    $.each(tr.children(),function(index,val){
      toggleField(val);
    });
    tr.find(".fa-save").css({display:"inherit"});
    tr.find(".fa-pencil").css({"display":"none"});
  }else{
    console.log("You must first finish editing the open row");
  }
}

function deleteRow(tr){
  let temp = $("tbody").children().index(tr);
  console.log("are you sure you want to delete the row at index" + temp + "?");
}

function createJsonBody(dict,row){
  if(index != null){
    let temp = {};
    let i = 0;
    $.each($("tbody tr:nth-child("+(row+1)+")").children(),function(){
      if($(this).children("button").length == 0){ // to make sure we account for the first row of buttons
        if( $(this).children("div").length > 0 ){ // then we parse the array
          let dataArray = [];
          $.each($(this).find("ul").children(), function(){
            dataArray.push($(this).text());
          });
          temp[dict[i]] = dataArray;
        }else{
          temp[dict[i]] = $(this).children("textarea:lt(1)").val();
        }
        i++;
      }
    });
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
	 error: function(err) { console.log("Sum ting wong"); console.log(err); }
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
	 error: function(err) { console.log("Sum ting wong"); console.log(err); }
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
	 error: function(err) { console.log("Sum ting wong"); console.log(err); }
  });
}
