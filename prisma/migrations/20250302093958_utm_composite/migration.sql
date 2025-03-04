/*
  Warnings:

  - A unique constraint covering the columns `[userUrlId,baseUrl,source,medium,campaign,term,content]` on the table `Utm` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Utm_baseUrl_source_medium_campaign_term_content_key";

-- CreateIndex
CREATE UNIQUE INDEX "Utm_userUrlId_baseUrl_source_medium_campaign_term_content_key" ON "Utm"("userUrlId", "baseUrl", "source", "medium", "campaign", "term", "content");
