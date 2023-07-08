import { SLACK, OPSGENIE } from "../clients";
import { SlackMessagePayload } from '../types';

export async function whoIsOnCall() {
  // get the Snr Dev On Call
  const devOnCallEmail = await OPSGENIE.devOnCall()
  const { id : devOnCallSlack} = await SLACK.lookupUserByEmail(devOnCallEmail)
  const devOnCall = devOnCallEmail.replace('@acorns.com','')
  console.log("Senior Dev on Call", devOnCall)

  // get the Incident Manager On Call
  const incidentManagerOnCallEmail = await OPSGENIE.incidentManagerOnCall()
  const { id : incidentManagerOnCallSlack} = await SLACK.lookupUserByEmail(incidentManagerOnCallEmail)
  const incidentManagerOnCall = incidentManagerOnCallEmail.replace('@acorns.com','')
  console.log("Techops on Call", incidentManagerOnCall)

  // Post the SRE in the incident channel
  const onCallSlackPayload: SlackMessagePayload = {
    "channel": "#sre",
    "attachments": [
        {
            "fallback": "This week's Incident Manager and Senior Dev on Call",
            "color": "#cc3300",
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

  await SLACK.postMessage(onCallSlackPayload)

  // post in Incidents
  onCallSlackPayload.channel = "#incidents"
  await SLACK.postMessage(onCallSlackPayload)
}; 
