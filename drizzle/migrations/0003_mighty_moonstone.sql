ALTER TABLE "draft_activateToken" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "draft_activateToken" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "draft_activateToken" ALTER COLUMN "userId" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "draft_user" ADD COLUMN "name" text;