using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net.Mail;

/// <summary>
/// Summary description for MailLogic
/// </summary>
public class MailLogic
{
	public MailLogic()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    /// <summary>
    /// Generic Function to send emails from the system.
    /// </summary>
    /// <param name="sendTo">The send to.</param>
    /// <param name="emailSubject">The email subject.</param>
    /// <param name="emailBody">The email body.</param>
    /// <returns></returns>
    public string sendEmail(string sendTo, string emailSubject, string emailBody)
    {
        MailMessage objMail = new MailMessage();
        objMail.From = new MailAddress("website@" + "wemDevelopmentCourse.com");
        string[] toArray = sendTo.Split(Convert.ToChar(";"));
        int maxForEmail = 3;
        if (toArray.Length <= 3)
        {
            maxForEmail = toArray.Length;
        }

        for (int i = 0; i < maxForEmail; i++)
        {
            try
            {
                objMail.To.Add(new MailAddress(toArray[i]));
            }
            catch (Exception ex) { };
        }
        objMail.IsBodyHtml = true;
        objMail.Subject = emailSubject;
        objMail.Body = emailBody;
        SmtpClient smtp = new SmtpClient();
        try
        {
            smtp.Send(objMail);
            return "true";
        }
        catch (Exception ex)
        {
            return "false";
        }
    }


}