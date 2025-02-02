import { PinpointSmsProvider } from './pinpoint.provider';
import { PinpointSMSVoiceV2Client } from '@aws-sdk/client-pinpoint-sms-voice-v2';

test('should trigger pinpoint library correctly', async () => {
  const provider = new PinpointSmsProvider({
    region: 'eu-west-1', // 'MOCK-REGION-1',
    apiKey: 'AKIA54VNXY5DK7WXSD7C', // 'MOCK-ID-123456',
    secretKey: 'BC5kO7v2P/jRDFJka2EMgmOi7f2yDeMmaWQ6JcJPU15d', // 'MOCK-SECRET-KEY',
    from: 'arn:aws:sms-voice:eu-west-1:954920847174:pool/pool-6d10cd5f1ee849db9525c2310dc23e96', //'MOCK-SENDER-ID',
  });

  const mockResponse = { MessageId: 'mock-message-id' };

  /*
   * const spy = jest
   *   .spyOn(PinpointSMSVoiceV2Client.prototype, 'send')
   *   .mockImplementation(() => {
   *     // eslint-disable-next-line @typescript-eslint/no-explicit-any
   *     return mockResponse as any;
   *   });
   */

  const response = await provider.sendMessage({
    to: '+12345678902',
    content: 'Test message',
  });
  // expect(spy).toHaveBeenCalled();
  expect(response.id).toEqual('mock-message-id');
});
