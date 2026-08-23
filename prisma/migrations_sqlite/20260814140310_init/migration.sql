-- CreateTable
CREATE TABLE "Issue" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT NOT NULL,
    "coverImageKey" TEXT,
    "coverImageOriginalName" TEXT,
    "coverImageSize" INTEGER,
    "coverImageMimeType" TEXT,
    "coverImageUploadedAt" DATETIME,
    "publicationKey" TEXT,
    "publicationOriginalName" TEXT,
    "publicationSize" INTEGER,
    "publicationMimeType" TEXT,
    "publicationUploadedAt" DATETIME,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'EDITOR',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Issue_slug_key" ON "Issue"("slug");

-- CreateIndex
CREATE INDEX "Issue_slug_idx" ON "Issue"("slug");

-- CreateIndex
CREATE INDEX "Issue_number_idx" ON "Issue"("number");

-- CreateIndex
CREATE INDEX "Issue_published_idx" ON "Issue"("published");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");
