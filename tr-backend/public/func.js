$(".bg-filter").on("click", function(){ toggleEditPanel(); });
$(".ul-container").on("click", function(){ toggleEditPanel(); generateArrayTable($(this))});
$(".mutable").on("click", function(){ editRow($(this).parent())});

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
      console.log($(tag) + " :: " + content);
      $(tag).html("<textarea class='field'>"+content+"</textarea>");
    }
  }
}


function editRow(tr){
  $.each(tr.children(),function(index,val){
    toggleField(val);
  });
}
