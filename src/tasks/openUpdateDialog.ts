import { SLACK } from "../clients"

export async function openUpdateDialog(callbackId: string, triggerId: string) {

  const dialogPayload: any = {
    "trigger_id": triggerId,
    "dialog": {
      "callback_id": callbackId,
      "title": "Update Incident",
      "submit_label": "Submit",
      "state": "updating",
      "elements": [
        {
          "label": "Choose a severity",
          "type": "select",
          "name": "severity",
          "options": [
            {
              "label": "SEV1",
              "value": "SEV1"
            },
            {
              "label": "SEV2",
              "value": "SEV2"
            },
          ]
        },
        {
          "label": "Incident Category",
          "type": "select",
          "name": "incidentCategory",
          "options": [
            {
              "label": "Registration",
              "value": "Registration"
            },
            {
              "label": "Money Movement",
              "value": "Money Movement"
            },
            {
              "label": "Availability",
              "value": "Availability"
            },
            {
              "label": "Security",
              "value": "Security"
            },
            {
              "label": "Support",
              "value": "Support"
            },
            {
              "label": "Other",
              "value": "Other"
            }
          ]
        },
        {
          "label": "Root Cause",
          "type": "select",
          "name": "rootCauseClassification",
          "options": [
            {
              "label": "Application Bug",
              "value": "Application Bug"
            },
            {
              "label": "Database capacity",
              "value": "Database capacity"
            },
            {
              "label": "Security Vulnerability",
              "value": "Security Vulnerability"
            },
            {
              "label": "Incident Response",
              "value": "Incident Response"
            },
            {
              "label": "Monitoring/Alerting Deficiency",
              "value": "Monitoring/Alerting Deficiency"
            },
            {
              "label": "External Partner",
              "value": "External Partner"
            },
            {
              "label": "Application Dependency",
              "value": "Application Dependency"
            },
            {
              "label": "Error in change execution",
              "value": "Error in change execution"
            },
            {
              "label": "Other",
              "value": "Other"
            }
          ]
        }
      ]
    }
  }

  const response = await SLACK.openDialog(dialogPayload)
  return response
}