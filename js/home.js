$(document).ready(function(){
    getDvds('http://dvd-library.us-east-1.elasticbeanstalk.com/dvds');
    $('#deleteModal').hide();
    $("#errorMessage").append('<p>Both Search Category and Search Term are required</p>').addClass("errMessage").hide();
    // $("#getAllDvdsButton").click(function(e)
    // {
    //     e.preventDefault();
    //     getDvds('http://dvd-library.us-east-1.elasticbeanstalk.com/dvds');

    // });

    $("#searchDvdButton").click(function(e)
    {
        e.preventDefault();
        var searchTerm=$("#searchTerm").val();
        if(validateData())
        {
            getSearchedDvd();
        }
    });
    
    $('#deleteDvdModalButton').click(function()
    {
        $('#deleteModal').modal('hide');
        var dvdId =   $('#deleteModal').attr('data-id'); 
        //alert(dvdId);
        deleteDvd(dvdId);
       
    });

    $('#createDvd').click(function(e)
    {
    // window.open().location.href="createDvd.html";   
        location.href="createDvd.html";
    });

});
function getDvds(currentUrl)
{
    console.log(currentUrl);
    $("#dvdTable > tbody"). empty();
    $.ajax(
        {
            type:'GET',
            url:currentUrl,
            success:function(dvds)
            {
                let tableBody=$("#tableBody");               
                $.each(dvds,function(index,dvd)
                {
                    console.log(dvd);
                    let row;
                    let dvdId=dvd.id;
                    let editDvd="edit_"+dvdId;
                    let deleteDvd="delete_"+dvdId;                   
                    row +='<tr scope="row">';
                    row += '<td><a href="" >'+dvd.title+'</a></td>';
                    row +='<td>'+dvd.releaseYear+'</td>';
                    row +='<td>'+dvd.director+'</td>';
                    row +='<td>'+dvd.rating+'</td>';
                    //using button click
                    // row +='<td><button value='+dvdId+' id='+editDvd+' onclick="editDvd('+dvdId+') ">Edit</button>'+
                    // " | "+'<button value='+dvdId+' id='+deleteDvd+' onclick="deleteDvd('+dvdId+')">Delete</button></td>';
                    // row +='</tr>';
                    //Using Modal
                    row +='<td><button value='+dvd+' id='+editDvd+' onClick="openEditDvd('+dvdId+')">Edit</button>'+
                    " | "+'<button data-whatever="@mdo"='+dvdId+' data-id='+deleteDvd+' data-toggle="modal" data-target="#deleteModal" onClick="openConfirmation('+dvdId+')">Delete</button></td>';
                    row +='</tr>';  
                    
                    tableBody.append(row);
                })   
            },
            error:function()
            {
                alert("error");
            }
        }
    )
}

function openConfirmation(dvdId)
{
    //var id = $(e.relatedTarget).data('id');
    alert("hello");        
    $('#deleteModal').show(); 
//     $('#mydiv').attr('data-myval', 'Undertaker'); // sets 
//  $('#mydiv').attr('data-myval'); // gets
    $('#deleteModal').attr('data-id',dvdId) ; 
}
function openEditDvd(dvdId)
{
   // alert(dvdId);
    //let B = {dvd:dvdId};
    //let w=window.open();
    localStorage.setItem("dvdId", dvdId);
    location.href="editDvd.html";
    //w.dvdId=dvdId;
    //alert("I am back in home");
    //window.top.close();
    getDvds('http://dvd-library.us-east-1.elasticbeanstalk.com/dvds');
}

function validateData()
{
    let searchCategory=$('#searchCategory option:selected').val();
    let searchTerm=$("#searchTerm").val();
    console.log(searchCategory);
    console.log(searchTerm);
    if(searchCategory == "")
    {
        //alert("select category");
        $("#errorMessage").show();
        $('#searchCategory').focus();
        return false;
    }
    if(searchTerm==0)
    {
        //alert("please enter term");
        $("#errorMessage").show();
        $('#searchTerm').focus();
        return false;
    }
    
    
    // if(searchCategory=="title")
    //                 {
    //              //console.log('http://dvd-library.us-east-1.elasticbeanstalk.com/dvds/title/'+searchTerm)  ;
    //              getSearchedDvd('http://dvd-library.us-east-1.elasticbeanstalk.com/dvds/title/'+searchTerm) ;    
    //                 }

    return true;
}
function getSearchedDvd()
{
    //var searchUrl='http://dvd-library.us-east-1.elasticbeanstalk.com/dvds/title/'+$("#searchTerm").val();
    if($('#searchCategory option:selected').val()=="year")
    {
        let searchUrl='http://dvd-library.us-east-1.elasticbeanstalk.com/dvds/'+$('#searchCategory option:selected').val()+'/'+parseInt($("#searchTerm").val());

    }
    let searchUrl='http://dvd-library.us-east-1.elasticbeanstalk.com/dvds/'+$('#searchCategory option:selected').val()+'/'+$("#searchTerm").val();
    console.log(searchUrl);
    $("#dvdTable > tbody"). empty();
    $.ajax(
        {
            type:'GET',
            url:searchUrl,
            success:function(dvds)
            {
                var tableBody=$("#tableBody");
                $.each(dvds,function(index,dvd)
                {
                    var row;
                    var dvdId=dvd.id;
                    var editDvd="edit_"+dvdId;
                    var deleteDvd="delete_"+dvdId;
                    row +='<tr scope="row">';
                    row += '<td><a href="" >'+dvd.title+'</a></td>';
                    row +='<td>'+dvd.releaseYear+'</td>';
                    row +='<td>'+dvd.director+'</td>';
                    row +='<td>'+dvd.rating+'</td>';
                    // row +='<td><button value=dvdId id=editDvd href="">Edit</button>'+
                    // " | "+'<button value=dvdId id=deleteDvd href="">Delete</button></td>';
                   // row +='<td><button >Edit</a>'+" | "+'<a href="">Delete</a></td>';
                   row +='<td><button type="submit" value='+dvd+' id='+dvdId+' onClick="openEditDvd('+dvdId+')">Edit</button>'+
                    " | "+'<button data-whatever="@mdo"='+dvdId+' data-id='+deleteDvd+' data-toggle="modal" data-target="#deleteModal" onClick="openConfirmation('+dvdId+')">Delete</button></td>';
                    row +='</tr>';
                    row +='</tr>';
                    tableBody.append(row);
                })   
            },
            error:function()
            {
                alert("error");
            }
        }
    );
console.log("after ajax");
}
function test(searchUrl)
{
    $.ajax(
        {
            type:'GET',
            url:searchUrl,
            success:function()
            {
                alert("success");
            },
            error:function()
            {
                alert("error");
            }
        
        }
    );
}


function deleteDvd(dvdId)
{
    //alert("in delete method");
    let deleteDvdUrl='http://dvd-library.us-east-1.elasticbeanstalk.com/dvd/'+dvdId;
    //alert(deleteDvdUrl);
    $.when(deleteAjax(deleteDvdUrl)).done(function ()
        {
            getDvds('http://dvd-library.us-east-1.elasticbeanstalk.com/dvds');
    
        });
         
}



function deleteAjax(deleteDvdUrl)
{
    return $.ajax(
        {
            type:'DELETE',
            url:deleteDvdUrl,
            success:function(dvds)
            {
                alert("deleted successfully");                
               
            },
            error:function()
            {
                alert("error");
            }
        }
        );
}
