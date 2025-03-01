/*
  Warnings:

  - You are about to drop the column `basedUrl` on the `Utm` table. All the data in the column will be lost.
  - Added the required column `urlId` to the `Utm` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Utm" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "source" TEXT NOT NULL,
    "medium" TEXT NOT NULL,
    "campaign" TEXT NOT NULL,
    "term" TEXT,
    "content" TEXT,
    "nickname" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "urlId" INTEGER NOT NULL,
    CONSTRAINT "Utm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Utm_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "Url" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Utm" ("campaign", "content", "createdAt", "id", "medium", "nickname", "source", "term", "updatedAt", "userId") SELECT "campaign", "content", "createdAt", "id", "medium", "nickname", "source", "term", "updatedAt", "userId" FROM "Utm";
DROP TABLE "Utm";
ALTER TABLE "new_Utm" RENAME TO "Utm";
CREATE UNIQUE INDEX "Utm_urlId_userId_source_medium_campaign_key" ON "Utm"("urlId", "userId", "source", "medium", "campaign");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
