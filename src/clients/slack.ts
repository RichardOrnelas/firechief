import axios, { AxiosInstance } from "axios";
import { SlackMessagePayload } from "../types"

// Constants
export const SLACK_OAUTH_TOKEN: string | undefined = process.env.SLACK_OAUTH_TOKEN
export const SLACK_BOT_TOKEN: string | undefined = process.env.SLACK_BOT_TOKEN

class Slack {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: "https://slack.com/api/",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${SLACK_OAUTH_TOKEN}`
      }
    })
  }

  public async lookupUserByEmail(email: string) {
    try {
      const response = await this.api.get(`users.lookupByEmail?token=${SLACK_OAUTH_TOKEN}&pretty=1&email=${email}`)
      console.log("SLACK.lookupUserByEmail", email, response.data)
      return response.data.user
    } catch (error) {
      console.log("SLACK.lookupUserByEmail", error)
    }
  }

  public async getUserProfile(userId: string) {
    try {
      const response = await this.api.get(`users.profile.get?token=${SLACK_OAUTH_TOKEN}&pretty=1&user=${userId}`, {
        params: {
          token: SLACK_OAUTH_TOKEN,
          user: userId
        }
      })
      console.log("SLACK.getUserProfile", response.data)
      return response.data.profile
    } catch (error) {
      console.log("SLACK.getUserProfile", error)
    }
  }

  public async postMessage(slackPayload: SlackMessagePayload) {
    try {
      const response = await this.api.post(`chat.postMessage`, slackPayload)
      console.log("SLACK.postMessage", response)
    } catch (error) {
      console.log("SLACK.postMessage", error)
    }
  }

  public async postResponseUrlMessage(url: string, slackPayload: SlackMessagePayload) {
    try {
      const response = await this.api.request({
        method: 'post',
        url,
        data: slackPayload
      })
      console.log("SLACK.postMessage", response)
    } catch (error) {
      console.log("SLACK.postMessage", error)
    }
  }

  public async createChannel(channelName: string) {
    try {
      const response = await this.api.post(`channels.create`, {
        "name": channelName
      })
      console.log("SLACK.createChannel", response)
      return response.data.channel
    } catch (error) {
      console.log("SLACK.createChannel", error)
    }
  }

  public async joinChannel(channelName: string) {
    try {
      const response = await this.api.post(`channels.join`, {
        "name": channelName
      })
      console.log("SLACK.joinChannel", response)
      return response.data.channel
    } catch (error) {
      console.log("SLACK.joinChannel", error)
    }
  }

  public async inviteToChannel(channelId: string, userId: string) {
    try {
      const response = await this.api.post(`channels.create`, {
        "channel": channelId,
        "user": userId
      })
      console.log("SLACK.inviteToChannel", response)
    } catch (error) {
      console.log("SLACK.inviteToChannel", error)
    }
  }

  public async setPurpose(channelId: string, topic: string) {
    try {
      const response = await this.api.post(`channels.setTopic`, {
        "channel": channelId,
        "topic": topic
      })
      console.log("SLACK.setTopic", response)
    } catch (error) {
      console.log("SLACK.setTopic", error)
    }
  }

  public async openDialog(payload: any) {
    console.log("SLACK.openDialog Payload", JSON.stringify(payload))
    try {
      const response = await this.api.post(`dialog.open`, payload)
      console.log("SLACK.openDialog", response)
      console.log(JSON.stringify(response.data.response_metadata))
    } catch (error) {
      console.log("SLACK.openDialog.error", error)
    }
  }
}

export const SLACK = new Slack()

