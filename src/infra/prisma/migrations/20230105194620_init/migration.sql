-- CreateTable
CREATE TABLE "Friend" (
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Message" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hour" DATETIME NOT NULL,
    "message" TEXT NOT NULL,
    "senderName" TEXT NOT NULL,
    CONSTRAINT "Message_senderName_fkey" FOREIGN KEY ("senderName") REFERENCES "Friend" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Friend_name_key" ON "Friend"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Friend_address_key" ON "Friend"("address");
