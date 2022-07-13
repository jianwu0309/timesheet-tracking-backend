import * as fs from 'fs';
import { join } from 'path';
import { TEMPLATE_FILE } from '../constants/file';

export const loadTemplates = async (path?: string) => {
  const dir = path || __dirname + '/';
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filepath = join(dir, file);
    const stat = await fs.statSync(filepath);
    if (file.includes('index')) {
      continue;
    } else if (stat.isDirectory()) {
      await loadTemplates(filepath);
    } else {
      const templateName = file.split('.')[0];
      TEMPLATE_FILE[templateName] = fs.readFileSync(filepath, 'utf-8');
    }
  }
};
