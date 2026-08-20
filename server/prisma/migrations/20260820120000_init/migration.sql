-- CreateTable
CREATE TABLE `Admin` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `titleEn` VARCHAR(500) NOT NULL,
    `titleAm` VARCHAR(500) NOT NULL DEFAULT '',
    `excerptEn` TEXT NOT NULL,
    `excerptAm` TEXT NOT NULL,
    `body` JSON NOT NULL,
    `categoryEn` VARCHAR(191) NOT NULL,
    `categoryAm` VARCHAR(191) NOT NULL DEFAULT '',
    `image` VARCHAR(2048) NOT NULL,
    `imageAltEn` VARCHAR(500) NOT NULL DEFAULT '',
    `imageAltAm` VARCHAR(500) NOT NULL DEFAULT '',
    `readTimeEn` VARCHAR(64) NOT NULL DEFAULT '5 min read',
    `readTimeAm` VARCHAR(64) NOT NULL DEFAULT '',
    `published` BOOLEAN NOT NULL DEFAULT false,
    `publishedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Post_slug_key`(`slug`),
    INDEX `Post_published_publishedAt_idx`(`published`, `publishedAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
