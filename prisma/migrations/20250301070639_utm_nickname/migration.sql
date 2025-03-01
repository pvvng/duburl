/*
  Warnings:

  - A unique constraint covering the columns `[basedUrl,source,medium,campaign,userId]` on the table `Utm` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Utm_basedUrl_source_medium_campaign_key";

-- AlterTable
ALTER TABLE "Utm" ADD COLUMN "nickname" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Utm_basedUrl_source_medium_campaign_userId_key" ON "Utm"("basedUrl", "source", "medium", "campaign", "userId");
