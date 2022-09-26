const execSync = require('child_process').execSync;

const migrationName = process.argv[2];

if (!migrationName) {
  console.log("Error: no migration name is provided");
  process.exit(1);
}

try {
  execSync(`typeorm-ts-node-commonjs migration:generate migration\\${migrationName} -d .\\orm\\config\\dataSource.js -o`, {stdio: [0, 1, 2]});
} catch(e) {}
