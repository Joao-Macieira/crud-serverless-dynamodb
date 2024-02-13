import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import { dynamoDbClient } from '../lib/dynamodb-client';

export async function handler() {
  const command = new ScanCommand({
    TableName: 'ProductsTable',
  });

  const { Items } = await dynamoDbClient.send(command);

  return {
    statusCode: 200,
    body: JSON.stringify(Items)
  }
}