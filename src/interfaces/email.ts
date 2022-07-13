export interface IBasicEmailConfiguration {
  to: string[];
  from: string;
  bcc?: string[];
}

export interface ISESEmailConfiguration extends IBasicEmailConfiguration {
  subject: string;
  body: string;
}

export interface IEmailConfiguration extends IBasicEmailConfiguration {
  subject: string;
  template: string;
  dataMap: any;
}

export interface IWelcomeEmail {
  firstName: string;
  lastName: string;
  email: string;
  hash: string;
}
