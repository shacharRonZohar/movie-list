-- AlterTable
ALTER TABLE "content" ALTER COLUMN "order" DROP DEFAULT;
DROP SEQUENCE "content_order_seq";
