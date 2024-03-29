/*
  Warnings:

  - Added the required column `et_data` to the `um_email_templates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "um_email_templates" ADD COLUMN     "et_data" TEXT NOT NULL;
