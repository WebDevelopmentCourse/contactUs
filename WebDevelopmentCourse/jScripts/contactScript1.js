var myEmail = "";
var successFeedback = "ההודעה נשלחה בהצלחה";
var failFeedback = "היתה בעיה בשליחת ההודעה, אנא נסה מאוחר יותר";
var serverName = "";
//serverName = "http://webdevelopmentcourse.telem-hit.net/"
serverName = "https://webdevelopmentcourse.github.io/contactUs/WebDevelopmentCourse/";

var ajaxLoaderImageURL = serverName + "images/ajaxLoader.gif";



$(function () {
    myEmail = $("input#myEmail").val();
    var theEmailString = "";
    $("input[type='submit']").click(function () {
        theEmailString = getFormValue();
        send2Server(theEmailString);
        return false;
    });

    // we set the ajaxLoaderImageFromTheStart
    addAjaxLoaderToFeedbackDiv();
});


function getFormValue() {
    var theString = "";
    $("form label").each(function () {
    
        var theId = "";
        var theTitle = "";
        var theValue = "";

        theId = $(this).attr("for");
        theTitle = $(this).text();

        $(this).children().each(function () {
        
           if($(this).is("input"))
           {
              if($("#" + theId).attr("type")=="radio" && $("#" + theId).is(':checked'))
               {
              theValue +=$("#" + theId).text() + " + ";         
                }
           else if($("#" + theId).attr("type")=="checkbox" && $("#" + theId).is(':checked'))
           {
               theValue += $("#" + theId).text() + " + "; 
           }
           else if($("#" + theId).attr("type")=="text" || $("#" + theId).attr("type")=="password")
           {
              theValue = $(theId).text();
           }
        }
        else if($(this).next().is("select"))
        {
           var optionValue = $("#" + theId).val();
           theValue = $("#" + theId).find("option[value='" + optionValue + "']").text();
        }
        else if($(this).next().is("textarea"))
        {
           theValue = $("textarea#" + theId).text();
        }
        
        
        });  
      

        theString += "<b>"+ theTitle + " : "+ "</b>" ;
        theString += theValue + "<br/>";

    });
    return theString;
}


function send2Server(str) {
    showAjaxLoader();
    console.log("str: "+ str);
    console.log("myEmail: "+ myEmail);
     var theServer = "https://wwws.hit.ac.il/facebook/telemDev/TelemWebDevelopmentCourseContact_me.php";
        $.ajax({
                url: theServer,
                type: "POST",
                data: {
                    theMailBody: str,
                    sendTo: myEmail,
                },
                cache: false,
                complete : function(data) {
                console.log(data.statusText);
                hideAjaxLoader();
                $("div#feedback").html("");
                addAjaxLoaderToFeedbackDiv();
                if(data.statusText =="OK"){ 
                        $("div#feedback").append(successFeedback);
                        $("div#feedback").css("color", "green");
                }
                else{
                       $("div#feedback").append(failFeedback);
                       $("div#feedback").css("color", "red");
                }
            }
           
  });
}



function myEncode(str) {
  // return encodeURIComponent(str).replace(/\'/g, "%27");
   // return encodeURIComponent(str).replace(/\'/g, "</br>");
}

function addAjaxLoaderToFeedbackDiv() {
    $("div#feedback").append("<div id='ajaxLoaderDiv' style='display:none;'><img src='" + ajaxLoaderImageURL + "' alt='ajaxLoader' /></div>");
}

function showAjaxLoader() {
    $("div#ajaxLoaderDiv").fadeIn();
}

function hideAjaxLoader() {
    $("div#ajaxLoaderDiv").fadeOut();
}
