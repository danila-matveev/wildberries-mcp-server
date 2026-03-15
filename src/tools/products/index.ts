/**
 * Экспорт всех инструментов для работы с товарами
 */

export { getProductsTool, getProductsHandler } from './get-products.js';
export { updateContentTool, updateContentHandler } from './update-content.js';
export { updatePricesTool, updatePricesHandler } from './update-prices.js';
export { updateStocksTool, updateStocksHandler } from './update-stocks.js';
export { getParentCategoriesTool, getParentCategoriesHandler } from './get-parent-categories.js';
export { getSubjectsTool, getSubjectsHandler } from './get-subjects.js';
export { getSubjectCharcsTool, getSubjectCharcsHandler } from './get-subject-charcs.js';
export { getColorsTool, getColorsHandler } from './get-colors.js';
export { getGenderKindsTool, getGenderKindsHandler } from './get-gender-kinds.js';
export { getCountriesTool, getCountriesHandler } from './get-countries.js';
export { getSeasonsTool, getSeasonsHandler } from './get-seasons.js';
export { getVatRatesTool, getVatRatesHandler } from './get-vat-rates.js';
export { getTnvedTool, getTnvedHandler } from './get-tnved.js';
export { getBrandsTool, getBrandsHandler } from './get-brands.js';
export { getFailedCardsTool, getFailedCardsHandler } from './get-failed-cards.js';
export { mergeCardsTool, mergeCardsHandler } from './merge-cards.js';
export { deleteCardsTool, deleteCardsHandler } from './delete-cards.js';
export { recoverCardsTool, recoverCardsHandler } from './recover-cards.js';
export { manageTagsTool, manageTagsHandler } from './manage-tags.js';
export { linkTagToProductTool, linkTagToProductHandler } from './link-tag-to-product.js';

/**
 * Массив всех инструментов для товаров
 */
import { getProductsTool } from './get-products.js';
import { updateContentTool } from './update-content.js';
import { updatePricesTool } from './update-prices.js';
import { updateStocksTool } from './update-stocks.js';
import { getParentCategoriesTool } from './get-parent-categories.js';
import { getSubjectsTool } from './get-subjects.js';
import { getSubjectCharcsTool } from './get-subject-charcs.js';
import { getColorsTool } from './get-colors.js';
import { getGenderKindsTool } from './get-gender-kinds.js';
import { getCountriesTool } from './get-countries.js';
import { getSeasonsTool } from './get-seasons.js';
import { getVatRatesTool } from './get-vat-rates.js';
import { getTnvedTool } from './get-tnved.js';
import { getBrandsTool } from './get-brands.js';
import { getFailedCardsTool } from './get-failed-cards.js';
import { mergeCardsTool } from './merge-cards.js';
import { deleteCardsTool } from './delete-cards.js';
import { recoverCardsTool } from './recover-cards.js';
import { manageTagsTool } from './manage-tags.js';
import { linkTagToProductTool } from './link-tag-to-product.js';

export const productTools = [
  getProductsTool,
  updateContentTool,
  updatePricesTool,
  updateStocksTool,
  getParentCategoriesTool,
  getSubjectsTool,
  getSubjectCharcsTool,
  getColorsTool,
  getGenderKindsTool,
  getCountriesTool,
  getSeasonsTool,
  getVatRatesTool,
  getTnvedTool,
  getBrandsTool,
  getFailedCardsTool,
  mergeCardsTool,
  deleteCardsTool,
  recoverCardsTool,
  manageTagsTool,
  linkTagToProductTool,
];

/**
 * Массив всех обработчиков для товаров
 */
import { getProductsHandler } from './get-products.js';
import { updateContentHandler } from './update-content.js';
import { updatePricesHandler } from './update-prices.js';
import { updateStocksHandler } from './update-stocks.js';
import { getParentCategoriesHandler } from './get-parent-categories.js';
import { getSubjectsHandler } from './get-subjects.js';
import { getSubjectCharcsHandler } from './get-subject-charcs.js';
import { getColorsHandler } from './get-colors.js';
import { getGenderKindsHandler } from './get-gender-kinds.js';
import { getCountriesHandler } from './get-countries.js';
import { getSeasonsHandler } from './get-seasons.js';
import { getVatRatesHandler } from './get-vat-rates.js';
import { getTnvedHandler } from './get-tnved.js';
import { getBrandsHandler } from './get-brands.js';
import { getFailedCardsHandler } from './get-failed-cards.js';
import { mergeCardsHandler } from './merge-cards.js';
import { deleteCardsHandler } from './delete-cards.js';
import { recoverCardsHandler } from './recover-cards.js';
import { manageTagsHandler } from './manage-tags.js';
import { linkTagToProductHandler } from './link-tag-to-product.js';

export const productHandlers = {
  wb_get_products: getProductsHandler,
  wb_update_product_content: updateContentHandler,
  wb_update_product_price: updatePricesHandler,
  wb_update_product_stock: updateStocksHandler,
  wb_get_parent_categories: getParentCategoriesHandler,
  wb_get_subjects: getSubjectsHandler,
  wb_get_subject_charcs: getSubjectCharcsHandler,
  wb_get_colors: getColorsHandler,
  wb_get_gender_kinds: getGenderKindsHandler,
  wb_get_countries: getCountriesHandler,
  wb_get_seasons: getSeasonsHandler,
  wb_get_vat_rates: getVatRatesHandler,
  wb_get_tnved: getTnvedHandler,
  wb_get_brands: getBrandsHandler,
  wb_get_failed_cards: getFailedCardsHandler,
  wb_merge_cards: mergeCardsHandler,
  wb_delete_cards: deleteCardsHandler,
  wb_recover_cards: recoverCardsHandler,
  wb_manage_tags: manageTagsHandler,
  wb_link_tag_to_product: linkTagToProductHandler,
};
