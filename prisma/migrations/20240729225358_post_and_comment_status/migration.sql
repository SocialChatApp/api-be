-- CreateEnum
CREATE TYPE "StatusType" AS ENUM ('Draft', 'Publish', 'Archived', 'Delete', 'Rejected');

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "status" "StatusType" NOT NULL DEFAULT 'Draft';

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "status" "StatusType" NOT NULL DEFAULT 'Draft';
