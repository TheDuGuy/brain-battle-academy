-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Progress" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "gameType" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "totalStars" INTEGER NOT NULL DEFAULT 0,
    "gamesPlayed" INTEGER NOT NULL DEFAULT 0,
    "bestAccuracy" REAL NOT NULL DEFAULT 0,
    "lastPlayedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "skillLevel" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "Progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Progress" ("bestAccuracy", "gameType", "gamesPlayed", "id", "lastPlayedAt", "level", "subject", "totalStars", "userId") SELECT "bestAccuracy", "gameType", "gamesPlayed", "id", "lastPlayedAt", "level", "subject", "totalStars", "userId" FROM "Progress";
DROP TABLE "Progress";
ALTER TABLE "new_Progress" RENAME TO "Progress";
CREATE UNIQUE INDEX "Progress_userId_subject_gameType_key" ON "Progress"("userId", "subject", "gameType");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
