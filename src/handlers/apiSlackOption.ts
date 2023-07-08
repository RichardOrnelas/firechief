import { JIRA } from "../clients";

export async function apiSlackOption(eventBody: string) {
  const issues: any = await JIRA.getOpenTickets()
  const issueOptions = issues.map((issue:any) => {
    const incidentTag: string = issue.split(' ')[0]
    const value: string = incidentTag.replace("TO-",'')

    return {
      "label": issue.substring(3, 35),
      "value": value
    }
  })

  const response: any = {
    "options": issueOptions 
  } 

  return response
}