/**
 * Экспорт всех инструментов для работы с аналитикой
 */

export { getSearchQueriesTool, getSearchQueriesHandler } from './get-search-queries.js';
export { getStockHistoryTool, getStockHistoryHandler } from './get-stock-history.js';
export { getSalesFunnelTool, getSalesFunnelHandler } from './get-sales-funnel.js';

/**
 * Массив всех инструментов для аналитики
 */
import { getSearchQueriesTool } from './get-search-queries.js';
import { getStockHistoryTool } from './get-stock-history.js';
import { getSalesFunnelTool } from './get-sales-funnel.js';

export const analyticsTools = [
  getSearchQueriesTool,
  getStockHistoryTool,
  getSalesFunnelTool,
];

/**
 * Массив всех обработчиков для аналитики
 */
import { getSearchQueriesHandler } from './get-search-queries.js';
import { getStockHistoryHandler } from './get-stock-history.js';
import { getSalesFunnelHandler } from './get-sales-funnel.js';

export const analyticsHandlers = {
  wb_get_search_queries: getSearchQueriesHandler,
  wb_get_stock_history: getStockHistoryHandler,
  wb_get_sales_funnel: getSalesFunnelHandler,
};
