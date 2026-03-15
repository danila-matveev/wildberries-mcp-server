/**
 * Экспорт всех инструментов для работы с отчётами
 */

import { ToolDefinition, ToolHandler } from '../../types/tools.js';

import { getWarehouseStocksTool, getWarehouseStocksHandler } from './get-warehouse-stocks.js';
import { getOrdersReportTool, getOrdersReportHandler } from './get-orders-report.js';
import { getSalesReportTool, getSalesReportHandler } from './get-sales-report.js';
import { createWarehouseRemainsTool, createWarehouseRemainsHandler } from './create-warehouse-remains.js';
import { getExciseReportTool, getExciseReportHandler } from './get-excise-report.js';
import { getRetentionReportsTool, getRetentionReportsHandler } from './get-retention-reports.js';
import { createAcceptanceReportTool, createAcceptanceReportHandler } from './create-acceptance-report.js';
import { createPaidStorageReportTool, createPaidStorageReportHandler } from './create-paid-storage-report.js';
import { getRegionalSalesTool, getRegionalSalesHandler } from './get-regional-sales.js';
import { getBrandShareTool, getBrandShareHandler } from './get-brand-share.js';

export const reportTools: ToolDefinition[] = [
  getWarehouseStocksTool,
  getOrdersReportTool,
  getSalesReportTool,
  createWarehouseRemainsTool,
  getExciseReportTool,
  getRetentionReportsTool,
  createAcceptanceReportTool,
  createPaidStorageReportTool,
  getRegionalSalesTool,
  getBrandShareTool,
];

export const reportHandlers: Record<string, ToolHandler> = {
  wb_get_warehouse_stocks_report: getWarehouseStocksHandler,
  wb_get_orders_report: getOrdersReportHandler,
  wb_get_sales_report: getSalesReportHandler,
  wb_create_warehouse_remains: createWarehouseRemainsHandler,
  wb_get_excise_report: getExciseReportHandler,
  wb_get_retention_reports: getRetentionReportsHandler,
  wb_create_acceptance_report: createAcceptanceReportHandler,
  wb_create_paid_storage_report: createPaidStorageReportHandler,
  wb_get_regional_sales: getRegionalSalesHandler,
  wb_get_brand_share: getBrandShareHandler,
};
