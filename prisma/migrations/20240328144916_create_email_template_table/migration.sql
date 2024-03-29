-- AlterTable
ALTER TABLE "um_roles" ALTER COLUMN "role_updated_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "um_users" ALTER COLUMN "user_updated_at" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "um_email_templates" (
    "et_id" SERIAL NOT NULL,
    "et_name" TEXT NOT NULL,
    "et_slug" TEXT NOT NULL,
    "et_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "et_updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "et_deleted_at" TIMESTAMP(3),

    CONSTRAINT "um_email_templates_pkey" PRIMARY KEY ("et_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "um_email_templates_et_id_key" ON "um_email_templates"("et_id");

-- CreateIndex
CREATE UNIQUE INDEX "um_email_templates_et_slug_key" ON "um_email_templates"("et_slug");
