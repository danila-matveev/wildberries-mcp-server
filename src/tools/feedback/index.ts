/**
 * Экспорт всех инструментов для работы с отзывами и вопросами
 */

import { ToolDefinition, ToolHandler } from '../../types/tools.js';

import { getNewFeedbacksQuestionsTool, getNewFeedbacksQuestionsHandler } from './get-new-feedbacks-questions.js';
import { getQuestionsCountTool, getQuestionsCountHandler } from './get-questions-count.js';
import { getQuestionsTool, getQuestionsHandler } from './get-questions.js';
import { getQuestionTool, getQuestionHandler } from './get-question.js';
import { answerQuestionTool, answerQuestionHandler } from './answer-question.js';
import { getFeedbacksCountTool, getFeedbacksCountHandler } from './get-feedbacks-count.js';
import { getFeedbacksTool, getFeedbacksHandler } from './get-feedbacks.js';
import { getFeedbackTool, getFeedbackHandler } from './get-feedback.js';
import { answerFeedbackTool, answerFeedbackHandler } from './answer-feedback.js';
import { editFeedbackAnswerTool, editFeedbackAnswerHandler } from './edit-feedback-answer.js';
import { returnFeedbackOrderTool, returnFeedbackOrderHandler } from './return-feedback-order.js';
import { getArchivedFeedbacksTool, getArchivedFeedbacksHandler } from './get-archived-feedbacks.js';
import { getPinnedReviewsTool, getPinnedReviewsHandler } from './get-pinned-reviews.js';
import { pinReviewsTool, pinReviewsHandler } from './pin-reviews.js';
import { unpinReviewsTool, unpinReviewsHandler } from './unpin-reviews.js';
import { getChatsTool, getChatsHandler } from './get-chats.js';
import { getChatEventsTool, getChatEventsHandler } from './get-chat-events.js';
import { sendChatMessageTool, sendChatMessageHandler } from './send-chat-message.js';

export const feedbackTools: ToolDefinition[] = [
  getNewFeedbacksQuestionsTool,
  getQuestionsCountTool,
  getQuestionsTool,
  getQuestionTool,
  answerQuestionTool,
  getFeedbacksCountTool,
  getFeedbacksTool,
  getFeedbackTool,
  answerFeedbackTool,
  editFeedbackAnswerTool,
  returnFeedbackOrderTool,
  getArchivedFeedbacksTool,
  getPinnedReviewsTool,
  pinReviewsTool,
  unpinReviewsTool,
  getChatsTool,
  getChatEventsTool,
  sendChatMessageTool,
];

export const feedbackHandlers: Record<string, ToolHandler> = {
  wb_get_new_feedbacks_questions: getNewFeedbacksQuestionsHandler,
  wb_get_questions_count: getQuestionsCountHandler,
  wb_get_questions: getQuestionsHandler,
  wb_get_question: getQuestionHandler,
  wb_answer_question: answerQuestionHandler,
  wb_get_feedbacks_count: getFeedbacksCountHandler,
  wb_get_feedbacks: getFeedbacksHandler,
  wb_get_feedback: getFeedbackHandler,
  wb_answer_feedback: answerFeedbackHandler,
  wb_edit_feedback_answer: editFeedbackAnswerHandler,
  wb_return_feedback_order: returnFeedbackOrderHandler,
  wb_get_archived_feedbacks: getArchivedFeedbacksHandler,
  wb_get_pinned_reviews: getPinnedReviewsHandler,
  wb_pin_reviews: pinReviewsHandler,
  wb_unpin_reviews: unpinReviewsHandler,
  wb_get_chats: getChatsHandler,
  wb_get_chat_events: getChatEventsHandler,
  wb_send_chat_message: sendChatMessageHandler,
};
