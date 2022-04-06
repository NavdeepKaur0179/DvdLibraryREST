$(document).ready(function()
{
let dvdId = localStorage.getItem("dvdId");
console.log(dvdId);   
getDvd(dvdId);
$('#cancelButton').click(function(e)
{
    e.preventDefault();
    location.href="home.html";
});
$('#saveButton').click(function(e)
{   
    let currentDvd={
    id: dvdId,
    title: $("#dvdTitle").val() ,
    releaseYear: $("#releaseYear").val(),
    director:$("#director").val(),
    rating: $("#director").val(),
    notes: $("#notes").val()
    };
    e.preventDefault();
    editDvd(currentDvd);
    alert("Edited successfully");
    location.href="home.html";
    //window.top.close();
}); 
}); 
function getDvd(dvdId)
{
  let getUrl="http://dvd-library.us-east-1.elasticbeanstalk.com/dvd/"+dvdId;
   $.ajax({
        type:'GET',
        url:getUrl,
        success:function(dvd)
        {
            alert("get successfully");           
            $('#dvdHeader').append(' '+dvd.title); 
            $('#dvdTitle').val(dvd.title);  
            $('#releaseYear').val(dvd.releaseYear);  
            $('#director').val(dvd.director); 
            $('#rating').val(dvd.rating).change();
            $('#notes').val(dvd.notes);  
        },
        error:function()
        {
            alert("error in get dvd");
        }
    });
   
}
function editDvd(currentDvd)
{
    let editDvdUrl='http://dvd-library.us-east-1.elasticbeanstalk.com/dvd/'+currentDvd.id;
    alert("in edit method");
    $.when(editAjax(editDvdUrl,currentDvd)).done(function ()
    {
        alert("Edited successfully in edit Dvd");
        //getDvds('http://dvd-library.us-east-1.elasticbeanstalk.com/dvds');​
    });
}
function editAjax(editDvdUrl,currentDvd)
{
    return  $.ajax(
        {
            type:'PUT',
            url:editDvdUrl,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(currentDvd),
            success:function()
            {
                alert("Edited successfully");
                   
            },
            error:function(xhr, response, error)
            {
                alert("error");
            }
        }
    );
}