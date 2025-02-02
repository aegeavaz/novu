/* eslint-disable no-console */
import {
  ChannelTypeEnum,
  ISendMessageSuccessResponse,
  ISmsOptions,
  ISmsProvider,
} from '@novu/stateless';
import {
  PinpointSMSVoiceV2Client,
  SendTextMessageCommand,
  SendTextMessageCommandInput,
} from '@aws-sdk/client-pinpoint-sms-voice-v2';
import { PinpointConfig } from './pinpoint.config';

export class PinpointSmsProvider implements ISmsProvider {
  id = 'pinpoint';
  channelType = ChannelTypeEnum.SMS as ChannelTypeEnum.SMS;
  private readonly pinpoint: PinpointSMSVoiceV2Client;

  constructor(private readonly config: PinpointConfig) {
    console.log(this.config.region);
    console.log(this.config.apiKey);
    console.log(this.config.secretKey);
    this.pinpoint = new PinpointSMSVoiceV2Client({
      region: this.config.region,
      credentials: {
        accessKeyId: this.config.apiKey,
        secretAccessKey: this.config.secretKey,
      },
    });
  }

  async sendMessage(
    options: ISmsOptions
  ): Promise<ISendMessageSuccessResponse> {
    const params: SendTextMessageCommandInput = {
      DestinationPhoneNumber: options.to,
      MessageBody: options.content,
      MessageType: 'TRANSACTIONAL',
      OriginationIdentity: this.config.from,
    };

    const command = new SendTextMessageCommand(params);

    //Try to send the message.
    const result = await this.pinpoint.send(command);

    return {
      id: result.MessageId,
      date: Date.now().toString(),
    };
  }
}
