import { URLSearchParams } from "url";
import { addCommentInChannel, openCommentDialog, addComment, updateIncident } from "../tasks"

export async function apiSlackAction(eventBody: string) {
  const params = new URLSearchParams(eventBody)
  const payload: any = params.get("payload")
  const payloadObject: any = JSON.parse(payload)
  const callbackId: string = payloadObject.callback_id
  const slackChannelName: string = payloadObject.channel.name

  console.log("apiSlackAction Payload RCVD", JSON.stringify(payloadObject))

  // if it's an incident, the callback_id will be the incident number
  // Update the Ticket
  if (!isNaN(parseInt(callbackId))) {

    const { severity, incidentCategory, rootCauseClassification } = payloadObject.submission
    const response = await updateIncident(callbackId, severity, incidentCategory, rootCauseClassification)

    return response
  }
  console.log("apiSlackAction Payload RCVD", payloadObject)
  switch (callbackId) {
    case 'comment': // If the payload is a comment
      console.log("COMMENT RCVD")

      // if the SlackChannel is a pre-made incident channel, use that ID to set the JIRA ticket ID
      if (slackChannelName.includes('incident-')) {
        console.log("COMMENT FROM AN INCIDENT CHANNEL RCVD")
        await addCommentInChannel(payloadObject)
      } else {
        console.log("COMMENT FROM AN non-incident CHANNEL RCVD")
        await openCommentDialog(payloadObject)
      }
      return {}
      break;

    case 'dialog': //if the payload is a reponse to a dialog
      console.log("DIALOG RCVD")

      // add comment with dialog return
      await addComment(payloadObject)
      return {}
      break;
    default:
      console.log("UNKNOWN INTERACTION CALLBACK", callbackId)
      return {}
      break;
  }
}