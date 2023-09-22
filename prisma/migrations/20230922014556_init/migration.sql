-- CreateEnum
CREATE TYPE "Size" AS ENUM ('TINY', 'SMALL', 'MEDIUM', 'LARGE', 'HUGE');

-- CreateEnum
CREATE TYPE "GenMethod" AS ENUM ('MANUAL', 'ARRAY', 'POINT');

-- CreateEnum
CREATE TYPE "Senses" AS ENUM ('BLINDSIGHT', 'DARKVISION', 'TREMORSENSE', 'TRUESIGHT');

-- CreateEnum
CREATE TYPE "HowProficent" AS ENUM ('NONE', 'PROFICENT', 'EXTRA');

-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('ARMOR', 'WEAPON', 'RING', 'ROD', 'SCROLL', 'STAFF', 'WAND', 'MAGIC_ITEM');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "name" TEXT,
    "level" INTEGER NOT NULL DEFAULT 1,
    "feats" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "speed" INTEGER NOT NULL DEFAULT 30,
    "armorClass" INTEGER NOT NULL DEFAULT 10,
    "initiative" INTEGER NOT NULL DEFAULT 0,
    "inspiration" BOOLEAN NOT NULL DEFAULT false,
    "healthMax" INTEGER NOT NULL,
    "healthCurrent" INTEGER NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Race" (
    "id" SERIAL NOT NULL,
    "characterId" TEXT,
    "name" TEXT NOT NULL,
    "variants" TEXT[],

    CONSTRAINT "Race_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RacialTraits" (
    "id" SERIAL NOT NULL,
    "raceName" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL DEFAULT 1,
    "size" "Size" NOT NULL DEFAULT 'MEDIUM',
    "languages" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "abilityBonuses" JSONB NOT NULL,
    "racialAbilities" JSONB[],

    CONSTRAINT "RacialTraits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Class" (
    "id" SERIAL NOT NULL,
    "characterId" TEXT,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "subClasses" TEXT[],

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassFeatures" (
    "id" SERIAL NOT NULL,
    "className" TEXT NOT NULL,
    "armorProficency" TEXT[],
    "weaponProficency" TEXT[],
    "toolProficency" TEXT[],
    "savingThrowBonus" TEXT[],
    "skillProfOptions" TEXT[],

    CONSTRAINT "ClassFeatures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Abilities" (
    "id" SERIAL NOT NULL,
    "characterId" TEXT NOT NULL,
    "genMethod" "GenMethod" NOT NULL DEFAULT 'MANUAL',
    "strength" INTEGER NOT NULL DEFAULT 10,
    "dexterity" INTEGER NOT NULL DEFAULT 10,
    "constitution" INTEGER NOT NULL DEFAULT 10,
    "intelligence" INTEGER NOT NULL DEFAULT 10,
    "wisdom" INTEGER NOT NULL DEFAULT 10,
    "charisma" INTEGER NOT NULL DEFAULT 10,
    "senses" "Senses"[] DEFAULT ARRAY[]::"Senses"[],

    CONSTRAINT "Abilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Description" (
    "id" SERIAL NOT NULL,
    "characterId" TEXT NOT NULL,
    "background" TEXT,

    CONSTRAINT "Description_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" SERIAL NOT NULL,
    "characterId" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proficencies" (
    "id" SERIAL NOT NULL,
    "characterId" TEXT NOT NULL,
    "savingStrength" "HowProficent" NOT NULL DEFAULT 'NONE',
    "savingDexterity" "HowProficent" NOT NULL DEFAULT 'NONE',
    "savingConstitution" "HowProficent" NOT NULL DEFAULT 'NONE',
    "savingIntelligence" "HowProficent" NOT NULL DEFAULT 'NONE',
    "savingWisdom" "HowProficent" NOT NULL DEFAULT 'NONE',
    "savingCharisma" "HowProficent" NOT NULL DEFAULT 'NONE',
    "acrobatics" "HowProficent" NOT NULL DEFAULT 'NONE',
    "animalHandling" "HowProficent" NOT NULL DEFAULT 'NONE',
    "arcana" "HowProficent" NOT NULL DEFAULT 'NONE',
    "athletics" "HowProficent" NOT NULL DEFAULT 'NONE',
    "deception" "HowProficent" NOT NULL DEFAULT 'NONE',
    "history" "HowProficent" NOT NULL DEFAULT 'NONE',
    "insight" "HowProficent" NOT NULL DEFAULT 'NONE',
    "intimidation" "HowProficent" NOT NULL DEFAULT 'NONE',
    "investigation" "HowProficent" NOT NULL DEFAULT 'NONE',
    "medicine" "HowProficent" NOT NULL DEFAULT 'NONE',
    "nature" "HowProficent" NOT NULL DEFAULT 'NONE',
    "perception" "HowProficent" NOT NULL DEFAULT 'NONE',
    "performance" "HowProficent" NOT NULL DEFAULT 'NONE',
    "persuasion" "HowProficent" NOT NULL DEFAULT 'NONE',
    "religion" "HowProficent" NOT NULL DEFAULT 'NONE',
    "sleightOfHand" "HowProficent" NOT NULL DEFAULT 'NONE',
    "stealth" "HowProficent" NOT NULL DEFAULT 'NONE',
    "survival" "HowProficent" NOT NULL DEFAULT 'NONE',

    CONSTRAINT "Proficencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" SERIAL NOT NULL,
    "characterId" TEXT NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Armor" (
    "id" SERIAL NOT NULL,
    "inventoryId" INTEGER NOT NULL,
    "name" TEXT,
    "type" "ItemType" NOT NULL,

    CONSTRAINT "Armor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Weapon" (
    "id" SERIAL NOT NULL,
    "inventoryId" INTEGER NOT NULL,
    "name" TEXT,
    "type" "ItemType" NOT NULL,

    CONSTRAINT "Weapon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "inventoryId" INTEGER NOT NULL,
    "name" TEXT,
    "type" "ItemType" NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Spell" (
    "id" SERIAL NOT NULL,
    "className" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "school" TEXT NOT NULL,
    "castingTime" TEXT NOT NULL,
    "range" TEXT NOT NULL,
    "components" JSONB NOT NULL,
    "duration" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Spell_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Race_characterId_key" ON "Race"("characterId");

-- CreateIndex
CREATE UNIQUE INDEX "Race_name_key" ON "Race"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RacialTraits_raceName_key" ON "RacialTraits"("raceName");

-- CreateIndex
CREATE UNIQUE INDEX "RacialTraits_name_key" ON "RacialTraits"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Class_characterId_key" ON "Class"("characterId");

-- CreateIndex
CREATE UNIQUE INDEX "Class_name_key" ON "Class"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ClassFeatures_className_key" ON "ClassFeatures"("className");

-- CreateIndex
CREATE UNIQUE INDEX "Abilities_characterId_key" ON "Abilities"("characterId");

-- CreateIndex
CREATE UNIQUE INDEX "Description_characterId_key" ON "Description"("characterId");

-- CreateIndex
CREATE UNIQUE INDEX "Equipment_characterId_key" ON "Equipment"("characterId");

-- CreateIndex
CREATE UNIQUE INDEX "Proficencies_characterId_key" ON "Proficencies"("characterId");

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_characterId_key" ON "Inventory"("characterId");

-- CreateIndex
CREATE UNIQUE INDEX "Armor_inventoryId_key" ON "Armor"("inventoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Weapon_inventoryId_key" ON "Weapon"("inventoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Item_inventoryId_key" ON "Item"("inventoryId");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Race" ADD CONSTRAINT "Race_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RacialTraits" ADD CONSTRAINT "RacialTraits_raceName_fkey" FOREIGN KEY ("raceName") REFERENCES "Race"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassFeatures" ADD CONSTRAINT "ClassFeatures_className_fkey" FOREIGN KEY ("className") REFERENCES "Class"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Abilities" ADD CONSTRAINT "Abilities_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Description" ADD CONSTRAINT "Description_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proficencies" ADD CONSTRAINT "Proficencies_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Armor" ADD CONSTRAINT "Armor_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Weapon" ADD CONSTRAINT "Weapon_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Spell" ADD CONSTRAINT "Spell_className_fkey" FOREIGN KEY ("className") REFERENCES "Class"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
