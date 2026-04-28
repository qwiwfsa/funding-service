import { pgTable, serial, timestamp, varchar, text, integer, boolean, index } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

// 文章分类表
export const articleCategories = pgTable(
  "article_categories",
  {
    id: serial().primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    slug: varchar("slug", { length: 100 }).notNull().unique(),
    sort_order: integer("sort_order").default(0).notNull(),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("article_categories_slug_idx").on(table.slug),
    index("article_categories_sort_idx").on(table.sort_order),
  ]
);

// 文章表
export const articles = pgTable(
  "articles",
  {
    id: serial().primaryKey(),
    category_id: integer("category_id").references(() => articleCategories.id),
    title: varchar("title", { length: 255 }).notNull(),
    excerpt: text("excerpt"),
    content: text("content"),
    image: varchar("image", { length: 500 }),
    views: integer("views").default(0).notNull(),
    author: varchar("author", { length: 100 }),
    is_published: boolean("is_published").default(true).notNull(),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("articles_category_idx").on(table.category_id),
    index("articles_published_idx").on(table.is_published),
    index("articles_created_idx").on(table.created_at),
  ]
);

// 用户咨询表
export const consultations = pgTable(
  "consultations",
  {
    id: serial().primaryKey(),
    name: varchar("name", { length: 100 }),
    phone: varchar("phone", { length: 20 }),
    email: varchar("email", { length: 100 }),
    company: varchar("company", { length: 200 }),
    business_type: varchar("business_type", { length: 100 }),
    message: text("message"),
    status: varchar("status", { length: 20 }).default("pending").notNull(),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("consultations_status_idx").on(table.status),
    index("consultations_created_idx").on(table.created_at),
  ]
);

// 业务案例表
export const cases = pgTable(
  "cases",
  {
    id: serial().primaryKey(),
    category: varchar("category", { length: 100 }).notNull(),
    title: varchar("title", { length: 200 }).notNull(),
    description: text("description"),
    image: varchar("image", { length: 500 }),
    sort_order: integer("sort_order").default(0).notNull(),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("cases_category_idx").on(table.category),
    index("cases_sort_idx").on(table.sort_order),
  ]
);
