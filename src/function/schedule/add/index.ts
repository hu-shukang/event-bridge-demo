import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { Func } from 'model';
import { scheduleService } from 'service';
import { lambdaHandler, validatorUtil } from 'utils';
import { schema } from './schema';

const func: Func<string> = async (event: APIGatewayProxyEvent, _context: Context): Promise<string> => {
  const form = validatorUtil.parse(schema, event.body);
  await scheduleService.addSchedule(form);
  return 'OK';
};

export const handler = lambdaHandler(func);
