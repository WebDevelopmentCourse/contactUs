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
    $("body [rel]").each(function () {

        var theId = "";
        var theTitle = "";
        var theValue = "";

        if ($(this).attr("rel") != null) {
            theId = $(this).attr("rel");
            theTitle = $(this).text();
            // dealing with radiobutton
            if ($("#" + theId).find("input").is(":visible")) {
                $("#" + theId).find("input").each(function () {
                    if ($(this).is(':checked')) {
                        theValue += $("label[for='" + $(this).attr("id") + "']").text() + " + ";
                    }
                });
            } else {  // if not radiobutton
                theTitle = $(this).text();
                if ($("textarea#" + theId).is(":visible")) {
                    theValue = $("textarea#" + theId).text();
                    theValue = $.trim(theValue);
                    if (theValue == "") {
                        theValue = $("textarea#" + theId).val();
                    }
                } else if ($("select#" + theId).is(":visible")) {
                    var optionValue = $("#" + theId).val();
                    theValue = $("#" + theId).find("option[value='" + optionValue + "']").text();
                } else {
                    theValue = $("#" + theId).val();
                }
            }

        } else { // this is a checkbox
            theId = $(this).attr("id");
            theTitle = $("label[for='" + theId + "']").text();
            if ($(this).is(':checked')) {
                theValue = "כן";
            } else {
                theValue = "לא";
            }

        }

        theString += theTitle + "^";
        theString += theValue + "$";

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
             dataType: "jsonp",
                data: {
                    theMailBody: str,
                    sendTo: myEncode(myEmail),
                },
                cache: false,
                complete : function(data) {
                console.log(data.statusText);
                hideAjaxLoader();
                $("div#feedback").html("");
                addAjaxLoaderToFeedbackDiv();
                if(data.statusText =="success"){ 
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
  //  return encodeURIComponent(str).replace(/\'/g, "%27");
    return encodeURIComponent(str).replace(/\'/g, "</br>");
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
