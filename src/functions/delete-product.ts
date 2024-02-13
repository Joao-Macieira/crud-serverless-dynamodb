import { DeleteCommand } from '@aws-sdk/lib-dynamodb';
import type { APIGatewayProxyEventV2 } from 'aws-lambda';
import { dynamoDbClient } from '../lib/dynamodb-client';

export async function handler(event: APIGatewayProxyEventV2) {
  const { productId } = event.pathParameters;

  const command = new DeleteCommand({
    TableName: 'ProductsTable',
    Key: {
      id: productId
    },
  });

  await dynamoDbClient.send(command);

  return {
    statusCode: 204,
  }
}