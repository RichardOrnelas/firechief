import { SLACK } from "../clients"

export async function openCommentDialog(params: any) {
  const triggerId: string = params.trigger_id
  const comment: string = params.message.text
  const user: string = params.message.user

  const dialogPayload: any = {
    "trigger_id": triggerId,
    "dialog": {
      "callback_id": "dialog",
      "title": "Add a Comment",
      "submit_label": "Submit",
      "state": `${user} ${comment}`,
      "elements": [
        {
          "label": "Open Incidents",
          "name": "incidentId",
          "type": "select",
          "data_source": "external"
        }
      ]
    }
  }
  const response = await SLACK.openDialog(dialogPayload)
  return response
}