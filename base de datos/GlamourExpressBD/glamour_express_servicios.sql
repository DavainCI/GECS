-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: glamour_express
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `servicios`
--

DROP TABLE IF EXISTS `servicios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicios` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text,
  `precio_minimo` decimal(8,2) NOT NULL,
  `precio_maximo` decimal(8,2) NOT NULL,
  `duracion_minutos` int DEFAULT '60',
  `categoria` varchar(50) NOT NULL,
  `activo` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicios`
--

LOCK TABLES `servicios` WRITE;
/*!40000 ALTER TABLE `servicios` DISABLE KEYS */;
INSERT INTO `servicios` VALUES (1,'Lavado y Secado/Cepillado Simple','Lavado, secado y cepillado básico del cabello',25.00,50.00,45,'Lavado y Secado',1,'2025-11-20 23:36:27','2025-11-20 23:36:27'),(2,'Corte de Cabello (Dama)','Corte y estilo para damas',50.00,120.00,60,'Corte',1,'2025-11-20 23:36:27','2025-11-20 23:36:27'),(3,'Corte de Cabello (Caballero)','Corte y estilo para caballeros',30.00,60.00,45,'Corte',1,'2025-11-20 23:36:27','2025-11-20 23:36:27'),(4,'Peinado/Cepillado Elaborado','Peinado elaborado con ondas o liso',60.00,100.00,75,'Peinado',1,'2025-11-20 23:36:27','2025-11-20 23:36:27'),(5,'Peinado de Fiesta/Recogido','Peinado especial para eventos y fiestas',120.00,250.00,90,'Peinado',1,'2025-11-20 23:36:27','2025-11-20 23:36:27'),(6,'Coloración de Raíz (Tinte)','Aplicación de tinte solo en raíces',80.00,150.00,90,'Coloración',1,'2025-11-20 23:36:27','2025-11-20 23:36:27'),(7,'Coloración Completa (Tinte)','Coloración completa del cabello',120.00,250.00,120,'Coloración',1,'2025-11-20 23:36:27','2025-11-20 23:36:27'),(8,'Baño de Color/Matiz','Tono sobre tono o baño de color',70.00,120.00,60,'Coloración',1,'2025-11-20 23:36:27','2025-11-20 23:36:27'),(9,'Mechas (Balayage, Iluminación, Babylights)','Técnicas de mechas profesionales',250.00,600.00,180,'Mechas',1,'2025-11-20 23:36:27','2025-11-20 23:36:27'),(10,'Tratamiento de Hidratación Profunda','Mascarilla hidratante profunda',40.00,80.00,45,'Tratamiento',1,'2025-11-20 23:36:27','2025-11-20 23:36:27'),(11,'Botox Capilar/Tratamiento de Brillo','Tratamiento reconstructivo y de brillo',100.00,200.00,90,'Tratamiento',1,'2025-11-20 23:36:27','2025-11-20 23:36:27'),(12,'Alisado con Keratina o Permanente','Tratamiento de alisado profesional',200.00,500.00,150,'Alisado',1,'2025-11-20 23:36:27','2025-11-20 23:36:27');
/*!40000 ALTER TABLE `servicios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-24 14:10:14
