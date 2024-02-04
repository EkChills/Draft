DO $$ BEGIN
 CREATE TYPE "document_status" AS ENUM('DELETED', 'ACTIVE', 'PENDING');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "draft_document" ADD COLUMN "document_status" "document_status";