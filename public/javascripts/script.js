window.onload = function(){
    console.log("on load call");
    document.getElementById('image0').style.display = 'block';
}

function saveLike(){
    var id = $('.container:visible').prop("id");
    $('#'+id+' :input').val("like");
    $('#'+id).hide();
    var next = id.substr(0,id.length-1) + (parseInt(id.substr(id.length-1)) + 1);
    if ($('#'+next).length == 1) {
        $('#'+next).show();
    } else {
        saveResponse();
    }
}

function saveResponse(){
    list = [];
    $('.container:hidden').each(function(){
        var id = $(this).prop("id");
        var index = parseInt(id.substr(id.length-1));
        //console.log($('#img'+index).attr('src'));
        //console.log(id);
        var elem = {
            "image": $('#img'+index).attr('src'), 
            "response": $('#'+id+' :input').val()
        }
        list.push(elem);
    });
    data = {
        "id": $('#userId').val(),
        "responses" : list
    };
    console.log(data);
    /*$.ajax({
        url: "/saveResponse",
        type: "POST",
        data: data,
        success: function(data){
            console.log(JSON.stringify(data));
        }
    })*/
}

function saveDislike(){
    var id = $('.container:visible').prop("id");
    $('#'+id+' :input').val("dislike");
    $('#'+id).hide();
    var next = id.substr(0,id.length-1) + (parseInt(id.substr(id.length-1)) + 1);
    if ($('#'+next).length == 1) {
        $('#'+next).show();
    } else {
        saveResponse();
    }
}
