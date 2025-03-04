/*
  Warnings:

  - You are about to drop the `Utm` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UtmTracking` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Utm";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UtmTracking";
PRAGMA foreign_keys=on;
