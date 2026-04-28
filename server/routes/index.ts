import { Router } from 'express';
import { getSupabaseClient } from '../storage/database/supabase-client';

const router = Router();

// 健康检查接口
router.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    env: process.env.COZE_PROJECT_ENV,
    timestamp: new Date().toISOString(),
  });
});

// ============ 文章分类 API ============

// 获取所有文章分类
router.get('/api/article-categories', async (req, res) => {
  try {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from('article_categories')
      .select('*')
      .order('sort_order', { ascending: true });
    
    if (error) throw new Error(`查询失败: ${error.message}`);
    res.json({ success: true, data });
  } catch (err) {
    console.error('API Error:', err);
    res.status(500).json({ success: false, error: (err as Error).message });
  }
});

// ============ 文章 API ============

// 获取所有文章（支持分类筛选）
router.get('/api/articles', async (req, res) => {
  try {
    const client = getSupabaseClient();
    const { category_id, published } = req.query;
    
    let query = client.from('articles').select('*, article_categories(name, slug)');
    
    if (category_id && category_id !== 'all') {
      query = query.eq('category_id', parseInt(category_id as string));
    }
    
    if (published !== 'false') {
      query = query.eq('is_published', true);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw new Error(`查询失败: ${error.message}`);
    res.json({ success: true, data });
  } catch (err) {
    console.error('API Error:', err);
    res.status(500).json({ success: false, error: (err as Error).message });
  }
});

// 获取单篇文章
router.get('/api/articles/:id', async (req, res) => {
  try {
    const client = getSupabaseClient();
    const { id } = req.params;
    
    // 获取文章
    const { data: article, error } = await client
      .from('articles')
      .select('*, article_categories(name, slug)')
      .eq('id', parseInt(id))
      .maybeSingle();
    
    if (error) throw new Error(`查询失败: ${error.message}`);
    if (!article) {
      res.status(404).json({ success: false, error: '文章不存在' });
      return;
    }
    
    // 增加阅读量
    await client
      .from('articles')
      .update({ views: (article.views || 0) + 1 })
      .eq('id', parseInt(id));
    
    res.json({ success: true, data: article });
  } catch (err) {
    console.error('API Error:', err);
    res.status(500).json({ success: false, error: (err as Error).message });
  }
});

// ============ 用户咨询 API ============

// 提交咨询
router.post('/api/consultations', async (req, res) => {
  try {
    const client = getSupabaseClient();
    const { name, phone, email, company, business_type, message } = req.body;
    
    if (!name && !phone && !email) {
      res.status(400).json({ success: false, error: '请至少填写姓名、电话或邮箱' });
      return;
    }
    
    const { data, error } = await client
      .from('consultations')
      .insert({
        name: name || null,
        phone: phone || null,
        email: email || null,
        company: company || null,
        business_type: business_type || null,
        message: message || null,
        status: 'pending'
      })
      .select()
      .single();
    
    if (error) throw new Error(`提交失败: ${error.message}`);
    res.json({ success: true, data, message: '提交成功，我们会尽快联系您' });
  } catch (err) {
    console.error('API Error:', err);
    res.status(500).json({ success: false, error: (err as Error).message });
  }
});

// 获取所有咨询记录（后台管理）
router.get('/api/consultations', async (req, res) => {
  try {
    const client = getSupabaseClient();
    const { status } = req.query;
    
    let query = client.from('consultations').select('*');
    
    if (status && status !== 'all') {
      query = query.eq('status', status);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw new Error(`查询失败: ${error.message}`);
    res.json({ success: true, data });
  } catch (err) {
    console.error('API Error:', err);
    res.status(500).json({ success: false, error: (err as Error).message });
  }
});

// 更新咨询状态
router.patch('/api/consultations/:id', async (req, res) => {
  try {
    const client = getSupabaseClient();
    const { id } = req.params;
    const { status } = req.body;
    
    if (!['pending', 'contacted', 'completed'].includes(status)) {
      res.status(400).json({ success: false, error: '无效的状态值' });
      return;
    }
    
    const { data, error } = await client
      .from('consultations')
      .update({ status })
      .eq('id', parseInt(id))
      .select()
      .single();
    
    if (error) throw new Error(`更新失败: ${error.message}`);
    res.json({ success: true, data });
  } catch (err) {
    console.error('API Error:', err);
    res.status(500).json({ success: false, error: (err as Error).message });
  }
});

// ============ 案例 API ============

// 获取所有案例
router.get('/api/cases', async (req, res) => {
  try {
    const client = getSupabaseClient();
    const { category } = req.query;
    
    let query = client.from('cases').select('*');
    
    if (category && category !== 'all') {
      query = query.eq('category', category);
    }
    
    const { data, error } = await query.order('sort_order', { ascending: true });
    
    if (error) throw new Error(`查询失败: ${error.message}`);
    res.json({ success: true, data });
  } catch (err) {
    console.error('API Error:', err);
    res.status(500).json({ success: false, error: (err as Error).message });
  }
});

export default router;
