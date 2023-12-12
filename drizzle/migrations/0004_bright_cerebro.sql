CREATE TABLE IF NOT EXISTS "draft_document" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text,
	"description" text,
	"userId" text
);
