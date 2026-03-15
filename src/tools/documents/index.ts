/**
 * Экспорт всех инструментов для работы с документами
 */

import { ToolDefinition, ToolHandler } from '../../types/tools.js';

import { getBalanceTool, getBalanceHandler } from './get-balance.js';
import { getReportDetailTool, getReportDetailHandler } from './get-report-detail.js';
import { getCategoriesTool, getCategoriesHandler } from './get-categories.js';
import { getDocumentsListTool, getDocumentsListHandler } from './get-documents-list.js';
import { downloadDocumentTool, downloadDocumentHandler } from './download-document.js';
import { downloadAllDocumentsTool, downloadAllDocumentsHandler } from './download-all-documents.js';

export const documentTools: ToolDefinition[] = [
  getBalanceTool,
  getReportDetailTool,
  getCategoriesTool,
  getDocumentsListTool,
  downloadDocumentTool,
  downloadAllDocumentsTool,
];

export const documentHandlers: Record<string, ToolHandler> = {
  wb_get_account_balance: getBalanceHandler,
  wb_get_sales_realization_report: getReportDetailHandler,
  wb_get_document_categories: getCategoriesHandler,
  wb_get_documents: getDocumentsListHandler,
  wb_download_document: downloadDocumentHandler,
  wb_download_documents_bulk: downloadAllDocumentsHandler,
};
