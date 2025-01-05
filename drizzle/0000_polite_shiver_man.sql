CREATE TYPE "public"."ROLE" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"username" text NOT NULL,
	"role" "ROLE" DEFAULT 'user' NOT NULL,
	"password" text NOT NULL,
	"avatar" text DEFAULT '/no-avatar.png' NOT NULL,
	"isActive" boolean DEFAULT false NOT NULL,
	"activeCode" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
