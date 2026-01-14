jest.mock('pg');

const { PostgresConnector } = require('../../src/connectors/postgres.connector');

test('PostgresConnector class should be defined', () => {
  expect(PostgresConnector).toBeDefined();
});
