/*
  Warnings:

  - The primary key for the `UrlNickname` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `UrlNickname` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UrlNickname" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "urlId" INTEGER NOT NULL,
    "nickname" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "UrlNickname_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UrlNickname_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "Url" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UrlNickname" ("createdAt", "nickname", "updatedAt", "urlId", "userId") SELECT "createdAt", "nickname", "updatedAt", "urlId", "userId" FROM "UrlNickname";
DROP TABLE "UrlNickname";
ALTER TABLE "new_UrlNickname" RENAME TO "UrlNickname";
CREATE UNIQUE INDEX "UrlNickname_userId_urlId_key" ON "UrlNickname"("userId", "urlId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
