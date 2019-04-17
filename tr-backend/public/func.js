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

    }else{
      let content = $(tag).html();
      //console.log($(tag) + " :: " + content);
      $(tag).html("<textarea class='field'>"+content+"</textarea>");
    }
  }
}

function editRow(tr){
  let temp = $("tbody").children().index(tr);

  if(index == null){
    index = temp;
    $.each(tr.children(),function(index,val){
      toggleField(val);
    });
  }else{
    console.log("You must first finish editing the open row");
  }
}

function deleteRow(tr){
  let temp = $("tbody").children().index(tr);
  console.log("are you sure you want to delete the row at index" + temp + "?");
}

function createJsonBody(dict){
  if(index != null){
    let temp = {};
    let i = 0;
    $.each($("tbody tr:nth-child("+(index+1)+")").children(),function(){
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
    });
    return JSON.stringify(temp);
  }
}

function updateRow(url,data){ // PUT
  console.log(data);
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
