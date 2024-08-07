-- MySQL dump 10.13  Distrib 9.0.1, for macos14.4 (arm64)
--
-- Host: localhost    Database: inventory_db
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` char(36) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `birth_date` date NOT NULL,
  `gender` enum('Male','Female','Other') NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES ('42a5b9c5-ad83-4d8d-b9a8-fa194b6861eb','Daffa Kurnia','Fatah','daffakurniaf11@gmail.com','1999-10-11','Male','$2a$10$Xgigx4QaO25s/lRvH7fzfOoa3VM26G4WN1GsVomlJiMpHEa7tBPBG','2024-08-06 19:13:50','2024-08-07 03:30:11');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_categories`
--

DROP TABLE IF EXISTS `product_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_categories` (
  `id` char(50) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `category_description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_categories`
--

LOCK TABLES `product_categories` WRITE;
/*!40000 ALTER TABLE `product_categories` DISABLE KEYS */;
INSERT INTO `product_categories` VALUES ('c02f58f7-712c-45c1-9217-873046cf9297','Milk','This is the Milk from Indonesia','2024-08-06 10:41:08','2024-08-07 04:37:30'),('d918aff7-3815-4088-a980-b62ce2033730','Coffee','This is the Coffee from Indonesia','2024-08-06 10:41:02','2024-08-06 10:41:02'),('dfe1f379-21c0-42be-81cb-ece5eb1873e5','Tea','This is the Tea from Indonesia','2024-08-06 10:40:55','2024-08-06 10:40:55');
/*!40000 ALTER TABLE `product_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` char(50) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_description` text,
  `product_image` varchar(255) DEFAULT NULL,
  `category_id` char(50) NOT NULL,
  `stock` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `product_categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES ('021916b6-4d77-4105-b093-4935f831b502','Cimory','This is the milk from Indonesia','/asdasdasd.png','c02f58f7-712c-45c1-9217-873046cf9297',2750,'2024-08-06 10:56:06','2024-08-07 06:31:48'),('97eb46fc-e82d-4b9b-a109-722fc714dc4d','Susu Dancow','This is the milk from Indonesia','/asdasdasd.png','c02f58f7-712c-45c1-9217-873046cf9297',1000,'2024-08-06 10:55:57','2024-08-07 06:13:10'),('d8e0d99a-3629-48b0-a7c6-ebea8d88e133','Ultramilk','This is a milk originally from Indonesia','/image.png','c02f58f7-712c-45c1-9217-873046cf9297',0,'2024-08-07 06:13:28','2024-08-07 06:58:58'),('e2d9d099-a3d1-4289-8a16-2722f0f5a084','Arabika','This is the Coffee from Indonesia','/asdasdasd.png','d918aff7-3815-4088-a980-b62ce2033730',438,'2024-08-06 10:54:58','2024-08-07 06:58:30'),('e63e12f0-2378-4dda-8011-b8d0ee45a407','Robusta','This is the Coffee from Indonesia','/asdasdasd.png','d918aff7-3815-4088-a980-b62ce2033730',531,'2024-08-06 10:55:19','2024-08-07 06:58:30');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `id` char(50) NOT NULL,
  `user_id` char(50) NOT NULL,
  `product_id` char(50) NOT NULL,
  `quantity` int DEFAULT '0',
  `state` enum('Out','In') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES ('1e417cd1-9a4e-46cd-9125-cb1b0e496e04','e1409c48-80f6-4f65-9cb7-0907eec86a9c','e63e12f0-2378-4dda-8011-b8d0ee45a407',30,'In','2024-08-07 06:22:23','2024-08-07 06:22:23'),('2a685b28-9d7c-4bd8-acb0-a391c89b6f50','e1409c48-80f6-4f65-9cb7-0907eec86a9c','d8e0d99a-3629-48b0-a7c6-ebea8d88e133',250,'In','2024-08-07 06:24:06','2024-08-07 06:24:06'),('3c55a590-c700-41f1-ac11-55641312a2ba','42a5b9c5-ad83-4d8d-b9a8-fa194b6861eb','d8e0d99a-3629-48b0-a7c6-ebea8d88e133',350,'Out','2024-08-07 06:58:58','2024-08-07 06:58:58'),('3f1001ec-231c-46e9-9b2b-e24d404c5970','e1409c48-80f6-4f65-9cb7-0907eec86a9c','e2d9d099-a3d1-4289-8a16-2722f0f5a084',45,'In','2024-08-07 06:22:23','2024-08-07 06:22:23'),('4c2014a9-4c64-463d-80d2-291ba90a8f08','e1409c48-80f6-4f65-9cb7-0907eec86a9c','021916b6-4d77-4105-b093-4935f831b502',250,'In','2024-08-07 06:26:01','2024-08-07 06:26:01'),('57c02ae1-903c-48aa-a2ed-0b7ec0195527','e1409c48-80f6-4f65-9cb7-0907eec86a9c','021916b6-4d77-4105-b093-4935f831b502',250,'In','2024-08-07 06:25:26','2024-08-07 06:25:26'),('5947e14a-6f01-4513-a48a-cb2b68d52978','42a5b9c5-ad83-4d8d-b9a8-fa194b6861eb','e63e12f0-2378-4dda-8011-b8d0ee45a407',321,'In','2024-08-07 06:58:30','2024-08-07 06:58:30'),('6a3a9b83-83ba-481f-b54f-b3880faeb82d','42a5b9c5-ad83-4d8d-b9a8-fa194b6861eb','021916b6-4d77-4105-b093-4935f831b502',250,'In','2024-08-07 06:28:01','2024-08-07 06:28:01'),('793d0e92-507e-4be2-8eaa-1950f7a93184','e1409c48-80f6-4f65-9cb7-0907eec86a9c','e63e12f0-2378-4dda-8011-b8d0ee45a407',30,'In','2024-08-06 16:06:25','2024-08-06 16:06:25'),('9ed56738-ed10-4256-acf0-396a1ec44330','42a5b9c5-ad83-4d8d-b9a8-fa194b6861eb','e2d9d099-a3d1-4289-8a16-2722f0f5a084',123,'In','2024-08-07 06:58:30','2024-08-07 06:58:30'),('a2923ab9-f1ea-45c3-95e4-6944a47cdda8','e1409c48-80f6-4f65-9cb7-0907eec86a9c','021916b6-4d77-4105-b093-4935f831b502',250,'In','2024-08-07 06:24:25','2024-08-07 06:24:25'),('d12f41d5-c1f4-4824-9f46-26c86390dafd','42a5b9c5-ad83-4d8d-b9a8-fa194b6861eb','021916b6-4d77-4105-b093-4935f831b502',250,'In','2024-08-07 06:28:18','2024-08-07 06:28:18'),('d2455300-d559-448e-a4f2-61f5e222c1b4','e1409c48-80f6-4f65-9cb7-0907eec86a9c','021916b6-4d77-4105-b093-4935f831b502',250,'In','2024-08-07 06:26:13','2024-08-07 06:26:13'),('e735864a-e355-4c07-a849-686844e01049','e1409c48-80f6-4f65-9cb7-0907eec86a9c','e2d9d099-a3d1-4289-8a16-2722f0f5a084',45,'In','2024-08-06 16:06:25','2024-08-06 16:06:25'),('f8699a34-067c-450f-8a40-06bea7820dac','42a5b9c5-ad83-4d8d-b9a8-fa194b6861eb','021916b6-4d77-4105-b093-4935f831b502',250,'In','2024-08-07 06:31:48','2024-08-07 06:31:48');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-07 14:02:38
