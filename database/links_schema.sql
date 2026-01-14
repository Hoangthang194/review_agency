-- Create Short Links table for URL shortening service
USE review_agency;

CREATE TABLE IF NOT EXISTS `short_links` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `original_url` TEXT NOT NULL COMMENT 'Original URL to redirect to',
  `short_code` VARCHAR(10) UNIQUE NOT NULL COMMENT 'Short code for the link',
  `click_count` INT DEFAULT 0 NOT NULL COMMENT 'Number of times the link was clicked',
  `is_deleted` TINYINT(1) DEFAULT 0 NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_short_code` (`short_code`),
  INDEX `idx_is_deleted` (`is_deleted`),
  INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

