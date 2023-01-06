/*
  Warnings:

  - Added the required column `fromSender` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Message" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hour" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "message" TEXT NOT NULL,
    "senderName" TEXT NOT NULL,
    "fromSender" BOOLEAN NOT NULL,
    CONSTRAINT "Message_senderName_fkey" FOREIGN KEY ("senderName") REFERENCES "Friend" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Message" ("hour", "id", "message", "senderName") SELECT "hour", "id", "message", "senderName" FROM "Message";
DROP TABLE "Message";
ALTER TABLE "new_Message" RENAME TO "Message";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
