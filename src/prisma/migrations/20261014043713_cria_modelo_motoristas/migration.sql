/*
  Warnings:

  - You are about to drop the `Delivery` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Delivery";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Event";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "eventos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "deliveryId" INTEGER NOT NULL,
    CONSTRAINT "eventos_deliveryId_fkey" FOREIGN KEY ("deliveryId") REFERENCES "entregas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "entregas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT NOT NULL,
    "origem" TEXT NOT NULL,
    "destino" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'CRIADA',
    "motoristaId" INTEGER,
    CONSTRAINT "entregas_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "motoristas" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "motoristas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "placaVeiculo" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ATIVO'
);

-- CreateIndex
CREATE UNIQUE INDEX "motoristas_cpf_key" ON "motoristas"("cpf");
