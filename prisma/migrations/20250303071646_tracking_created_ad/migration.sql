/*
  Warnings:

  - Added the required column `updatedAt` to the `UtmTracking` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UtmTracking" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ip" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "os" TEXT NOT NULL,
    "browser" TEXT NOT NULL,
    "browserVersion" TEXT NOT NULL,
    "device" TEXT NOT NULL,
    "utmId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "UtmTracking_utmId_fkey" FOREIGN KEY ("utmId") REFERENCES "Utm" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UtmTracking" ("browser", "browserVersion", "device", "id", "ip", "language", "os", "platform", "utmId") SELECT "browser", "browserVersion", "device", "id", "ip", "language", "os", "platform", "utmId" FROM "UtmTracking";
DROP TABLE "UtmTracking";
ALTER TABLE "new_UtmTracking" RENAME TO "UtmTracking";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
