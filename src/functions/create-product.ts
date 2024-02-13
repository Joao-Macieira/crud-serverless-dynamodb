import { PutCommand } from '@aws-sdk/lib-dynamodb';
import type { APIGatewayProxyEventV2 } from 'aws-lambda';
import { randomUUID } from 'node:crypto';
import { dynamoDbClient } from '../lib/dynamodb-client';

export async function handler(event: APIGatewayProxyEventV2) {
  const body = JSON.parse(event.body);

  const id = randomUUID();

  const command = new PutCommand({
    TableName: 'ProductsTable',
    Item: {
      id,
      name: body.name,
      price: body.price,
      tags: body.tags,
    }
  });

  const response = await dynamoDbClient.send(command);

  return {
    statusCode: 201,
    body: JSON.stringify(response),
  }
}