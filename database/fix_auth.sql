-- Fix MariaDB Authentication Plugin Issue
-- Run this script on your MariaDB server to change authentication method

-- For the user you're using to connect:
-- Replace 'root' with your actual username
-- Replace 'your_password' with your actual password

-- Option 1: Use mysql_native_password (widely supported, works with mysql2)
ALTER USER 'root'@'localhost' IDENTIFIED VIA mysql_native_password USING PASSWORD('your_password');
ALTER USER 'root'@'%' IDENTIFIED VIA mysql_native_password USING PASSWORD('your_password');

-- Option 2: For MariaDB 10.4+, you can also use:
-- ALTER USER 'root'@'localhost' IDENTIFIED BY 'your_password';
-- ALTER USER 'root'@'%' IDENTIFIED BY 'your_password';

-- Flush privileges to apply changes
FLUSH PRIVILEGES;

-- Note: If the above doesn't work, try:
-- SET PASSWORD FOR 'root'@'localhost' = PASSWORD('your_password');
-- SET PASSWORD FOR 'root'@'%' = PASSWORD('your_password');

