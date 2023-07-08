import { APIGatewayEvent, Context } from "aws-lambda";
import { apiSlack, apiSlackAction, apiSlackOption } from "./handlers"

export async function apiHandler(event : APIGatewayEvent, context : Context) {

  const { httpMethod, resource } = event

  const resourcePath = [httpMethod, resource].join(" ")

  try {
    let response;
    switch(resourcePath) {
      case "POST /slack":
        response = await apiSlack(event.body as any)
        break;
      
      case "POST /slackactions":
        response = await apiSlackAction(event.body as any)      
        break;

      case "POST /slackoptions":
        response = await apiSlackOption(event.body as any)
        break;

      default:
        break;
    }

    return buildResponse(200,response)
  } catch(err) {
    console.log(err)
    return buildResponse(400, {success: false})
  }
}

export function buildResponse(statusCode : number, obj? : any) {

  const responseObject = obj ? obj : ""
  const body = JSON.stringify(responseObject)

  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    body,
  }
}