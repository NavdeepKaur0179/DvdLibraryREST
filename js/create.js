$(document).ready(function()
{
    $('#cancelButton').click(function(e)
    {
        e.preventDefault();
        location.href="home.html";
    });

    $('#createButton').click(function(e)
    { 
                let currentDvd={
                title: $("#dvdTitle").val() ,
                releaseYear: $("#releaseYear").val(),
                director:$("#director").val(),
                rating: $("#rating").val(),
                notes: $("#notes").val()
                };
                e.preventDefault();
                createDvd(currentDvd);
                alert("Created successfully");
                location.href="home.html";
                //window.top.close();      
    
    }); 
});


function createDvd(currentDvd)
{
    let createDvdUrl='http://dvd-library.us-east-1.elasticbeanstalk.com/dvd';
    alert("in create method");
    $.when(createAjax(createDvdUrl,currentDvd)).done(function ()
    {
        alert("Created successfully in createDvd");
        //getDvds('http://dvd-library.us-east-1.elasticbeanstalk.com/dvds');​
    });

}
function createAjax(createDvdUrl,currentDvd)
{
    return  $.ajax(
        {
            type:'POST',
            url:createDvdUrl,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(currentDvd),
            success:function(dvd)
            {
                alert("created successfully in ajax"+dvd.id);
                   
            },
            error:function(xhr, response, error)
            {
                alert("error");
            }
        }
    );
}