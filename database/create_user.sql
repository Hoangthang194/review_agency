-- Create new user for the application (Recommended approach)
-- This creates a new user with mysql_native_password (compatible with mysql2)
-- Run this script on your MariaDB server

-- Create new user (replace 'app_user' and 'app_password' with your desired username/password)
CREATE USER IF NOT EXISTS 'app_user'@'localhost' IDENTIFIED BY 'app_password';
CREATE USER IF NOT EXISTS 'app_user'@'%' IDENTIFIED BY 'app_password';

-- Grant privileges on review_agency database
GRANT ALL PRIVILEGES ON review_agency.* TO 'app_user'@'localhost';
GRANT ALL PRIVILEGES ON review_agency.* TO 'app_user'@'%';

-- Flush privileges to apply changes
FLUSH PRIVILEGES;

-- Verify the user was created
SELECT user, host, plugin FROM mysql.user WHERE user = 'app_user';

