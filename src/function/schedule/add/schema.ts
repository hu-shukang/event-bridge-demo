import { JSONSchemaType, AvatorSingedUrlForm } from 'model';
import { ScheduleForm } from 'src/layer/APISharedLayer/nodejs/src/model/src/schedule.model';

export const schema: JSONSchemaType<ScheduleForm> = {
  type: 'object',
  required: ['rate', 'input', 'user'],
  properties: {
    rate: {
      type: 'string',
    },
    input: {
      type: 'string',
    },
    user: {
      type: 'string',
    },
  },
  additionalProperties: false,
  errorMessage: {
    type: 'JSONフォーマットは正しくない',
    required: {
      rate: 'rateは必須です',
      input: 'inputは必須です',
      user: 'userは必須です',
    },
    additionalProperties: '要求外のフィールドがありました',
  },
};
