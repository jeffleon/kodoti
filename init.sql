CREATE DATABASE IF NOT EXISTS kodoti_wallet;
USE kodoti_wallet;
CREATE TABLE IF NOT EXISTS wallet_subscription(
    id INT AUTO_INCREMENT,
    user_id INT,
    code VARCHAR(30),
    amount INT,cron VARCHAR(50), 
    updated_at DATE, 
    created_at DATE,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS wallet_movement(
    id INT AUTO_INCREMENT,
    user_id INT,
    type INT,
    amount INT, 
    updated_at DATE, 
    created_at DATE,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS wallet_balance(
    id INT AUTO_INCREMENT,
    user_id INT,
    amount INT, updated_at DATE, 
    created_at DATE,PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS `auth_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;