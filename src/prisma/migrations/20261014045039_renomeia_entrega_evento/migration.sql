/*
  Warnings:

  - You are about to drop the column `deliveryId` on the `eventos` table. All the data in the column will be lost.
  - Added the required column `entregaId` to the `eventos` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_eventos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "entregaId" INTEGER NOT NULL,
    CONSTRAINT "eventos_entregaId_fkey" FOREIGN KEY ("entregaId") REFERENCES "entregas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_eventos" ("data", "descricao", "id") SELECT "data", "descricao", "id" FROM "eventos";
DROP TABLE "eventos";
ALTER TABLE "new_eventos" RENAME TO "eventos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
