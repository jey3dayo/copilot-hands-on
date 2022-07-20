-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "seedId" INTEGER NOT NULL,
    "no" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("seedId", "no")
);
