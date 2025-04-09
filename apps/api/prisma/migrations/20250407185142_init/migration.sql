-- CreateTable
CREATE TABLE "AuthProvider" (
    "uid" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    CONSTRAINT "AuthProvider_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User" ("uid") ON DELETE RESTRICT ON UPDATE CASCADE
);
