/**
 * Экспорт всех инструментов для работы с аналитикой
 */

export { getSearchQueriesTool, getSearchQueriesHandler } from './get-search-queries.js';
export { getStockHistoryTool, getStockHistoryHandler } from './get-stock-history.js';
export { getSalesFunnelTool, getSalesFunnelHandler } from './get-sales-funnel.js';
export { getProductSalesStatsTool, getProductSalesStatsHandler } from './get-product-sales-stats.js';
export { getProductStatsDailyTool, getProductStatsDailyHandler } from './get-product-stats-daily.js';
export { getGroupedStatsDailyTool, getGroupedStatsDailyHandler } from './get-grouped-stats-daily.js';
export { getSearchReportTool, getSearchReportHandler } from './get-search-report.js';
export { getSearchReportGroupsTool, getSearchReportGroupsHandler } from './get-search-report-groups.js';
export { getSearchReportDetailsTool, getSearchReportDetailsHandler } from './get-search-report-details.js';
export { getProductSearchTextsTool, getProductSearchTextsHandler } from './get-product-search-texts.js';
export { getProductOrdersByQueryTool, getProductOrdersByQueryHandler } from './get-product-orders-by-query.js';
export { getStocksByGroupsTool, getStocksByGroupsHandler } from './get-stocks-by-groups.js';
export { getStocksByProductsTool, getStocksByProductsHandler } from './get-stocks-by-products.js';
export { getStocksBySizesTool, getStocksBySizesHandler } from './get-stocks-by-sizes.js';
export { getStocksByWarehousesTool, getStocksByWarehousesHandler } from './get-stocks-by-warehouses.js';

/**
 * Массив всех инструментов для аналитики
 */
import { getSearchQueriesTool } from './get-search-queries.js';
import { getStockHistoryTool } from './get-stock-history.js';
import { getSalesFunnelTool } from './get-sales-funnel.js';
import { getProductSalesStatsTool } from './get-product-sales-stats.js';
import { getProductStatsDailyTool } from './get-product-stats-daily.js';
import { getGroupedStatsDailyTool } from './get-grouped-stats-daily.js';
import { getSearchReportTool } from './get-search-report.js';
import { getSearchReportGroupsTool } from './get-search-report-groups.js';
import { getSearchReportDetailsTool } from './get-search-report-details.js';
import { getProductSearchTextsTool } from './get-product-search-texts.js';
import { getProductOrdersByQueryTool } from './get-product-orders-by-query.js';
import { getStocksByGroupsTool } from './get-stocks-by-groups.js';
import { getStocksByProductsTool } from './get-stocks-by-products.js';
import { getStocksBySizesTool } from './get-stocks-by-sizes.js';
import { getStocksByWarehousesTool } from './get-stocks-by-warehouses.js';

export const analyticsTools = [
  getSearchQueriesTool,
  getStockHistoryTool,
  getSalesFunnelTool,
  getProductSalesStatsTool,
  getProductStatsDailyTool,
  getGroupedStatsDailyTool,
  getSearchReportTool,
  getSearchReportGroupsTool,
  getSearchReportDetailsTool,
  getProductSearchTextsTool,
  getProductOrdersByQueryTool,
  getStocksByGroupsTool,
  getStocksByProductsTool,
  getStocksBySizesTool,
  getStocksByWarehousesTool,
];

/**
 * Массив всех обработчиков для аналитики
 */
import { getSearchQueriesHandler } from './get-search-queries.js';
import { getStockHistoryHandler } from './get-stock-history.js';
import { getSalesFunnelHandler } from './get-sales-funnel.js';
import { getProductSalesStatsHandler } from './get-product-sales-stats.js';
import { getProductStatsDailyHandler } from './get-product-stats-daily.js';
import { getGroupedStatsDailyHandler } from './get-grouped-stats-daily.js';
import { getSearchReportHandler } from './get-search-report.js';
import { getSearchReportGroupsHandler } from './get-search-report-groups.js';
import { getSearchReportDetailsHandler } from './get-search-report-details.js';
import { getProductSearchTextsHandler } from './get-product-search-texts.js';
import { getProductOrdersByQueryHandler } from './get-product-orders-by-query.js';
import { getStocksByGroupsHandler } from './get-stocks-by-groups.js';
import { getStocksByProductsHandler } from './get-stocks-by-products.js';
import { getStocksBySizesHandler } from './get-stocks-by-sizes.js';
import { getStocksByWarehousesHandler } from './get-stocks-by-warehouses.js';

export const analyticsHandlers = {
  wb_get_search_queries: getSearchQueriesHandler,
  wb_get_stock_history: getStockHistoryHandler,
  wb_get_sales_funnel: getSalesFunnelHandler,
  wb_get_product_sales_stats: getProductSalesStatsHandler,
  wb_get_product_stats_daily: getProductStatsDailyHandler,
  wb_get_grouped_stats_daily: getGroupedStatsDailyHandler,
  wb_get_search_report: getSearchReportHandler,
  wb_get_search_report_groups: getSearchReportGroupsHandler,
  wb_get_search_report_details: getSearchReportDetailsHandler,
  wb_get_product_search_texts: getProductSearchTextsHandler,
  wb_get_product_orders_by_query: getProductOrdersByQueryHandler,
  wb_get_stocks_by_groups: getStocksByGroupsHandler,
  wb_get_stocks_by_products: getStocksByProductsHandler,
  wb_get_stocks_by_sizes: getStocksBySizesHandler,
  wb_get_stocks_by_warehouses: getStocksByWarehousesHandler,
};
