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

// ============ 文章管理 API（增删改）============

// 创建文章
router.post('/api/articles', async (req, res) => {
  try {
    const client = getSupabaseClient();
    const { category_id, title, excerpt, content, image, author, is_published } = req.body;
    
    if (!title) {
      res.status(400).json({ success: false, error: '文章标题不能为空' });
      return;
    }
    
    const { data, error } = await client
      .from('articles')
      .insert({
        category_id: category_id || null,
        title,
        excerpt: excerpt || null,
        content: content || null,
        image: image || null,
        author: author || '管理员',
        is_published: is_published !== false,
        views: 0
      })
      .select()
      .single();
    
    if (error) throw new Error(`创建失败: ${error.message}`);
    res.json({ success: true, data, message: '文章创建成功' });
  } catch (err) {
    console.error('API Error:', err);
    res.status(500).json({ success: false, error: (err as Error).message });
  }
});

// 更新文章
router.put('/api/articles/:id', async (req, res) => {
  try {
    const client = getSupabaseClient();
    const { id } = req.params;
    const { category_id, title, excerpt, content, image, author, is_published } = req.body;
    
    if (!title) {
      res.status(400).json({ success: false, error: '文章标题不能为空' });
      return;
    }
    
    const { data, error } = await client
      .from('articles')
      .update({
        category_id: category_id || null,
        title,
        excerpt: excerpt || null,
        content: content || null,
        image: image || null,
        author: author || null,
        is_published: is_published !== false,
        updated_at: new Date().toISOString()
      })
      .eq('id', parseInt(id))
      .select()
      .single();
    
    if (error) throw new Error(`更新失败: ${error.message}`);
    res.json({ success: true, data, message: '文章更新成功' });
  } catch (err) {
    console.error('API Error:', err);
    res.status(500).json({ success: false, error: (err as Error).message });
  }
});

// 删除文章
router.delete('/api/articles/:id', async (req, res) => {
  try {
    const client = getSupabaseClient();
    const { id } = req.params;
    
    const { error } = await client
      .from('articles')
      .delete()
      .eq('id', parseInt(id));
    
    if (error) throw new Error(`删除失败: ${error.message}`);
    res.json({ success: true, message: '文章删除成功' });
  } catch (err) {
    console.error('API Error:', err);
    res.status(500).json({ success: false, error: (err as Error).message });
  }
});

// ============ 案例管理 API（增删改）============

// 创建案例
router.post('/api/cases', async (req, res) => {
  try {
    const client = getSupabaseClient();
    const { category, title, description, image, sort_order } = req.body;
    
    if (!title || !category) {
      res.status(400).json({ success: false, error: '案例分类和标题不能为空' });
      return;
    }
    
    const { data, error } = await client
      .from('cases')
      .insert({
        category,
        title,
        description: description || null,
        image: image || null,
        sort_order: sort_order || 0
      })
      .select()
      .single();
    
    if (error) throw new Error(`创建失败: ${error.message}`);
    res.json({ success: true, data, message: '案例创建成功' });
  } catch (err) {
    console.error('API Error:', err);
    res.status(500).json({ success: false, error: (err as Error).message });
  }
});

// 更新案例
router.put('/api/cases/:id', async (req, res) => {
  try {
    const client = getSupabaseClient();
    const { id } = req.params;
    const { category, title, description, image, sort_order } = req.body;
    
    if (!title || !category) {
      res.status(400).json({ success: false, error: '案例分类和标题不能为空' });
      return;
    }
    
    const { data, error } = await client
      .from('cases')
      .update({
        category,
        title,
        description: description || null,
        image: image || null,
        sort_order: sort_order || 0
      })
      .eq('id', parseInt(id))
      .select()
      .single();
    
    if (error) throw new Error(`更新失败: ${error.message}`);
    res.json({ success: true, data, message: '案例更新成功' });
  } catch (err) {
    console.error('API Error:', err);
    res.status(500).json({ success: false, error: (err as Error).message });
  }
});

// 删除案例
router.delete('/api/cases/:id', async (req, res) => {
  try {
    const client = getSupabaseClient();
    const { id } = req.params;
    
    const { error } = await client
      .from('cases')
      .delete()
      .eq('id', parseInt(id));
    
    if (error) throw new Error(`删除失败: ${error.message}`);
    res.json({ success: true, message: '案例删除成功' });
  } catch (err) {
    console.error('API Error:', err);
    res.status(500).json({ success: false, error: (err as Error).message });
  }
});

// ============ 文章分类管理 API（增删改）============

// 创建文章分类
router.post('/api/article-categories', async (req, res) => {
  try {
    const client = getSupabaseClient();
    const { name, slug, sort_order } = req.body;
    
    if (!name || !slug) {
      res.status(400).json({ success: false, error: '分类名称和标识不能为空' });
      return;
    }
    
    const { data, error } = await client
      .from('article_categories')
      .insert({
        name,
        slug,
        sort_order: sort_order || 0
      })
      .select()
      .single();
    
    if (error) throw new Error(`创建失败: ${error.message}`);
    res.json({ success: true, data, message: '分类创建成功' });
  } catch (err) {
    console.error('API Error:', err);
    res.status(500).json({ success: false, error: (err as Error).message });
  }
});

// 更新文章分类
router.put('/api/article-categories/:id', async (req, res) => {
  try {
    const client = getSupabaseClient();
    const { id } = req.params;
    const { name, slug, sort_order } = req.body;
    
    if (!name || !slug) {
      res.status(400).json({ success: false, error: '分类名称和标识不能为空' });
      return;
    }
    
    const { data, error } = await client
      .from('article_categories')
      .update({
        name,
        slug,
        sort_order: sort_order || 0
      })
      .eq('id', parseInt(id))
      .select()
      .single();
    
    if (error) throw new Error(`更新失败: ${error.message}`);
    res.json({ success: true, data, message: '分类更新成功' });
  } catch (err) {
    console.error('API Error:', err);
    res.status(500).json({ success: false, error: (err as Error).message });
  }
});

// 删除文章分类
router.delete('/api/article-categories/:id', async (req, res) => {
  try {
    const client = getSupabaseClient();
    const { id } = req.params;
    
    // 先检查该分类下是否有文章
    const { data: articles } = await client
      .from('articles')
      .select('id')
      .eq('category_id', parseInt(id));
    
    if (articles && articles.length > 0) {
      res.status(400).json({ success: false, error: '该分类下有文章，无法删除' });
      return;
    }
    
    const { error } = await client
      .from('article_categories')
      .delete()
      .eq('id', parseInt(id));
    
    if (error) throw new Error(`删除失败: ${error.message}`);
    res.json({ success: true, message: '分类删除成功' });
  } catch (err) {
    console.error('API Error:', err);
    res.status(500).json({ success: false, error: (err as Error).message });
  }
});

// ============ 导航管理 API ================

// 获取导航列表
router.get('/api/navigation', async (req, res) => {
  try {
    const client = getSupabaseClient();
    const { is_footer } = req.query;
    
    let query = client.from('navigation').select('*').order('sort_order', { ascending: true });
    
    if (is_footer !== undefined) {
      query = query.eq('is_footer', is_footer === 'true');
    }
    
    const { data, error } = await query;
    
    if (error) throw new Error(`获取失败: ${error.message}`);
    res.json({ success: true, data: data || [] });
  } catch (err) {
    console.error('API Error:', err);
    res.status(500).json({ success: false, error: (err as Error).message });
  }
});

// 创建导航项
router.post('/api/navigation', async (req, res) => {
  try {
    const client = getSupabaseClient();
    const { name, slug, url, icon, sort_order, is_active, is_footer, parent_id } = req.body;
    
    if (!name || !slug) {
      res.status(400).json({ success: false, error: '名称和标识不能为空' });
      return;
    }
    
    const { data, error } = await client
      .from('navigation')
      .insert({
        name,
        slug,
        url: url || null,
        icon: icon || null,
        sort_order: sort_order || 0,
        is_active: is_active !== false,
        is_footer: is_footer === true,
        parent_id: parent_id || null
      })
      .select()
      .single();
    
    if (error) throw new Error(`创建失败: ${error.message}`);
    res.json({ success: true, data, message: '导航项创建成功' });
  } catch (err) {
    console.error('API Error:', err);
    res.status(500).json({ success: false, error: (err as Error).message });
  }
});

// 更新导航项
router.put('/api/navigation/:id', async (req, res) => {
  try {
    const client = getSupabaseClient();
    const { id } = req.params;
    const { name, slug, url, icon, sort_order, is_active, is_footer, parent_id } = req.body;
    
    if (!name || !slug) {
      res.status(400).json({ success: false, error: '名称和标识不能为空' });
      return;
    }
    
    const { data, error } = await client
      .from('navigation')
      .update({
        name,
        slug,
        url: url || null,
        icon: icon || null,
        sort_order: sort_order || 0,
        is_active: is_active !== false,
        is_footer: is_footer === true,
        parent_id: parent_id || null,
        updated_at: new Date().toISOString()
      })
      .eq('id', parseInt(id))
      .select()
      .single();
    
    if (error) throw new Error(`更新失败: ${error.message}`);
    res.json({ success: true, data, message: '导航项更新成功' });
  } catch (err) {
    console.error('API Error:', err);
    res.status(500).json({ success: false, error: (err as Error).message });
  }
});

// 删除导航项
router.delete('/api/navigation/:id', async (req, res) => {
  try {
    const client = getSupabaseClient();
    const { id } = req.params;
    
    const { error } = await client
      .from('navigation')
      .delete()
      .eq('id', parseInt(id));
    
    if (error) throw new Error(`删除失败: ${error.message}`);
    res.json({ success: true, message: '导航项删除成功' });
  } catch (err) {
    console.error('API Error:', err);
    res.status(500).json({ success: false, error: (err as Error).message });
  }
});

// 批量更新导航排序
router.post('/api/navigation/reorder', async (req, res) => {
  try {
    const client = getSupabaseClient();
    const { items } = req.body;
    
    if (!items || !Array.isArray(items)) {
      res.status(400).json({ success: false, error: '无效的排序数据' });
      return;
    }
    
    // 批量更新排序
    for (const item of items) {
      await client
        .from('navigation')
        .update({ sort_order: item.sort_order, updated_at: new Date().toISOString() })
        .eq('id', item.id);
    }
    
    res.json({ success: true, message: '排序更新成功' });
  } catch (err) {
    console.error('API Error:', err);
    res.status(500).json({ success: false, error: (err as Error).message });
  }
});

export default router;
