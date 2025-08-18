const fs = require('fs');
const path = require('path');

const workspaceRoot = path.resolve(__dirname, '..');
const localesDir = path.join(workspaceRoot, 'src', 'locales');
const baseFile = path.join(localesDir, 'en.json');

function readJSON(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    console.error(`Error reading/parsing ${filePath}:`, err.message);
    process.exit(1);
  }
}

function deepMerge(base, target) {
  // returns [merged, addedCount]
  let added = 0;
  if (typeof base !== 'object' || base === null) return [target !== undefined ? target : base, added];
  if (typeof target !== 'object' || target === null) {
    // target missing or not object -> copy base entirely
    return [base, Object.keys(base).length];
  }
  const out = Array.isArray(base) ? [] : {};
  const keys = new Set([...Object.keys(base), ...Object.keys(target)]);
  keys.forEach((k) => {
    if (Object.prototype.hasOwnProperty.call(target, k)) {
      if (typeof base[k] === 'object' && base[k] !== null) {
        const [mergedChild, childAdded] = deepMerge(base[k], target[k]);
        out[k] = mergedChild;
        added += childAdded;
      } else {
        out[k] = target[k];
      }
    } else {
      out[k] = base[k];
      added += 1;
    }
  });
  return [out, added];
}

function backup(filePath) {
  const bakPath = filePath + '.bak.' + Date.now();
  fs.copyFileSync(filePath, bakPath);
  return bakPath;
}

function main() {
  if (!fs.existsSync(localesDir)) {
    console.error('Locales directory not found:', localesDir);
    process.exit(1);
  }
  if (!fs.existsSync(baseFile)) {
    console.error('Base file en.json not found in locales dir');
    process.exit(1);
  }

  const base = readJSON(baseFile);
  const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json') && f !== 'en.json');
  const summary = [];
  files.forEach((file) => {
    const full = path.join(localesDir, file);
    const orig = readJSON(full);
    const backupPath = backup(full);
    const [merged, added] = deepMerge(base, orig);
    fs.writeFileSync(full, JSON.stringify(merged, null, 2), 'utf8');
    summary.push({ file, added, backup: path.basename(backupPath) });
  });

  console.log('Merge complete. Summary:');
  summary.forEach(s => console.log(`- ${s.file}: added ${s.added} missing keys (backup: ${s.backup})`));
}

main();
