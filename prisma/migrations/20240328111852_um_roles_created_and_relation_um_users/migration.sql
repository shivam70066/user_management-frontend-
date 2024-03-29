-- AlterTable
ALTER TABLE "um_users" ADD COLUMN     "user_role_id" INTEGER,
ALTER COLUMN "user_updated_at" DROP DEFAULT;

-- CreateTable
CREATE TABLE "um_roles" (
    "role_id" SERIAL NOT NULL,
    "role_name" TEXT NOT NULL,
    "role_slug" TEXT NOT NULL,
    "role_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role_updated_at" TIMESTAMP(3) NOT NULL,
    "role_deleted_at" TIMESTAMP(3),

    CONSTRAINT "um_roles_pkey" PRIMARY KEY ("role_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "um_roles_role_id_key" ON "um_roles"("role_id");

-- CreateIndex
CREATE INDEX "um_roles_role_id_idx" ON "um_roles"("role_id");

-- AddForeignKey
ALTER TABLE "um_users" ADD CONSTRAINT "um_users_user_role_id_fkey" FOREIGN KEY ("user_role_id") REFERENCES "um_roles"("role_id") ON DELETE SET NULL ON UPDATE CASCADE;
