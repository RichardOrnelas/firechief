import { SLACK, JIRA } from "../clients"
export async function addCommentInChannel(params: any) {
  const comment: string = params.message.text
  const commentAuthor: string = params.message.user
  const slackChannelName: string = params.channel.name
  const incidentId: number = parseInt(slackChannelName)
  const { email } = await SLACK.getUserProfile(commentAuthor)
  const jiraUser: string = email.replace('@acorns.com','')

  await JIRA.addComment(incidentId, jiraUser, comment)
}