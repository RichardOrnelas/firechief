# fire-chief
Serverless Incident Manager

![architecture][architecture]

Fire Chief is a Slack bot aimed at helping create and manage incidents.

Functions : 
* create a new incident
* send updates on tickets to Slack channels
* daily reports

*Create an Incident*
To create an incident, type `/incident < your incident description >` in Slack. The first sentence of your description will be the title of the Incident, so in the example `/incident Foo Service is down. Foo service was overloaded by traffic.` "Foo Service is down." would be the title of the Incident. TLDR, Make the first sentence short and sweet. Next, Chief will ask you to set the severity based on the classification the incident falls under. This is not mandatory to create the ticket, but may trigger enhanced functionality behind the scenes. 

Behind the scenes, Chief will make a JIRA ticket, assigning the 'reporter' to whoever reported the issue. It will also assign the ticket to the Senior Dev on Call and Techops On Call, polled from OpsGenie. Next, Chief will post a notification to the #incidents channel in Slack with a link to the JIRA ticket.

If the ticket is Severity 1, Chief will also create a Slack channel with the name of the incident, and invite all of the related folks via a notification to the channel. Feel free to invite everyone else to this channel and facilitate conversation regarding the incident here.

![addIncident][addIncident]

*Add a Comment to an Incident*

Adding a comment to an incident is easy to do in the context of a Slack conversation. Simply click the Actions button on a message and select "Add as a comment" from 'Acorns Incident Manager'. If the message is from an incident-specific channel, it will be automatically added to the related issue in JIRA. Alternatively, a dialog will appear and ask you to select the related incident from a list of open incidents. 
![addComment2][addComment2]
![addComment][addComment]

### To Deploy
`make deploy stage=production`

Future : 
* Identify On-Call personel via OpsGenie API
* Enhance daily reports
* resolve incidents, including archiving Slack channels and adding the link to "Slack" field in JIRA issue.

[architecture]: ./docs/incidentManager.png "Architecture Image" 
[addIncident]: ./docs/addIncident.png "Add Incident Image" 
[addComment2]: ./docs/addComment2.png "Add Comment Image" 
[addComment]: ./docs/addComment.png "Add Comment Image" 