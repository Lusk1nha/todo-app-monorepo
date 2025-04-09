-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Admin" (
    "uid" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Admin_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User" ("uid") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Admin" ("createdAt", "uid", "updatedAt") SELECT "createdAt", "uid", "updatedAt" FROM "Admin";
DROP TABLE "Admin";
ALTER TABLE "new_Admin" RENAME TO "Admin";
CREATE TABLE "new_AuthProvider" (
    "uid" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    CONSTRAINT "AuthProvider_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User" ("uid") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_AuthProvider" ("type", "uid") SELECT "type", "uid" FROM "AuthProvider";
DROP TABLE "AuthProvider";
ALTER TABLE "new_AuthProvider" RENAME TO "AuthProvider";
CREATE TABLE "new_Credentials" (
    "uid" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Credentials_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User" ("uid") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Credentials" ("createdAt", "email", "passwordHash", "uid", "updatedAt") SELECT "createdAt", "email", "passwordHash", "uid", "updatedAt" FROM "Credentials";
DROP TABLE "Credentials";
ALTER TABLE "new_Credentials" RENAME TO "Credentials";
CREATE UNIQUE INDEX "Credentials_email_key" ON "Credentials"("email");
CREATE TABLE "new_Todo" (
    "uid" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "userUid" TEXT,
    CONSTRAINT "Todo_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "User" ("uid") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Todo" ("content", "createdAt", "title", "uid", "updatedAt", "userUid") SELECT "content", "createdAt", "title", "uid", "updatedAt", "userUid" FROM "Todo";
DROP TABLE "Todo";
ALTER TABLE "new_Todo" RENAME TO "Todo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
