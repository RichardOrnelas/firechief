import axios, { AxiosInstance } from "axios";
import { CreateTicketPayload } from "../types"
// Constants
export const JIRA_API_KEY = process.env.JIRA_API_TOKEN as string
export const JIRA_USER = process.env.JIRA_USER as string

// Actual Client
class Jira {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: "https://acorns.atlassian.net/rest/api/",
      headers: {
        "Content-Type": "application/json"
      },
      auth: {
        username: JIRA_USER,
        password: JIRA_API_KEY
      }
    })
  }

  public async createTicket(ticketPayload: CreateTicketPayload) {
    const payload = {
      "fields": {
        "project":
        {
          "key": "TO"
        },
        "issuetype": {
          "name": "Incident"
        },
        "summary": ticketPayload.summary,
        "reporter": { "name": ticketPayload.reporter },

        "assignee": { "name": ticketPayload.assignee },
        // "customfield_12713": { "value": ticketPayload.severity },
        "customfield_12764": { "value": ticketPayload.incidentManagerOnCall },
        "description": ticketPayload.description
      }
    }

    try {
      const response = await this.api.post("/2/issue", payload)
      console.log("JIRA.createTicket", response.data)
      return response.data
    } catch (error) {
      console.log("JIRA.createTicket", error)
      console.log("JIRA.createTicket Payload", payload)
    }
  }

  public async updateTicket(id: string, severity: string, incidentCategory: string, rootCauseClassification: string) {
    const payload: any = {
      "fields": {
        "customfield_12713": { "value": severity },
        "customfield_12787": { "value": incidentCategory },
        "customfield_12788": { "value": rootCauseClassification }
      }
    }

    try {
      const response = await this.api.put(`/3/issue/TO-${id}`, payload)
      console.log("JIRA.updateTicket", response.data)
      console.log("JIRA.updateTicket", response)
      return response.data
    } catch (error) {
      console.log("JIRA.updateTicket", error)
      console.log("JIRA.updateTicket Payload", payload)
    }
  }

  public async getOpenTickets() {
    const payload: any = {
      "jql": "project = 'TO' AND resolution = 'Unresolved' AND issuetype = 'Incident'",
      "startAt": 0,
      "maxResults": 15,
      "fields": [
        "summary",
        "status",
        "assignee"
      ],
      "fieldsByKeys": false
    }

    try {
      const response = await this.api.post(`/3/search`, payload)
      console.log("JIRA.getOpenTickets", response.data)
      const issues = response.data.issues.map((issue: any) => `${issue.key} ${issue.fields.summary}`);
      console.log("JIRA.getOpenTickets Issues", issues)
      return issues
    } catch (error) {
      console.log("JIRA.getOpenTickets", error)
      console.log("JIRA.getOpenTickets Payload", payload)
      return null
    }
  }

  public async addComment(id: number, user: string, comment: string) {
    const payload: any = {
      "body": {
        "type": "doc",
        "version": 1,
        "content": [
          {
            "type": "paragraph",
            "content": [
              {
                "type": "text",
                "text": `${comment} [~${user}]`
              }
            ]
          }
        ]
      }
    }

    try {
      const response = await this.api.post(`/3/issue/TO-${id}/comment`, payload)
      console.log("JIRA.addComment", response.data)
    } catch (error) {
      console.log("JIRA.addComment error", error)
      console.log("JIRA.addComment Payload", payload)
    }
  }
}


export const JIRA = new Jira()