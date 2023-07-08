import { CreateIncidentPayload } from "../types";
import { createIncident } from "../tasks/createIncident"
import { URLSearchParams } from "url";
import { openUpdateDialog } from "../tasks/openUpdateDialog";

export async function apiSlack(eventBody: string) {
  console.log('Quick Incident Submission')
  const params = new URLSearchParams(eventBody)
  const userId = params.get("user_id") as string
  const text = params.get("text") as string
  const triggerId = params.get("trigger_id") as string

  console.log("submission trigger ID", triggerId)

  const incident: CreateIncidentPayload = {
    userId: userId,
    summary: text.split('.')[0],
    description: text
  }
  const response = await createIncident(incident)
  const { incidentId, slackResponse } = response

  await openUpdateDialog(incidentId, triggerId)
  return slackResponse
}