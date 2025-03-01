-- CreateTable
CREATE TABLE "Utm" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "basedUrl" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "medium" TEXT NOT NULL,
    "campaign" TEXT NOT NULL,
    "term" TEXT,
    "content" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Utm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Utm_basedUrl_source_medium_campaign_key" ON "Utm"("basedUrl", "source", "medium", "campaign");
