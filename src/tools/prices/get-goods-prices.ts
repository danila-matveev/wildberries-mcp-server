/**
 * Инструмент для получения цен товаров
 */

import { wbDiscountsClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getGoodsPricesTool: ToolDefinition = {
  name: 'wb_get_goods_prices',
  description: 'Получить список товаров с ценами и скидками.',
  inputSchema: {
    type: 'object',
    properties: {
      limit: { type: 'number', description: 'Количество товаров (по умолчанию 100)', default: 100 },
      offset: { type: 'number', description: 'Смещение для пагинации (по умолчанию 0)', default: 0 },
      filterNmID: { type: 'number', description: 'Фильтр по ID номенклатуры' },
    },
  },
};

export const getGoodsPricesHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting goods prices', params);
    const response = await wbDiscountsClient.get('/api/v2/list/goods/filter', params);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get goods prices', { error });
    return formatError(error, 'wb_get_goods_prices');
  }
};
