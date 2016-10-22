<%@ WebHandler Language="C#" Class="Handler" %>

using System;
using System.Web;

public class Handler : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        string sendTo = context.Request["sendTo"].ToString();
        string theMailBody = context.Request["theMailBody"].ToString();
        string jsonp = context.Request["callback"];

        theMailBody = theMailBody.Substring(0, theMailBody.LastIndexOf("$"));
        string[] outerArray = theMailBody.Split(Convert.ToChar("$"));
        theMailBody = "<div dir='rtl'>";
        
        foreach (string s in outerArray)
        {
            string[] innerArray = s.Split(Convert.ToChar("^"));
            theMailBody += "<b>" + innerArray[0].Trim() + "</b><br />";
            theMailBody += "<p>" + innerArray[1].Trim() +"</p>";
        }
        theMailBody += "</div>";
        MailLogic ml = new MailLogic();
        
        string jsonStr = "{'msg':" + ml.sendEmail(sendTo,"קיבלת הודעה מהאתר",context.Server.UrlDecode(theMailBody)) + "}";
        
        if (!String.IsNullOrEmpty(jsonp))
        {
            jsonStr = jsonp + "(" + jsonStr + ")";
        }
        context.Response.ContentType = "application/json";
        context.Response.Write(jsonStr);
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}