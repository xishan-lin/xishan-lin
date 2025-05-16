import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, './family-xishan-data.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// 匹配所有 id: 数字（支持多层嵌套）
const idRegex = /id:\s*(\d{1,})/g;

let usedIds = new Set();
let idMap = new Map();
let match;
let idCounter = 10000000; // 8位起始

// 先收集所有旧id
while ((match = idRegex.exec(content)) !== null) {
  const oldId = match[1];
  if (!idMap.has(oldId)) {
    // 生成新的8位id，确保不重复
    while (usedIds.has(idCounter)) idCounter++;
    idMap.set(oldId, idCounter);
    usedIds.add(idCounter);
    idCounter++;
  }
}

// 替换所有id
const newContent = content.replace(idRegex, (m, p1) => {
  return `id: ${idMap.get(p1)}`;
});

fs.writeFileSync(filePath, newContent, 'utf-8');
console.log('所有id已替换为新的8位不重复数字！');