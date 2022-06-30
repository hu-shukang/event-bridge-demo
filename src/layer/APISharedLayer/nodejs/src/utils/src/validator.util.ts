import Ajv, { JSONSchemaType } from 'ajv';
import AjvErrors from 'ajv-errors';
import addFormats from 'ajv-formats';
import ValidationError from 'ajv/dist/runtime/validation_error';
import { DynamoDB } from 'aws-sdk';
import { HttpError, ValidateInfoModel } from 'model';
import { ValidateError } from 'model';
import { Const } from './const.util';
import { isBlank } from 'underscore.string';

const docClient: DynamoDB.DocumentClient = new DynamoDB.DocumentClient({
  region: Const.REGION,
});

// const checkIdExists = async (schema: any, data: string) => {
//   const params: DynamoDB.DocumentClient.QueryInput = {
//     TableName: schema.table,
//     IndexName: 'deleted_id_index',
//     KeyConditionExpression: 'deleted = :de AND #id = :id',
//     ExpressionAttributeNames: {
//       '#id': 'id',
//     },
//     ExpressionAttributeValues: {
//       ':id': data,
//       ':de': Const.DELETED_NO,
//     },
//   };
//   const result = await docClient.query(params).promise();
//   return result.Items && result.Items.length == 1;
// };

export class ValidatorUtil {
  protected ajv: Ajv;
  constructor() {
    const ajv = new Ajv({ allErrors: true });
    addFormats(ajv);
    // ajv.addFormat("date", /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)
    // ajv.addKeyword({
    //   keyword: 'idExists',
    //   type: 'string',
    //   async: true,
    //   validate: checkIdExists,
    // });
    this.ajv = AjvErrors(ajv);
  }

  private getErrors<T>(errors: any[]): ValidateInfoModel[] {
    const errorList = [];
    if (errors.length > 0) {
      for (const error of errors) {
        let props = [];
        if (error.instancePath) {
          props.push(error.instancePath);
        }
        if (
          error.params &&
          error.params.errors &&
          error.params.errors.length > 0 &&
          error.params.errors[0].params.missingProperty
        ) {
          props.push(error.params.errors[0].params.missingProperty);
        }
        const message = error.message || '';
        let property = props.join('/');
        if (property.startsWith('/')) {
          property = property.substring(1);
        }
        if (isBlank(property)) {
          property = '/';
        }
        errorList.push({
          property: property,
          message: message,
        });
      }
    }
    return errorList;
  }

  public parse<T>(schema: JSONSchemaType<T>, body: string | null): T {
    if (!body) {
      throw new HttpError(Const.HTTP_STATUS_400, Const.ERROR_INVALIDATE_DATA);
    }
    let data: any = {};
    try {
      data = JSON.parse(body);
    } catch (e: any) {
      throw new HttpError(Const.HTTP_STATUS_400, Const.ERROR_INVALIDATE_DATA);
    }
    const validate = this.ajv.compile<T>(schema);
    try {
      const result = validate(data);
      if (result) {
        return data as T;
      }
      throw new ValidationError(validate.errors as any[]);
    } catch (e: any) {
      if (e.constructor.name == 'ValidationError') {
        const errors = this.getErrors(e.errors as any[]);
        throw new ValidateError(errors);
      }
      throw new HttpError(Const.HTTP_STATUS_400, Const.ERROR_INVALIDATE_DATA);
    }
  }
}
