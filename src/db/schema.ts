import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";

export const ROLE = pgEnum("ROLE", ["user", "admin"]);

export const users = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),

  email: text().notNull().unique(),
  username: text().notNull(),
  role: ROLE().notNull().default("user"),
  password: text().notNull(),
  avatar: text().notNull().default("/no-avatar.png"),
  isActive: boolean().notNull().default(false),
  activeCode: integer().$defaultFn(() => Math.trunc(Math.random() * 1000000)),

  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});
