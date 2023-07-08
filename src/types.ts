// CLIENTS
// Slack Client
export interface SlackMessagePayload {
  text?: string
  response_type?: string
  channel: string
  attachments?: SlackAttachment[]
}
export interface SlackAttachment {
  text?: string;
  attachment_type?: string
  callback_id?: string | number
  fallback?: string;
  color?: string;
  pretext?: string;
  title?: string;
  title_link?: string;
  fields?: Field[];
  actions?: any
}

export interface Field {
  title: string;
  value: string;
  short: any;
}

// Jira Client
export const enum Severities {
  sev1 = "SEV1",
  sev2 = "SEV2"
}

export const enum IncidentCategories {
  registration = "Registration",
  moneyMovement = "Money Movement",
  availability = "Availability",
  Security = "Security",
  support = "Support",
  other = "Other"
}

export const enum RootCauseClassifications {
  applicationBug = "Application Bug",
  databaseCapacity = "Database capacity",
  securityVulnerability = "Security Vulnerability",
  incidentResponse = "Incident Response",
  monitoringAlertingDeficiency = "Monitoring/Alerting Deficiency",
  externalPartner = "External Partner",
  applicationDependency = "Application Dependency",
  errorInChangeExecution = "Error in change execution",
  other = "Other"
}

export type CreateTicketPayload = {
  summary: string
  reporter: string
  severity?: Severities
  incidentCategory?: IncidentCategories
  rootCauseClassification?: RootCauseClassifications
  assignee: string
  incidentManagerOnCall: string
  description: string
}

// TASKS
export type CreateSlackChannel = {
  channelId: string
  incidentSummary: string
  incidentLink: string
  reporter: string
  assignee: string
  incidentManagerOnCall: string
}

export type CreateIncidentPayload = {
  userId: string
  summary?: string
  severity?: string
  description: string
}
