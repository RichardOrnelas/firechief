import { SLACK, JIRA } from "../clients"
export async function addComment(params: any) {

  const incidentId: number = params.submission.incidentId
  const comment: string = params.state
  const userId: string = comment.split(" ")[0]
  const profile: any = await SLACK.getUserProfile(userId)
  const email: string = profile.email
  const jiraUser: string = email.replace('@acorns.com','')

  await JIRA.addComment(incidentId, jiraUser, comment)
}