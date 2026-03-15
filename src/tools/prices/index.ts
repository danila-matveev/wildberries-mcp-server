/**
 * Экспорт всех инструментов для работы с ценами
 */

import { getGoodsPricesTool, getGoodsPricesHandler } from './get-goods-prices.js';
import { uploadPricesTool, uploadPricesHandler } from './upload-prices.js';
import { uploadSizePricesTool, uploadSizePricesHandler } from './upload-size-prices.js';

export const priceTools = [getGoodsPricesTool, uploadPricesTool, uploadSizePricesTool];

export const priceHandlers: Record<string, any> = {
  wb_get_goods_prices: getGoodsPricesHandler,
  wb_upload_prices: uploadPricesHandler,
  wb_upload_size_prices: uploadSizePricesHandler,
};
