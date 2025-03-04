/*
  Warnings:

  - You are about to drop the column `baseUrl` on the `Utm` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Utm" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
INSERT INTO "new_Utm" ("campaign", "content", "createdAt", "id", "medium", "nickname", "source", "term", "updatedAt", "userUrlId") SELECT "campaign", "content", "createdAt", "id", "medium", "nickname", "source", "term", "updatedAt", "userUrlId" FROM "Utm";
DROP TABLE "Utm";
ALTER TABLE "new_Utm" RENAME TO "Utm";
CREATE UNIQUE INDEX "Utm_userUrlId_source_medium_campaign_term_content_key" ON "Utm"("userUrlId", "source", "medium", "campaign", "term", "content");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
