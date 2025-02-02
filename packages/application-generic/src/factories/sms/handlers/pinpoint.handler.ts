import { ChannelTypeEnum, ICredentials } from '@novu/shared';
import { PinpointSmsProvider } from '@novu/providers';
import { BaseSmsHandler } from './base.handler';

export class PinpointSmsHandler extends BaseSmsHandler {
  constructor() {
    super('pinpoint', ChannelTypeEnum.SMS);
  }

  buildProvider(credentials: ICredentials) {
    this.provider = new PinpointSmsProvider({
      apiKey: credentials.apiKey,
      secretKey: credentials.secretKey,
      region: credentials.region,
      from: credentials.from,
    });
  }
}
