var successFeedback = "ההודעה נשלחה בהצלחה";
var failFeedback = "היתה בעיה בשליחת ההודעה, אנא נסה מאוחר יותר";
var serverName = "";
serverName = "http://webdevelopmentcourse.telem-hit.net/"
var ajaxLoaderImageURL = serverName + "images/ajaxloader.gif";


$(function () {
    
    addAjaxLoaderToFeedbackDiv()
    $("input[type='submit']").click(function (e) {
        
        var emailObject = getEmailBody();
        var emailText = parseEmailObject(emailObject);
        send2Server($("input#myEmail").val(),emailText);
        e.preventDefault()
    });

 
});

function getEmailBody() {
    var emailObject = [];
    $("form .form-group").each(function () {
        var obj = {};
        obj.title = $(this).find("label:first-child").text();
        obj.value = getGroupValue($(this));
        emailObject.push(obj);
    });
    return emailObject;
}

function parseEmailObject(emailObject) {
    var body = "";
    for (var i = 0; i < emailObject.length; i++) {
        body += $.trim(emailObject[i].title) + "^";
        if(typeof emailObject[i].value == 'object'){
            arr = emailObject[i].value;
            for (var j = 0; j < arr.length; j++) {
                body += $.trim(arr[j].title) + " : " + $.trim(arr[j].value) + ", ";
            }
            body = body.substr(0, body.length - 2);
        }else{
            body += $.trim(emailObject[i].value);
        }
        body += "$";
    }
    return body;
}

function checkIfRadio(group) {
    var items = group.find("input[type='radio']");
    if (items.length > 0) {
        return group.find("input[type='radio']:checked").parent().text();
    } else {
        return false;
    }
    
}

function checkIfCheckboxes(group) {
    var items = group.find("input[type='checkbox']");
    if (items.length > 0) {
        var arr = [];
        items.each(function () {
            var obj = {};
            obj.title = $(this).parent().text();
            if ($(this).is(":checked")) {
                obj.value = "כן";
            } else {
                obj.value = "לא";
            }
            arr.push(obj);
        });
        return arr;
    } else {
        return false;
    }
}

function checkIfSelect(group) {
    
    var items = group.find("select");
    if (items.length > 0) {
        return group.find("select option:selected").text();
    } else {
        return false;
    }
}

function checkIfTextInput(group) {
    var items = group.find("textarea,input");
    if (items.length > 0) {
        return group.find("textarea,input").val();
    } else {
        return false;
    }
}



function getGroupValue(group) {
    var radioCheckedText = checkIfRadio(group);
    if (radioCheckedText) {
        return radioCheckedText;
    }

    var checkBoxObject = checkIfCheckboxes(group);
    if (checkBoxObject) {
        return checkBoxObject;
    }

    var selectText = checkIfSelect(group);
    if (selectText) {
        return selectText;
    }

    var simpleTextObjectValue = checkIfTextInput(group);
    return simpleTextObjectValue;
    
}

function send2Server(email,str) {
    showAjaxLoader();
    var theServer = serverName + "handler.ashx?callback=?";
    var theVars = "&sendTo=" + myEncode(email) + "&theMailBody=" + myEncode(str);
    $.getJSON(theServer + theVars,
    function (json) {
        hideAjaxLoader();
        $("div#feedback").html("");
        $("div#feedback").removeClass("alert");
        $("div#feedback").removeClass("alert-success");
        $("div#feedback").removeClass("alert-danger");
        addAjaxLoaderToFeedbackDiv();
        if (json.msg == true) {
            $("div#feedback").append(successFeedback);
            $("div#feedback").addClass("alert");
            $("div#feedback").addClass("alert-success");
        } else {
            $("div#feedback").append(failFeedback);
            $("div#feedback").addClass("alert");
            $("div#feedback").addClass("alert-danger");
        }
    });
}



function myEncode(str) {
    return encodeURIComponent(str).replace(/\'/g, "%27");
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