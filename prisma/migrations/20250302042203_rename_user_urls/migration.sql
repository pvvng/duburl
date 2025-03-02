/*
  Warnings:

  - You are about to drop the `UrlNickname` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `urlNicknameId` on the `Utm` table. All the data in the column will be lost.
  - Added the required column `userUrlId` to the `Utm` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "UrlNickname_userId_urlId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UrlNickname";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "UserUrl" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "urlId" INTEGER NOT NULL,
    "nickname" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "UserUrl_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UserUrl_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "Url" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

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
    "userUrlId" INTEGER NOT NULL,
    CONSTRAINT "Utm_userUrlId_fkey" FOREIGN KEY ("userUrlId") REFERENCES "UserUrl" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Utm" ("campaign", "content", "createdAt", "id", "medium", "nickname", "source", "term", "updatedAt") SELECT "campaign", "content", "createdAt", "id", "medium", "nickname", "source", "term", "updatedAt" FROM "Utm";
DROP TABLE "Utm";
ALTER TABLE "new_Utm" RENAME TO "Utm";
CREATE UNIQUE INDEX "Utm_userUrlId_source_medium_campaign_key" ON "Utm"("userUrlId", "source", "medium", "campaign");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "UserUrl_userId_urlId_key" ON "UserUrl"("userId", "urlId");
