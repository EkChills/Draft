CREATE TABLE IF NOT EXISTS "draft_customerCode" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" text,
	"createdAt" timestamp DEFAULT now(),
	"userId" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "draft_document" ADD COLUMN "isStarred" boolean;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "draft_customerCode" ADD CONSTRAINT "draft_customerCode_userId_draft_user_id_fk" FOREIGN KEY ("userId") REFERENCES "draft_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
