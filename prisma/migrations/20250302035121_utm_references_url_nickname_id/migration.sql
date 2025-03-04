/*
  Warnings:

  - You are about to drop the column `urlNicknameUrlId` on the `Utm` table. All the data in the column will be lost.
  - You are about to drop the column `urlNicknameUserId` on the `Utm` table. All the data in the column will be lost.
  - Added the required column `urlNicknameId` to the `Utm` table without a default value. This is not possible if the table is not empty.

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
    "urlNicknameId" INTEGER NOT NULL,
    CONSTRAINT "Utm_urlNicknameId_fkey" FOREIGN KEY ("urlNicknameId") REFERENCES "UrlNickname" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Utm" ("campaign", "content", "createdAt", "id", "medium", "nickname", "source", "term", "updatedAt") SELECT "campaign", "content", "createdAt", "id", "medium", "nickname", "source", "term", "updatedAt" FROM "Utm";
DROP TABLE "Utm";
ALTER TABLE "new_Utm" RENAME TO "Utm";
CREATE UNIQUE INDEX "Utm_source_medium_campaign_key" ON "Utm"("source", "medium", "campaign");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
