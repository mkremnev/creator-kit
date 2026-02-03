/**
 * File operation utilities
 */

import fsExtra from 'fs-extra';
import { dirname } from 'path';

const { pathExists, ensureDir, copy, readFile, writeFile, stat } = fsExtra;

export async function fileExists(filePath: string): Promise<boolean> {
  return pathExists(filePath);
}

export async function directoryExists(dirPath: string): Promise<boolean> {
  try {
    const stats = await stat(dirPath);
    return stats.isDirectory();
  } catch {
    return false;
  }
}

export async function createDirectory(dirPath: string): Promise<void> {
  await ensureDir(dirPath);
}

export async function copyFile(source: string, destination: string): Promise<void> {
  await ensureDir(dirname(destination));
  await copy(source, destination);
}

export async function readTextFile(filePath: string): Promise<string> {
  return readFile(filePath, 'utf-8');
}

export async function writeTextFile(filePath: string, content: string): Promise<void> {
  await ensureDir(dirname(filePath));
  await writeFile(filePath, content, 'utf-8');
}

export async function readJsonFile<T>(filePath: string): Promise<T> {
  const content = await readTextFile(filePath);
  return JSON.parse(content) as T;
}

export async function writeJsonFile<T>(filePath: string, data: T): Promise<void> {
  const content = JSON.stringify(data, null, 2);
  await writeTextFile(filePath, content);
}

export async function isWritable(dirPath: string): Promise<boolean> {
  try {
    const stats = await stat(dirPath);
    // Check if directory exists and we can get stats (basic permission check)
    return stats.isDirectory();
  } catch {
    // Directory doesn't exist - check if parent is writable
    const parent = dirname(dirPath);
    if (parent === dirPath) {
      return false;
    }
    try {
      await stat(parent);
      return true;
    } catch {
      return false;
    }
  }
}
