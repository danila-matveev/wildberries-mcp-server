/**
 * Экспорт всех инструментов для работы с рекламой (маркетинг)
 */

import { ToolDefinition, ToolHandler } from '../../types/tools.js';

import { getCampaignsCountTool, getCampaignsCountHandler } from './get-campaigns-count.js';
import { getCampaignsTool, getCampaignsHandler } from './get-campaigns.js';
import { createCampaignTool, createCampaignHandler } from './create-campaign.js';
import { deleteCampaignTool, deleteCampaignHandler } from './delete-campaign.js';
import { renameCampaignTool, renameCampaignHandler } from './rename-campaign.js';
import { startCampaignTool, startCampaignHandler } from './start-campaign.js';
import { pauseCampaignTool, pauseCampaignHandler } from './pause-campaign.js';
import { stopCampaignTool, stopCampaignHandler } from './stop-campaign.js';
import { getMinBidsTool, getMinBidsHandler } from './get-min-bids.js';
import { setBidsTool, setBidsHandler } from './set-bids.js';
import { getBidRecommendationsTool, getBidRecommendationsHandler } from './get-bid-recommendations.js';
import { changePlacementsTool, changePlacementsHandler } from './change-placements.js';
import { changeCampaignProductsTool, changeCampaignProductsHandler } from './change-campaign-products.js';
import { getCampaignSubjectsTool, getCampaignSubjectsHandler } from './get-campaign-subjects.js';
import { getCampaignProductsTool, getCampaignProductsHandler } from './get-campaign-products.js';
import { getSearchBidsTool, getSearchBidsHandler } from './get-search-bids.js';
import { setSearchBidsTool, setSearchBidsHandler } from './set-search-bids.js';
import { deleteSearchBidsTool, deleteSearchBidsHandler } from './delete-search-bids.js';
import { getMinusPhrasesTool, getMinusPhrasesHandler } from './get-minus-phrases.js';
import { setMinusPhrasesTool, setMinusPhrasesHandler } from './set-minus-phrases.js';
import { getClusterStatsTool, getClusterStatsHandler } from './get-cluster-stats.js';
import { getAdBalanceTool, getAdBalanceHandler } from './get-ad-balance.js';
import { getAdBudgetTool, getAdBudgetHandler } from './get-ad-budget.js';
import { depositAdBudgetTool, depositAdBudgetHandler } from './deposit-ad-budget.js';
import { getAdSpendingTool, getAdSpendingHandler } from './get-ad-spending.js';

export const marketingTools: ToolDefinition[] = [
  getCampaignsCountTool,
  getCampaignsTool,
  createCampaignTool,
  deleteCampaignTool,
  renameCampaignTool,
  startCampaignTool,
  pauseCampaignTool,
  stopCampaignTool,
  getMinBidsTool,
  setBidsTool,
  getBidRecommendationsTool,
  changePlacementsTool,
  changeCampaignProductsTool,
  getCampaignSubjectsTool,
  getCampaignProductsTool,
  getSearchBidsTool,
  setSearchBidsTool,
  deleteSearchBidsTool,
  getMinusPhrasesTool,
  setMinusPhrasesTool,
  getClusterStatsTool,
  getAdBalanceTool,
  getAdBudgetTool,
  depositAdBudgetTool,
  getAdSpendingTool,
];

export const marketingHandlers: Record<string, ToolHandler> = {
  wb_get_campaigns_count: getCampaignsCountHandler,
  wb_get_campaigns: getCampaignsHandler,
  wb_create_campaign: createCampaignHandler,
  wb_delete_campaign: deleteCampaignHandler,
  wb_rename_campaign: renameCampaignHandler,
  wb_start_campaign: startCampaignHandler,
  wb_pause_campaign: pauseCampaignHandler,
  wb_stop_campaign: stopCampaignHandler,
  wb_get_min_bids: getMinBidsHandler,
  wb_set_bids: setBidsHandler,
  wb_get_bid_recommendations: getBidRecommendationsHandler,
  wb_change_placements: changePlacementsHandler,
  wb_change_campaign_products: changeCampaignProductsHandler,
  wb_get_campaign_subjects: getCampaignSubjectsHandler,
  wb_get_campaign_products: getCampaignProductsHandler,
  wb_get_search_bids: getSearchBidsHandler,
  wb_set_search_bids: setSearchBidsHandler,
  wb_delete_search_bids: deleteSearchBidsHandler,
  wb_get_minus_phrases: getMinusPhrasesHandler,
  wb_set_minus_phrases: setMinusPhrasesHandler,
  wb_get_cluster_stats: getClusterStatsHandler,
  wb_get_ad_balance: getAdBalanceHandler,
  wb_get_ad_budget: getAdBudgetHandler,
  wb_deposit_ad_budget: depositAdBudgetHandler,
  wb_get_ad_spending: getAdSpendingHandler,
};
