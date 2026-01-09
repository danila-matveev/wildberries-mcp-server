#!/usr/bin/env node

/**
 * Точка входа MCP сервера для Wildberries API
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { allTools, getHandler } from './tools/index.js';
import { logger } from './utils/logger.js';
import { config } from './config/config.js';

/**
 * Создание и настройка MCP сервера
 */
async function main() {
  try {
    logger.info('Starting Wildberries MCP Server', {
      version: '0.1.0',
      nodeEnv: config.nodeEnv,
    });

    // Создаём MCP сервер
    const server = new Server(
      {
        name: 'wildberries-mcp-server',
        version: '0.1.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    /**
     * Обработчик запроса списка инструментов
     */
    server.setRequestHandler(ListToolsRequestSchema, async () => {
      logger.debug('Listing tools', { count: allTools.length });
      
      return {
        tools: allTools.map((tool) => ({
          name: tool.name,
          description: tool.description,
          inputSchema: tool.inputSchema,
        })),
      };
    });

    /**
     * Обработчик вызова инструмента
     */
    server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      logger.info('Tool called', { name, args });

      try {
        // Получаем обработчик инструмента
        const handler = getHandler(name);

        if (!handler) {
          const errorMsg = `Unknown tool: ${name}`;
          logger.error(errorMsg);
          return {
            content: [
              {
                type: 'text' as const,
                text: JSON.stringify({ error: errorMsg }, null, 2),
              },
            ],
            isError: true,
          };
        }

        // Выполняем обработчик
        const result = await handler(args || {});

        logger.info('Tool executed successfully', { name });

        return result;
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        logger.error('Tool execution failed', {
          name,
          error: errorMsg,
        });

        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(
                {
                  error: errorMsg,
                  tool: name,
                },
                null,
                2
              ),
            },
          ],
          isError: true,
        };
      }
    });

    // Создаём stdio transport
    const transport = new StdioServerTransport();

    // Подключаем transport к серверу
    await server.connect(transport);

    logger.info('Wildberries MCP Server started successfully', {
      toolsCount: allTools.length,
    });

    // Обработка сигналов завершения
    const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
    signals.forEach((signal) => {
      process.on(signal, async () => {
        logger.info('Shutting down Wildberries MCP Server', { signal });
        await server.close();
        process.exit(0);
      });
    });
  } catch (error) {
    logger.error('Failed to start MCP Server', { error });
    process.exit(1);
  }
}

// Запуск сервера
main().catch((error) => {
  logger.error('Unhandled error in main', { error });
  process.exit(1);
});
