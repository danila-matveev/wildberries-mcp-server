/**
 * Инструмент для управления коробками поставки FBS
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../../types/tools.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

export const manageSupplyBoxesTool: ToolDefinition = {
  name: 'wb_manage_supply_boxes',
  description:
    'Управление коробками (транспортными местами) поставки FBS: добавление или удаление коробок.',
  inputSchema: {
    type: 'object',
    properties: {
      supplyId: {
        type: 'string',
        description: 'Идентификатор поставки (например, WB-GI-1234567)',
      },
      action: {
        type: 'string',
        enum: ['add', 'delete'],
        description: 'Действие: add — добавить коробки, delete — удалить коробки',
      },
      boxes: {
        type: 'array',
        items: { type: 'string' },
        description: 'Массив идентификаторов коробок (обязателен для add)',
      },
    },
    required: ['supplyId', 'action'],
  },
};

export const manageSupplyBoxesHandler: ToolHandler = async (params) => {
  try {
    const { supplyId, action, boxes } = params as {
      supplyId: string;
      action: 'add' | 'delete';
      boxes?: string[];
    };

    logger.info('Managing FBS supply boxes', { supplyId, action, boxes });

    let response;

    if (action === 'add') {
      if (!boxes || boxes.length === 0) {
        return formatError(
          new Error('Параметр boxes обязателен для действия add'),
          'wb_manage_supply_boxes'
        );
      }
      response = await wbMarketplaceClient.patch(
        `/api/v3/supplies/${supplyId}/trbx`,
        { boxes }
      );
    } else {
      response = await wbMarketplaceClient.delete(
        `/api/v3/supplies/${supplyId}/trbx`,
        { ...(boxes && { boxes }) }
      );
    }

    logger.info('FBS supply boxes managed successfully', { supplyId, action });

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to manage FBS supply boxes', { error });
    return formatError(error, 'wb_manage_supply_boxes');
  }
};
