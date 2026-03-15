/**
 * Инструмент для управления тегами товаров
 */

import { wbContentClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const manageTagsTool: ToolDefinition = {
  name: 'wb_manage_tags',
  description:
    'Управление тегами товаров: список, создание, обновление, удаление. ' +
    'Используйте action для выбора операции: list, create, update, delete.',
  inputSchema: {
    type: 'object',
    properties: {
      action: {
        type: 'string',
        enum: ['list', 'create', 'update', 'delete'],
        description: 'Действие: list — список, create — создать, update — обновить, delete — удалить',
      },
      id: { type: 'number', description: 'ID тега (для update и delete)' },
      name: { type: 'string', description: 'Название тега (для create и update)' },
      color: { type: 'string', description: 'Цвет тега (для create и update)' },
    },
    required: ['action'],
  },
};

export const manageTagsHandler: ToolHandler = async (params) => {
  try {
    const { action, id, name, color } = params as {
      action: 'list' | 'create' | 'update' | 'delete';
      id?: number;
      name?: string;
      color?: string;
    };

    logger.info('Managing tags', { action, id, name, color });

    let response: unknown;

    switch (action) {
      case 'list':
        response = await wbContentClient.get('/content/v2/tags');
        break;
      case 'create':
        response = await wbContentClient.post('/content/v2/tag', { name, color });
        break;
      case 'update':
        if (!id) throw new Error('ID тега обязателен для обновления');
        response = await wbContentClient.patch(`/content/v2/tag/${id}`, { name, color });
        break;
      case 'delete':
        if (!id) throw new Error('ID тега обязателен для удаления');
        response = await wbContentClient.delete(`/content/v2/tag/${id}`);
        break;
      default:
        throw new Error(`Неизвестное действие: ${action}`);
    }

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to manage tags', { error });
    return formatError(error, 'wb_manage_tags');
  }
};
