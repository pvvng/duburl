/*
  Warnings:

  - A unique constraint covering the columns `[baseUrl,source,medium,campaign,term,content]` on the table `Utm` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Utm_baseUrl_source_medium_campaign_term_content_key" ON "Utm"("baseUrl", "source", "medium", "campaign", "term", "content");
