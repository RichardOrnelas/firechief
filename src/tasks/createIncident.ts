import { JIRA, SLACK, OPSGENIE } from "../clients";
import { CreateTicketPayload, CreateIncidentPayload, SlackMessagePayload } from '../types';

export async function createIncident(payload: CreateIncidentPayload) {
  console.log("NEW INCIDENT REPORT:", JSON.stringify(payload))

  // parse out the payload 
  const summary: any = payload.summary
  const description: any = payload.description

  // get the slack user profile
  // FUTURE : Should verify that the user is a slack user at all and not a Lex user
  const reporterSlack: string = payload.userId
  const reporterSlackProfile = await SLACK.getUserProfile(reporterSlack)
  const reporterEmail = reporterSlackProfile.email
  const reporterName = reporterSlackProfile.first_name + " " + reporterSlackProfile.last_name
  const reporter = reporterEmail.replace('@acorns.com', '')
  console.log("Reported by", reporterName, reporterEmail)

  // get the Snr Dev On Call
  const devOnCallEmail = await OPSGENIE.devOnCall()
  const { id: devOnCallSlack } = await SLACK.lookupUserByEmail(devOnCallEmail)
  const devOnCall = devOnCallEmail.replace('@acorns.com', '')
  console.log("Senior Dev on Call", devOnCall)

  // get the Incident Manager On Call
  const incidentManagerOnCallEmail = await OPSGENIE.incidentManagerOnCall()
  const { id : incidentManagerOnCallSlack} = await SLACK.lookupUserByEmail(incidentManagerOnCallEmail)
  const incidentManagerOnCall = incidentManagerOnCallEmail.replace('@acorns.com','')
  console.log("Incident Manager on Call", incidentManagerOnCall)

  // Now let's make a ticket
  const createTicketPayload: CreateTicketPayload = {
    summary: summary,
    reporter: reporter,
    assignee: devOnCall,
    incidentManagerOnCall: incidentManagerOnCall,
    description: description
  }

  const resp = await JIRA.createTicket(createTicketPayload)
  console.log("JIRA", resp)

  const incidentKey = resp.key
  const incidentId = incidentKey.replace('TO-', '')
  const incidentLink = `https://acorns.atlassian.net/browse/${incidentKey}`

  // Post the incident in the SRE channel
  const incidentSlackPayload: SlackMessagePayload = {
    "channel": "#sre",
    "attachments": [
        {
            "fallback": "Your incident has been created",
            "color": "#cc3300",
            "title": `Incident ${incidentId} - ${summary}`,
            "title_link": incidentLink,
            "fields": [
              {
                    "title": "Senior Dev on Call",
                    "value": `<@${devOnCallSlack}>`,
                    "short": true
                },
				{
                    "title": "Incident Manager",
                    "value": `<@${incidentManagerOnCallSlack}>`,
                    "short": true
                }
            ]
        }
    ]
  }

  await SLACK.postMessage(incidentSlackPayload)

  // post in Incidents Channel
  incidentSlackPayload.channel = "#incidents"
  await SLACK.postMessage(incidentSlackPayload)

  // return to slack user who submitted
  const slackResponse: any = {
    "text": `Incident ${incidentId} has been created by <@${reporterSlack}>`,
    "response_type": "in_channel",
    "attachments": [
      {
        "fallback": "Your incident has been created",
        "color": "#cc3300",
        "title": summary,
        "title_link": incidentLink,
        "fields": [
          {
            "title": "Senior Dev on Call",
            "value": `<@${devOnCallSlack}>`,
            "short": true
          },
          {
            "title": "Incident Manager",
            "value": `<@${incidentManagerOnCallSlack}>`,
            "short": true
          }
        ]
      }
    ]
  }

  return ({ incidentId, slackResponse })

};



