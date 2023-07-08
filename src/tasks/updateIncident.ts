import { JIRA } from "../clients"
// import { SlackMessagePayload } from "../types"

export async function updateIncident(callbackId: string, severity: string, incidentCategory: string, rootCauseClassification: string) {
  await JIRA.updateTicket(callbackId, severity, incidentCategory, rootCauseClassification)

  if (severity === 'SEV1') {
    console.log("SEV 1 protocol initiated")
    // const newSlackChannelId: string = `incident-${callbackId}`
    // await SLACK.joinChannel(newSlackChannelId)

    // const incidentLink = `https://acorns.atlassian.net/browse/TO-${callbackId}`

    // // Post the incident in the incident channel
    // const incidentSlackPayload: SlackMessagePayload = {
    //   "channel": `#${newSlackChannelId}`,
    //   "attachments": [
    //     {
    //       "fallback": "Your incident has been created",
    //       "color": "#cc3300",
    //       "title": `${callbackId}`,
    //       "title_link": incidentLink,
    //     }
    //   ]
    // }
    // await SLACK.postMessage(incidentSlackPayload)
  }
  const response: any = {
    "text": `Incident ${callbackId} has been updated with ${severity}`
  }
  console.log("SLACK.Response", response)
  return response
}
