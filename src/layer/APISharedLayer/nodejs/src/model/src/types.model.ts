import { APIGatewayProxyEvent, Context } from 'aws-lambda';

export type KeyValue = { [key: string]: any };

export type Func<T> = (event: APIGatewayProxyEvent, context: Context) => Promise<T>;
