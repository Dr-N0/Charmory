-- CreateEnum
CREATE TYPE "Senses" AS ENUM ('BLINDSIGHT', 'DARKVISION', 'TREMORSENSE', 'TRUESIGHT');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('TINY', 'SMALL', 'MEDIUM', 'LARGE', 'HUGE');

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
    "ownerEmail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "level" INTEGER NOT NULL DEFAULT 1,
    "feats" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "speed" INTEGER NOT NULL DEFAULT 30,
    "armorClass" INTEGER NOT NULL DEFAULT 10,
    "initiative" INTEGER NOT NULL DEFAULT 0,
    "proficencies" JSONB,
    "inspiration" BOOLEAN NOT NULL DEFAULT false,
    "healthMax" INTEGER NOT NULL,
    "healthCurrent" INTEGER NOT NULL,
    "senses" "Senses"[] DEFAULT ARRAY[]::"Senses"[],
    "race" JSONB,
    "class" JSONB,
    "abilities" JSONB,
    "description" JSONB,
    "equipment" JSONB,
    "inventory" JSONB,
    "height" TEXT,
    "eyeColor" TEXT,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Race" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT,
    "description" TEXT,
    "keywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "variants" JSONB[] DEFAULT ARRAY[]::JSONB[],

    CONSTRAINT "Race_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RacialTraits" (
    "id" SERIAL NOT NULL,
    "raceId" INTEGER NOT NULL,
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
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "subClasses" TEXT[],

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassFeatures" (
    "id" SERIAL NOT NULL,
    "classId" INTEGER NOT NULL,
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
    "strength" INTEGER NOT NULL DEFAULT 10,
    "dexterity" INTEGER NOT NULL DEFAULT 10,
    "constitution" INTEGER NOT NULL DEFAULT 10,
    "intelligence" INTEGER NOT NULL DEFAULT 10,
    "wisdom" INTEGER NOT NULL DEFAULT 10,
    "charisma" INTEGER NOT NULL DEFAULT 10,

    CONSTRAINT "Abilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Background" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "skillProficiencies" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "toolProficiencies" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "extraLanguages" INTEGER NOT NULL DEFAULT 0,
    "extraEquipment" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "features" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "variants" JSONB[] DEFAULT ARRAY[]::JSONB[],

    CONSTRAINT "Background_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "group" TEXT,
    "cost" JSONB,
    "weight" JSONB,
    "qty" INTEGER,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Packs" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "contents" JSONB[],

    CONSTRAINT "Packs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proficencies" (
    "id" SERIAL NOT NULL,
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
CREATE UNIQUE INDEX "Race_name_key" ON "Race"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RacialTraits_raceId_key" ON "RacialTraits"("raceId");

-- CreateIndex
CREATE UNIQUE INDEX "RacialTraits_name_key" ON "RacialTraits"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Class_name_key" ON "Class"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ClassFeatures_classId_key" ON "ClassFeatures"("classId");

-- CreateIndex
CREATE UNIQUE INDEX "Background_name_key" ON "Background"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Armor_inventoryId_key" ON "Armor"("inventoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Weapon_inventoryId_key" ON "Weapon"("inventoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Item_inventoryId_key" ON "Item"("inventoryId");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_ownerEmail_fkey" FOREIGN KEY ("ownerEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RacialTraits" ADD CONSTRAINT "RacialTraits_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassFeatures" ADD CONSTRAINT "ClassFeatures_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Armor" ADD CONSTRAINT "Armor_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Weapon" ADD CONSTRAINT "Weapon_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Spell" ADD CONSTRAINT "Spell_className_fkey" FOREIGN KEY ("className") REFERENCES "Class"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
