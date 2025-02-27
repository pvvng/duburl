-- CreateTable
CREATE TABLE "OriginalUrl" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ShortenedUrl" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "originalUrlId" INTEGER NOT NULL,
    "short_url" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "ShortenedUrl_originalUrlId_fkey" FOREIGN KEY ("originalUrlId") REFERENCES "OriginalUrl" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
