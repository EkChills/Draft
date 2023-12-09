CREATE TABLE IF NOT EXISTS "draft_activateToken" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"token" text,
	"activatedAt" timestamp,
	"createdAt" timestamp DEFAULT now(),
	"userId" uuid,
	CONSTRAINT "draft_activateToken_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "draft_user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255),
	"lastName" varchar(255),
	"active" boolean,
	"password" text,
	"createdAt" timestamp DEFAULT now()
);
