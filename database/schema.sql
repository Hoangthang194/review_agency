-- Create Database
CREATE DATABASE IF NOT EXISTS review_agency CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE review_agency;

-- Create Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    review_type ENUM('forex', 'crypto', 'prop') NOT NULL,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    rating DECIMAL(3,2) NOT NULL DEFAULT 0.00 COMMENT 'Rating from 1 to 5',
    reviews INT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Number of reviews',
    description TEXT NOT NULL,
    url_site VARCHAR(500) NULL,
    logo VARCHAR(500) NULL,
    logo_bg VARCHAR(100) NULL,
    tags JSON NULL COMMENT 'Array of tag strings',
    stats JSON NULL COMMENT 'Array of {icon, title, value} objects',
    terms JSON NULL COMMENT 'Array of {label, value} objects',
    key_info JSON NULL COMMENT 'Array of {label, value} objects',
    content LONGTEXT NULL COMMENT 'Detailed HTML content',
    pros JSON NULL COMMENT 'Array of pro strings',
    cons JSON NULL COMMENT 'Array of con strings',
    average_rating DECIMAL(3,2) NOT NULL DEFAULT 0.00,
    rating_breakdown JSON NULL COMMENT 'Array of {stars, pct} objects',
    advantages JSON NULL COMMENT 'Array of advantage strings',
    disadvantages JSON NULL COMMENT 'Array of disadvantage strings',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_review_type (review_type),
    INDEX idx_slug (slug),
    INDEX idx_rating (rating),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sample data is provided in insert_data.sql file
-- Run: mysql -u root -p review_agency < database/insert_data.sql
