import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { Func, TokenPayload } from 'model';
import { lambdaHandler } from 'utils';

const func: Func<string> = async (
  _event: APIGatewayProxyEvent,
  _tokenPayload: TokenPayload | null,
  _context: Context
): Promise<string> => {
  return 'OK';
};

export const handler = lambdaHandler(func, false);
