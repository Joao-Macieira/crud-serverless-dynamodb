import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import type { APIGatewayProxyEventV2 } from 'aws-lambda';
import { dynamoDbClient } from '../lib/dynamodb-client';

export async function handler(event: APIGatewayProxyEventV2) {
  const { productId } = event.pathParameters;
  const body = JSON.parse(event.body);

  const command = new UpdateCommand({
    TableName: 'ProductsTable',
    Key: {
      id: productId
    },
    UpdateExpression: 'set #n = :n, #p = :p, #t = :t',
    ExpressionAttributeNames: {
      '#n': 'name',
      '#p': 'price',
      '#t': 'tags',
    },
    ExpressionAttributeValues: {
      ':n': body.name,
      ':p': body.price,
      ':t': body.tags,
    },
  });

  await dynamoDbClient.send(command);

  return {
    statusCode: 204,
  }
}