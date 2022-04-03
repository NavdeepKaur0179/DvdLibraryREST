$(document).ready(function()
{
let dvdId = localStorage.getItem("dvdId");
console.log(dvdId);   
getDvd(dvdId);     
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
            // $('#dvdTitle').attr('value',dvd.title); 
            //$('#dvdTitle').val(dvd.title);  
            
            //document.getElementById('#dvdTitle').value = "Tamer Jarrar";
            console.log(dvd.id);
            
            console.log(dvd.title);
           // $('input:text').val(dvd.title); 
        },
        error:function()
        {
            alert("error in get dvd");
        }

    });
   
}
function setValuesinForm(currentDvd)
{
    document.getElementById(dvdTitle).val=currentDvd.title;
}