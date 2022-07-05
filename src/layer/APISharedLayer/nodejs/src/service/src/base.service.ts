import { ApiGatewayManagementApi, CloudWatchEvents, DynamoDB, Lambda, S3, SNS } from 'aws-sdk';
import { Const } from 'utils';

export class BaseService {
  protected docClient: DynamoDB.DocumentClient;
  protected apigwManagementApi: ApiGatewayManagementApi;
  protected s3Client: S3;
  protected cwevents: CloudWatchEvents;
  protected lambda: Lambda;
  protected snsClient: SNS;

  constructor() {
    this.docClient = new DynamoDB.DocumentClient({
      region: Const.REGION,
    });

    this.apigwManagementApi = new ApiGatewayManagementApi({
      apiVersion: '2018-11-29',
      region: Const.REGION,
    });

    this.s3Client = new S3({
      region: Const.REGION,
    });

    this.cwevents = new CloudWatchEvents({ apiVersion: '2015-10-07' });

    this.lambda = new Lambda({
      apiVersion: '2015-03-31',
      region: Const.REGION,
    });

    this.snsClient = new SNS({
      region: Const.REGION,
    });
  }
}
