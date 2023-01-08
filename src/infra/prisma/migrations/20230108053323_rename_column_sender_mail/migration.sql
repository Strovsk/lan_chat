/*
  Warnings:

  - You are about to drop the column `fromSender` on the `Message` table. All the data in the column will be lost.
  - Added the required column `senderIsMailler` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Message" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hour" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "message" TEXT NOT NULL,
    "senderAddress" TEXT NOT NULL,
    "senderIsMailler" BOOLEAN NOT NULL,
    CONSTRAINT "Message_senderAddress_fkey" FOREIGN KEY ("senderAddress") REFERENCES "Friend" ("address") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Message" ("hour", "id", "message", "senderAddress") SELECT "hour", "id", "message", "senderAddress" FROM "Message";
DROP TABLE "Message";
ALTER TABLE "new_Message" RENAME TO "Message";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
