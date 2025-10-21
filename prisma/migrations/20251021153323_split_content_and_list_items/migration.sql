/*
  Warnings:

  - You are about to drop the column `created_by_id` on the `content` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `content` table. All the data in the column will be lost.
  - You are about to drop the column `requested_by_id` on the `content` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `content` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[external_source,external_id]` on the table `content` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `external_id` to the `content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `content` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('MOVIE', 'SERIES');

-- CreateEnum
CREATE TYPE "ExternalSource" AS ENUM ('TMDB');

-- DropForeignKey
ALTER TABLE "public"."content" DROP CONSTRAINT "content_created_by_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."content" DROP CONSTRAINT "content_requested_by_id_fkey";

-- AlterTable
ALTER TABLE "content" DROP COLUMN "created_by_id",
DROP COLUMN "order",
DROP COLUMN "requested_by_id",
DROP COLUMN "status",
ADD COLUMN     "external_id" TEXT NOT NULL,
ADD COLUMN     "external_source" "ExternalSource" NOT NULL DEFAULT 'TMDB',
ADD COLUMN     "genres" TEXT[],
ADD COLUMN     "runtime" INTEGER,
ADD COLUMN     "type" "ContentType" NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "series_details" (
    "id" TEXT NOT NULL,
    "content_id" TEXT NOT NULL,
    "season_count" INTEGER,
    "episode_count" INTEGER,
    "status" TEXT,
    "last_air_date" TIMESTAMP(3),

    CONSTRAINT "series_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "list_items" (
    "id" TEXT NOT NULL,
    "content_id" TEXT NOT NULL,
    "added_by_id" TEXT NOT NULL,
    "requested_by_id" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'WANT_TO_WATCH',
    "position" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION,
    "added_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "list_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "status_history" (
    "id" TEXT NOT NULL,
    "list_item_id" TEXT NOT NULL,
    "from_status" "Status",
    "to_status" "Status" NOT NULL,
    "changed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "status_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "series_details_content_id_key" ON "series_details"("content_id");

-- CreateIndex
CREATE UNIQUE INDEX "list_items_content_id_key" ON "list_items"("content_id");

-- CreateIndex
CREATE UNIQUE INDEX "list_items_position_key" ON "list_items"("position");

-- CreateIndex
CREATE INDEX "list_items_content_id_idx" ON "list_items"("content_id");

-- CreateIndex
CREATE INDEX "list_items_added_by_id_idx" ON "list_items"("added_by_id");

-- CreateIndex
CREATE INDEX "list_items_requested_by_id_idx" ON "list_items"("requested_by_id");

-- CreateIndex
CREATE INDEX "list_items_status_idx" ON "list_items"("status");

-- CreateIndex
CREATE INDEX "list_items_position_idx" ON "list_items"("position");

-- CreateIndex
CREATE INDEX "status_history_list_item_id_idx" ON "status_history"("list_item_id");

-- CreateIndex
CREATE INDEX "status_history_changed_at_idx" ON "status_history"("changed_at");

-- CreateIndex
CREATE INDEX "content_type_idx" ON "content"("type");

-- CreateIndex
CREATE INDEX "content_year_idx" ON "content"("year");

-- CreateIndex
CREATE UNIQUE INDEX "content_external_source_external_id_key" ON "content"("external_source", "external_id");

-- AddForeignKey
ALTER TABLE "series_details" ADD CONSTRAINT "series_details_content_id_fkey" FOREIGN KEY ("content_id") REFERENCES "content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "list_items" ADD CONSTRAINT "list_items_content_id_fkey" FOREIGN KEY ("content_id") REFERENCES "content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "list_items" ADD CONSTRAINT "list_items_added_by_id_fkey" FOREIGN KEY ("added_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "list_items" ADD CONSTRAINT "list_items_requested_by_id_fkey" FOREIGN KEY ("requested_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "status_history" ADD CONSTRAINT "status_history_list_item_id_fkey" FOREIGN KEY ("list_item_id") REFERENCES "list_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
