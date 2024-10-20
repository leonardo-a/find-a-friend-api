/*
  Warnings:

  - You are about to drop the column `descriptions` on the `pets` table. All the data in the column will be lost.
  - Added the required column `description` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_pets" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "energy_level" TEXT NOT NULL,
    "independence_level" TEXT NOT NULL,
    "environment" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_pets" ("age", "energy_level", "environment", "id", "independence_level", "name", "org_id", "size") SELECT "age", "energy_level", "environment", "id", "independence_level", "name", "org_id", "size" FROM "pets";
DROP TABLE "pets";
ALTER TABLE "new_pets" RENAME TO "pets";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
