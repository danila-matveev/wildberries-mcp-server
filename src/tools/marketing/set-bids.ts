/**
 * Инструмент для установки ставок рекламной кампании
 */

import { wbAdvClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const setBidsTool: ToolDefinition = {
  name: 'wb_set_bids',
  description: 'Установить ставки для рекламной кампании.',
  inputSchema: {
    type: 'object',
    properties: {
      advertId: {
        type: 'number',
        description: 'ID кампании',
      },
      type: {
        type: 'number',
        description: 'Тип кампании',
      },
      cpm: {
        type: 'number',
        description: 'Ставка CPM',
      },
      param: {
        type: 'number',
        description: 'Параметр (ID предмета или меню)',
      },
      instrument: {
        type: 'number',
        description: 'Инструмент размещения',
      },
    },
    required: ['advertId', 'type', 'cpm', 'param'],
  },
};

export const setBidsHandler: ToolHandler = async (params) => {
  try {
    logger.info('Setting bids', { advertId: params.advertId, cpm: params.cpm });
    const response = await wbAdvClient.patch('/api/advert/v1/bids', {
      advertId: params.advertId,
      type: params.type,
      cpm: params.cpm,
      param: params.param,
      ...(params.instrument !== undefined && { instrument: params.instrument }),
    });
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to set bids', { error });
    return formatError(error, 'wb_set_bids');
  }
};
