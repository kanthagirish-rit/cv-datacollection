window.onload = function(){
    console.log("on load call");
    document.getElementById('image0').style.display = 'block';
}

function saveLike(){
    var id = $('.container:visible').prop("id");
    $('#'+id+' :input').val("like");
    switchImage(id);
}

function saveResponse(){
    list = [];
    $('.container:hidden').each(function(){
        var id = $(this).prop("id");
        var index = parseInt(id.substr(id.length-1));
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
    $.ajax({
        url: "/saveResponse",
        type: "POST",
        data: data,
        dataType: "json",
        success: function(data){
            console.log(JSON.stringify(data));
        }
    })
}

function switchImage(id){
    $('#'+id).hide();
    var index = id.indexOf("e") + 1;
    var next = id.substr(0,index) + (parseInt(id.substr(index)) + 1);
    console.log(next);
    if ($('#'+next).length == 1) {
        $('#'+next).show();
    } else {
        $('.images').hide();
        $('.names').show();
        saveResponse();
    }
}

function saveDislike(){
    var id = $('.container:visible').prop("id");
    $('#'+id+' :input').val("dislike");
    switchImage(id);
}
