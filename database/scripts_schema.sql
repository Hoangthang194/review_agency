-- Create Head Scripts table for managing scripts in <head> tag
USE review_agency;

CREATE TABLE IF NOT EXISTS `head_scripts` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL COMMENT 'Tên mô tả của script',
  `script_content` TEXT NOT NULL COMMENT 'Nội dung script (HTML)',
  `position` INT DEFAULT 0 COMMENT 'Thứ tự hiển thị (số nhỏ hơn sẽ hiển thị trước)',
  `is_active` TINYINT(1) DEFAULT 1 NOT NULL COMMENT 'Script có đang hoạt động không',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_is_active` (`is_active`),
  INDEX `idx_position` (`position`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

