const fs = require('fs');
const path = require('path');

test('CLI entry file exists', () => {
  const cliPath = path.resolve(__dirname, '../../src/index.ts');
  expect(fs.existsSync(cliPath)).toBe(true);
});
