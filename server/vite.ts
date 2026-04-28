// ABOUTME: Vite integration for Express server
// ABOUTME: Handles dev middleware and production static file serving

import type { Application, Request, Response, NextFunction } from 'express';
import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import viteConfig from '../vite.config';

const isDev = process.env.COZE_PROJECT_ENV !== 'PROD';

/**
 * 集成 Vite 开发服务器（中间件模式）
 */
export async function setupViteMiddleware(app: Application) {
  const vite = await createViteServer({
    ...viteConfig,
    server: {
      ...viteConfig.server,
      middlewareMode: true,
    },
    appType: 'spa',
  });

  // 服务 admin 目录的静态文件
  const adminPath = path.resolve(process.cwd(), 'admin');
  if (fs.existsSync(adminPath)) {
    app.use('/admin', express.static(adminPath));
  }

  // 使用 Vite middleware 处理非 API 请求
  // 使用条件判断来避免 response 对象被修改
  app.use((req: Request, res: Response, next: NextFunction) => {
    // API 请求跳过 Vite 中间件，直接交给下一个中间件处理
    if (req.url.startsWith('/api/')) {
      return next();
    }
    // 静态文件请求也跳过
    if (req.url.startsWith('/admin/')) {
      return next();
    }
    // 确保 res 是有效的 Express Response 对象
    if (typeof res.status !== 'function') {
      return next();
    }
    // 其他请求使用 Vite 中间件
    vite.middlewares(req, res, next);
  });

  console.log('🚀 Vite dev server initialized');
}

/**
 * 设置生产环境静态文件服务
 */
export function setupStaticServer(app: Application) {
  const distPath = path.resolve(process.cwd(), 'dist');

  if (!fs.existsSync(distPath)) {
    console.error('❌ dist folder not found. Please run "pnpm build" first.');
    process.exit(1);
  }

  // 1. 服务静态文件（如果存在对应文件则直接返回）
  app.use(express.static(distPath));

  // 2. SPA fallback - 所有未处理的请求返回 index.html
  // 到达这里的请求说明：
  //   - 不是 API 请求（已被前面注册的路由处理）
  //   - 不是静态文件（express.static 未找到对应文件）
  //   - 需要返回 index.html 让前端路由处理
  app.use((_req: Request, res: Response) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });

  console.log('📦 Serving static files from dist/');
}

/**
 * 根据环境设置 Vite
 */
export async function setupVite(app: Application) {
  if (isDev) {
    await setupViteMiddleware(app);
  } else {
    setupStaticServer(app);
  }
}
