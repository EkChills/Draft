CREATE TABLE IF NOT EXISTS "draft_memberships" (
	"userId" text,
	"spaceId" text,
	CONSTRAINT draft_memberships_userId_spaceId PRIMARY KEY("userId","spaceId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "draft_space" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"hostId" text NOT NULL,
	"space_name" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "draft_space" ADD CONSTRAINT "draft_space_hostId_draft_user_id_fk" FOREIGN KEY ("hostId") REFERENCES "draft_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
