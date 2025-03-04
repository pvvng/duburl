-- CreateTable
CREATE TABLE "UtmTracking" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ip" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "os" TEXT NOT NULL,
    "browser" TEXT NOT NULL,
    "browserVersion" TEXT NOT NULL,
    "device" TEXT NOT NULL,
    "utmId" INTEGER NOT NULL,
    CONSTRAINT "UtmTracking_utmId_fkey" FOREIGN KEY ("utmId") REFERENCES "Utm" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
