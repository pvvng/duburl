/*
  Warnings:

  - Added the required column `baseUrl` to the `Utm` table without a default value. This is not possible if the table is not empty.

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
    "term" TEXT,
    "content" TEXT,
    "nickname" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userUrlId" INTEGER NOT NULL,
    CONSTRAINT "Utm_userUrlId_fkey" FOREIGN KEY ("userUrlId") REFERENCES "UserUrl" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Utm" ("campaign", "content", "createdAt", "id", "medium", "nickname", "source", "term", "updatedAt", "userUrlId") SELECT "campaign", "content", "createdAt", "id", "medium", "nickname", "source", "term", "updatedAt", "userUrlId" FROM "Utm";
DROP TABLE "Utm";
ALTER TABLE "new_Utm" RENAME TO "Utm";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
