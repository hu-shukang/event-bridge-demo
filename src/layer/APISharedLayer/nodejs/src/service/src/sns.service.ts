import { BaseService } from './base.service';
import { CloudWatchEvents, Lambda, SNS } from 'aws-sdk';
import { cryptoUtil } from 'utils';
import { ScheduleForm } from 'model/src/schedule.model';
import { AddPermissionRequest } from 'aws-sdk/clients/lambda';

export class Snservice extends BaseService {
  public async createTopic() {
    const params: SNS.CreateTopicInput = {
      Name: '',
    };
    const topic = await this.snsClient.createTopic(params).promise();

    const endPointParams: SNS.CreatePlatformEndpointInput = {
      PlatformApplicationArn: '',
      Token: '',
    };
    const endPoint = await this.snsClient.createPlatformEndpoint(endPointParams).promise();

    const subParams: SNS.SubscribeInput = {
      TopicArn: topic.TopicArn!,
      Protocol: '',
      Endpoint: endPoint.EndpointArn!,
    };
    const sub = await this.snsClient.subscribe(subParams).promise();
    const unsubParams: SNS.UnsubscribeInput = {
      SubscriptionArn: sub.SubscriptionArn!,
    };
    this.snsClient.unsubscribe(unsubParams).promise();
  }
}
