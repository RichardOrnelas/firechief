import axios, { AxiosInstance } from "axios";

export const OPSGENIE_TOKEN: string | undefined = process.env.OPSGENIE_TOKEN

class Opsgenie {
  private api : AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: "https://api.opsgenie.com/v2/",
      headers: {
        "Authorization": `GenieKey ${OPSGENIE_TOKEN}`
      }
    })
  }

  public async earnOnCall() {
    try {
      const response = await this.api.get("schedules/e8389467-3560-448c-a7ef-3afb49fdc6e1/on-calls")
      console.log("OPSGENIE.earnOnCall", JSON.stringify(response.data.data))
      return response.data.data.onCallParticipants[0].name
    } catch (error) {
      console.log("OPSGENIE.earnOnCall", error)
    }
  }

  public async webOnCall() {
    try {
      const response = await this.api.get("schedules/e0f56550-3062-44cc-a415-b1655db84910/on-calls")
      console.log("OPSGENIE.webOnCall", JSON.stringify(response.data.data))
      return response.data.data.onCallParticipants[0].name
    } catch (error) {
      console.log("OPSGENIE.webOnCall", error)
    }
  }

  public async securitiesOnCall() {
    try {
      const response = await this.api.get("schedules/bc7cdcad-81ce-4371-88ef-ea6447b86e88/on-calls")
      console.log("OPSGENIE.securitiesOnCall", JSON.stringify(response.data.data))
      return response.data.data.onCallParticipants[0].name
    } catch (error) {
      console.log("OPSGENIE.securitiesOnCall", error)
    }
  }

  public async dataOnCall() {
    try {
      const response = await this.api.get("schedules/516464d0-3ba9-4b45-9f9b-3bf145d67a78/on-calls")
      console.log("OPSGENIE.dataOnCall", JSON.stringify(response.data.data))
      return response.data.data.onCallParticipants[0].name
    } catch (error) {
      console.log("OPSGENIE.dataOnCall", error)
    }
  }

  public async spendOnCall() {
    try {
      const response = await this.api.get("schedules/2a59efc6-0085-4764-aaeb-0f1143f19762/on-calls")
      console.log("OPSGENIE.spendOnCall", JSON.stringify(response.data.data))
      return response.data.data.onCallParticipants[0].name
    } catch (error) {
      console.log("OPSGENIE.spendOnCall", error)
    }
  }

  public async laterOnCall() {
    try {
      const response = await this.api.get("schedules/4cadd190-b9e1-4087-b50b-6ae9f852242e/on-calls")
      console.log("OPSGENIE.laterOnCall", JSON.stringify(response.data.data))
      return response.data.data.onCallParticipants[0].name
    } catch (error) {
      console.log("OPSGENIE.laterOnCall", error)
    }
  }

  public async androidOnCall() {
    try {
      const response = await this.api.get("schedules/b5d2e794-38c2-49b7-a66b-a3a4ef4c0e9d/on-calls")
      console.log("OPSGENIE.androidOnCall", JSON.stringify(response.data.data))
      return response.data.data.onCallParticipants[0].name
    } catch (error) {
      console.log("OPSGENIE.androidOnCall", error)
    }
  }

  public async iosOnCall() {
    try {
      const response = await this.api.get("schedules/0c1805f3-cd25-4fff-8e15-0a310e8afeb6/on-calls")
      console.log("OPSGENIE.iosOnCall", JSON.stringify(response.data.data))
      return response.data.data.onCallParticipants[0].name
    } catch (error) {
      console.log("OPSGENIE.iosOnCall", error)
    }
  }

  public async incidentManagerOnCall() {
    try {
      const response = await this.api.get("schedules/3a513445-a2aa-459d-9ad0-d3bb98ac37f6/on-calls")
      console.log("OPSGENIE.incidentManagerOnCall", JSON.stringify(response.data.data))
      return response.data.data.onCallParticipants[0].name
    } catch (error) {
      console.log("OPSGENIE.incidentManagerOnCall", error)
    }
  }

  public async devOnCall() {
    try {
      const response = await this.api.get("schedules/ad72d6b1-9743-410d-b546-304a567d6932/on-calls")
      console.log("OPSGENIE.devOnCall", JSON.stringify(response.data.data))
      return response.data.data.onCallParticipants[0].name
    } catch (error) {
      console.log("OPSGENIE.devOnCall", error)
    }
  }
}

export const OPSGENIE = new Opsgenie()  