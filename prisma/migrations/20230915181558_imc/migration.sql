-- CreateTable
CREATE TABLE "Imc" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "peso" REAL NOT NULL,
    "altura" REAL NOT NULL,
    "imc" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
