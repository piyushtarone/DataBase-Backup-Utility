jest.mock('fs', () => ({
  existsSync: jest.fn(() => true),
  mkdirSync: jest.fn(),
}));

jest.mock('child_process', () => ({
  exec: (cmd, cb) => cb(null, 'success'),
}));

const { MySQLDumpService } = require('../../src/services/mysql-dump.service');

test('MySQLDumpService returns dump path', async () => {
  const service = new MySQLDumpService();

  const result = await service.runDump({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'test_db',
    outputDir: './backups/test',
  });

  expect(result).toContain('.sql');
});
