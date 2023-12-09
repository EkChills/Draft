CREATE TABLE IF NOT EXISTS "draft_account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT draft_account_provider_providerAccountId PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "draft_session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "draft_verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT draft_verificationToken_identifier_token PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
ALTER TABLE "draft_user" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "draft_user" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "draft_user" ALTER COLUMN "email" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "draft_user" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "draft_user" ALTER COLUMN "firstName" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "draft_user" ALTER COLUMN "lastName" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "draft_user" ADD COLUMN "emailVerified" timestamp;--> statement-breakpoint
ALTER TABLE "draft_user" ADD COLUMN "image" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "draft_account" ADD CONSTRAINT "draft_account_userId_draft_user_id_fk" FOREIGN KEY ("userId") REFERENCES "draft_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "draft_session" ADD CONSTRAINT "draft_session_userId_draft_user_id_fk" FOREIGN KEY ("userId") REFERENCES "draft_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
