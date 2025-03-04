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
    CONSTRAINT "UrlNickname_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UrlNickname_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "Url" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UrlNickname" ("createdAt", "id", "nickname", "updatedAt", "urlId", "userId") SELECT "createdAt", "id", "nickname", "updatedAt", "urlId", "userId" FROM "UrlNickname";
DROP TABLE "UrlNickname";
ALTER TABLE "new_UrlNickname" RENAME TO "UrlNickname";
CREATE UNIQUE INDEX "UrlNickname_userId_urlId_key" ON "UrlNickname"("userId", "urlId");
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
    CONSTRAINT "Utm_urlNicknameId_fkey" FOREIGN KEY ("urlNicknameId") REFERENCES "UrlNickname" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Utm" ("campaign", "content", "createdAt", "id", "medium", "nickname", "source", "term", "updatedAt", "urlNicknameId") SELECT "campaign", "content", "createdAt", "id", "medium", "nickname", "source", "term", "updatedAt", "urlNicknameId" FROM "Utm";
DROP TABLE "Utm";
ALTER TABLE "new_Utm" RENAME TO "Utm";
CREATE UNIQUE INDEX "Utm_urlNicknameId_source_medium_campaign_key" ON "Utm"("urlNicknameId", "source", "medium", "campaign");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
