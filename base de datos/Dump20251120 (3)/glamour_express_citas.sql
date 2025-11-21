CREATE DATABASE  IF NOT EXISTS `glamour_express` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `glamour_express`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: glamour_express
-- ------------------------------------------------------
-- Server version	9.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `citas`
--

DROP TABLE IF EXISTS `citas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `citas` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `servicio_id` bigint unsigned NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `estado` enum('pendiente','confirmada','completada','cancelada') DEFAULT 'pendiente',
  `notas` text,
  `precio_final` decimal(8,2) DEFAULT NULL,
  `duracion_real` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `servicio_id` (`servicio_id`),
  KEY `fecha_hora` (`fecha`,`hora`),
  CONSTRAINT `citas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `citas_ibfk_2` FOREIGN KEY (`servicio_id`) REFERENCES `servicios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `citas`
--

LOCK TABLES `citas` WRITE;
/*!40000 ALTER TABLE `citas` DISABLE KEYS */;
INSERT INTO `citas` VALUES (1,3,2,'2025-11-23','10:00:00','pendiente','Corte con capas, llevar foto de referencia',80.00,NULL,'2025-11-20 23:51:17','2025-11-20 23:51:17'),(2,3,7,'2025-11-27','14:00:00','confirmada','Coloración completa - tono café oscuro',180.00,NULL,'2025-11-20 23:51:17','2025-11-20 23:51:17'),(3,3,9,'2025-12-04','11:00:00','pendiente','Balayage - primera vez',450.00,NULL,'2025-11-20 23:51:17','2025-11-20 23:51:17'),(4,3,10,'2025-11-21','16:00:00','completada','Tratamiento hidratante post-coloración',50.00,NULL,'2025-11-20 23:51:17','2025-11-20 23:51:17'),(5,1,3,'2025-11-21','09:00:00','pendiente','ola',NULL,NULL,'2025-11-21 01:49:40','2025-11-21 01:49:40'),(6,3,12,'2025-11-22','16:00:00','pendiente','coltecito',NULL,NULL,'2025-11-21 02:00:08','2025-11-21 02:00:08'),(7,3,6,'2025-11-30','11:00:00','pendiente','color rojo',NULL,NULL,'2025-11-21 02:03:00','2025-11-21 02:03:00'),(8,1,4,'2025-10-15','10:00:00','pendiente','Corte y peinado para evento especial',60.00,NULL,'2025-11-21 03:16:50','2025-11-21 03:16:50'),(9,2,5,'2025-10-18','14:00:00','confirmada','Coloración rubia ceniza',120.00,NULL,'2025-11-21 03:16:50','2025-11-21 03:16:50'),(10,3,6,'2025-10-22','11:00:00','pendiente','Tratamiento de keratina',80.00,NULL,'2025-11-21 03:16:50','2025-11-21 03:16:50'),(11,1,8,'2025-10-25','16:00:00','completada','Manicure y pedicure spa',45.00,NULL,'2025-11-21 03:16:50','2025-11-21 03:16:50'),(12,2,2,'2025-11-05','09:00:00','pendiente','Corte masculino clásico',25.00,NULL,'2025-11-21 03:16:50','2025-11-21 03:16:50'),(13,1,7,'2025-11-12','13:00:00','confirmada','Mechas californianas',150.00,NULL,'2025-11-21 03:16:50','2025-11-21 03:16:50'),(14,3,3,'2025-11-19','15:00:00','pendiente','Corte de dama con layers',55.00,NULL,'2025-11-21 03:16:50','2025-11-21 03:16:50'),(15,2,10,'2025-11-26','17:00:00','confirmada','Hidratación profunda',35.00,NULL,'2025-11-21 03:16:50','2025-11-21 03:16:50'),(16,3,1,'2025-12-03','10:00:00','pendiente','Corte navideño especial',40.00,NULL,'2025-11-21 03:16:50','2025-11-21 03:16:50'),(17,1,9,'2025-12-10','14:00:00','confirmada','Balayage + corte',200.00,NULL,'2025-11-21 03:16:50','2025-11-21 03:16:50'),(18,2,11,'2025-12-17','11:00:00','pendiente','Maquillaje para fiesta',65.00,NULL,'2025-11-21 03:16:50','2025-11-21 03:16:50'),(19,3,12,'2025-12-23','16:00:00','confirmada','Peinado para Nochebuena',75.00,NULL,'2025-11-21 03:16:50','2025-11-21 03:16:50'),(20,1,4,'2025-10-15','10:00:00','pendiente','Peinado con ondas suaves para boda',80.00,NULL,'2025-11-21 03:18:53','2025-11-21 03:18:53'),(21,2,6,'2025-10-18','14:00:00','confirmada','Coloración de raíz - tono rubio oscuro',120.00,NULL,'2025-11-21 03:18:53','2025-11-21 03:18:53'),(22,3,10,'2025-10-22','11:00:00','pendiente','Hidratación profunda post-verano',60.00,NULL,'2025-11-21 03:18:53','2025-11-21 03:18:53'),(23,1,3,'2025-10-25','16:00:00','completada','Corte caballero estilo moderno',45.00,NULL,'2025-11-21 03:18:53','2025-11-21 03:18:53'),(24,2,2,'2025-11-05','09:00:00','pendiente','Corte dama con capas y flequillo',85.00,NULL,'2025-11-21 03:18:53','2025-11-21 03:18:53'),(25,1,7,'2025-11-12','13:00:00','confirmada','Coloración completa - café con reflejos',180.00,NULL,'2025-11-21 03:18:53','2025-11-21 03:18:53'),(26,3,1,'2025-11-19','15:00:00','pendiente','Lavado y secado para evento',35.00,NULL,'2025-11-21 03:18:53','2025-11-21 03:18:53'),(27,2,8,'2025-11-26','17:00:00','confirmada','Baño de color para refrescar tono',90.00,NULL,'2025-11-21 03:18:53','2025-11-21 03:18:53'),(28,3,9,'2025-12-03','10:00:00','pendiente','Balayage para fiestas navideñas',450.00,NULL,'2025-11-21 03:18:53','2025-11-21 03:18:53'),(29,1,5,'2025-12-10','14:00:00','confirmada','Peinado de fiesta para cena de gala',180.00,NULL,'2025-11-21 03:18:53','2025-11-21 03:18:53'),(30,2,11,'2025-12-17','11:00:00','pendiente','Tratamiento de brillo pre-navidad',150.00,NULL,'2025-11-21 03:18:53','2025-11-21 03:18:53'),(31,3,12,'2025-12-23','16:00:00','confirmada','Alisado con keratina para año nuevo',250.00,NULL,'2025-11-21 03:18:53','2025-11-21 03:18:53'),(32,3,3,'2025-11-22','14:00:00','pendiente','corte de mono',NULL,NULL,'2025-11-21 04:13:35','2025-11-21 04:13:35'),(33,3,2,'2025-11-30','10:00:00','pendiente','AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',NULL,NULL,'2025-11-21 04:16:08','2025-11-21 04:16:08'),(34,3,9,'2025-11-30','13:00:00','pendiente','wasaaaa',NULL,NULL,'2025-11-21 04:34:26','2025-11-21 04:34:26');
/*!40000 ALTER TABLE `citas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-20 23:51:55
