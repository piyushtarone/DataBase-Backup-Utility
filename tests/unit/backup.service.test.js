jest.mock('../../src/services/mysql-dump.service', () => ({
  MySQLDumpService: jest.fn().mockImplementation(() => ({
    runDump: jest.fn().mockResolvedValue('/fake/path.sql'),
  })),
}));

const { BackupService } = require('../../src/services/backup.service');

test('BackupService returns success when connector works', async () => {
  const mockConnector = {
    testConnection: jest.fn().mockResolvedValue(true),
    disconnect: jest.fn(),
  };

  const service = new BackupService('mysql', mockConnector);
  const result = await service.runBackup();

  expect(result.success).toBe(true);
  expect(result.database).toBe('mysql');
  expect(mockConnector.testConnection).toHaveBeenCalled();
  expect(mockConnector.disconnect).toHaveBeenCalled();
});

test('BackupService fails when connection fails', async () => {
  const mockConnector = {
    testConnection: jest.fn().mockResolvedValue(false),
    disconnect: jest.fn(),
  };

  const service = new BackupService('postgres', mockConnector);
  const result = await service.runBackup();

  expect(result.success).toBe(false);
  expect(result.database).toBe('postgres');
});
