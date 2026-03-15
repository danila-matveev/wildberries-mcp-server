/**
 * Утилита для асинхронных отчётов (создание -> опрос статуса -> скачивание)
 */

import { WildberriesClient } from '../client/wildberries-client.js';
import { logger } from './logger.js';

/**
 * Выполняет асинхронный отчёт: создаёт задачу, опрашивает статус, скачивает результат
 */
export async function executeAsyncReport(
  client: WildberriesClient,
  createUrl: string,
  statusUrl: (taskId: string) => string,
  downloadUrl: (taskId: string) => string,
  params?: unknown,
  maxPollAttempts = 30,
  pollIntervalMs = 5000
): Promise<unknown> {
  // Create report
  const createResponse = await client.get<{ data: { taskId: string } }>(createUrl, params);
  const taskId = createResponse?.data?.taskId;
  if (!taskId) throw new Error('Failed to create report: no taskId returned');

  // Poll for status
  for (let i = 0; i < maxPollAttempts; i++) {
    await new Promise(r => setTimeout(r, pollIntervalMs));
    const statusResponse = await client.get<{ data: { status: string } }>(statusUrl(taskId));
    const status = statusResponse?.data?.status;
    if (status === 'done') {
      // Download
      const result = await client.get(downloadUrl(taskId));
      return result;
    }
    if (status === 'error' || status === 'purged' || status === 'canceled') {
      throw new Error(`Report generation failed with status: ${status}`);
    }
    logger.info('Polling report status', { taskId, status, attempt: i + 1 });
  }
  throw new Error(`Report generation timed out after ${maxPollAttempts} attempts`);
}
