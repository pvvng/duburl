/*
  Warnings:

  - Made the column `content` on table `Utm` required. This step will fail if there are existing NULL values in that column.
  - Made the column `term` on table `Utm` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Utm" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "baseUrl" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "medium" TEXT NOT NULL,
    "campaign" TEXT NOT NULL,
    "term" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "nickname" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userUrlId" INTEGER NOT NULL,
    CONSTRAINT "Utm_userUrlId_fkey" FOREIGN KEY ("userUrlId") REFERENCES "UserUrl" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Utm" ("baseUrl", "campaign", "content", "createdAt", "id", "medium", "nickname", "source", "term", "updatedAt", "userUrlId") SELECT "baseUrl", "campaign", "content", "createdAt", "id", "medium", "nickname", "source", "term", "updatedAt", "userUrlId" FROM "Utm";
DROP TABLE "Utm";
ALTER TABLE "new_Utm" RENAME TO "Utm";
CREATE UNIQUE INDEX "Utm_baseUrl_source_medium_campaign_term_content_key" ON "Utm"("baseUrl", "source", "medium", "campaign", "term", "content");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
