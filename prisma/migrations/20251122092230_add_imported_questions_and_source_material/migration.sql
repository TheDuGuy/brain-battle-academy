-- CreateTable
CREATE TABLE "SourceMaterial" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "ImportedQuestion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sourceId" TEXT NOT NULL,
    "number" INTEGER,
    "subject" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "gameTags" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "optionsJson" TEXT,
    "answer" TEXT,
    "explanation" TEXT,
    "metadataJson" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ImportedQuestion_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "SourceMaterial" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "ImportedQuestion_subject_type_idx" ON "ImportedQuestion"("subject", "type");

-- CreateIndex
CREATE INDEX "ImportedQuestion_sourceId_idx" ON "ImportedQuestion"("sourceId");
