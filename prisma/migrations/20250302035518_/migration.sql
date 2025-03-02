/*
  Warnings:

  - A unique constraint covering the columns `[urlNicknameId,source,medium,campaign]` on the table `Utm` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Utm_source_medium_campaign_key";

-- CreateIndex
CREATE UNIQUE INDEX "Utm_urlNicknameId_source_medium_campaign_key" ON "Utm"("urlNicknameId", "source", "medium", "campaign");
