/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: articulo
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `articulo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(80) NOT NULL,
  `cantidad` int(4) NOT NULL,
  `precio` decimal(10, 2) NOT NULL,
  `categoria` varchar(30) NOT NULL,
  `estado_activo` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: cargo
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `cargo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: categoria
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `categoria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: cliente
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `cliente` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(64) NOT NULL,
  `cedula` varchar(15) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `estado_activo` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: compras
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `compras` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fechaCreacion` datetime NOT NULL DEFAULT current_timestamp(),
  `total` decimal(8, 2) NOT NULL,
  `idusuarioId` int(11) DEFAULT NULL,
  `idproveedorId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_108d9c8a3ba60b575b826e36144` (`idusuarioId`),
  KEY `FK_5f92d9ec921bd1a910d5ffdb13a` (`idproveedorId`),
  CONSTRAINT `FK_108d9c8a3ba60b575b826e36144` FOREIGN KEY (`idusuarioId`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_5f92d9ec921bd1a910d5ffdb13a` FOREIGN KEY (`idproveedorId`) REFERENCES `proveedor` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 19 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: proveedor
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `proveedor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(80) NOT NULL,
  `rif` varchar(16) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `direccion` varchar(120) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `estado_activo` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: union_compra_articulos
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `union_compra_articulos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cantidad` int(4) NOT NULL,
  `articuloId` int(11) DEFAULT NULL,
  `compraId` int(11) DEFAULT NULL,
  `preciounitario` decimal(8, 2) NOT NULL,
  `nombreregistrado` varchar(80) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_4bd8c3a04e5c7299b8e265f9a4b` (`articuloId`),
  KEY `FK_5309084d13ccecb8279f06c770a` (`compraId`),
  CONSTRAINT `FK_4bd8c3a04e5c7299b8e265f9a4b` FOREIGN KEY (`articuloId`) REFERENCES `articulo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_5309084d13ccecb8279f06c770a` FOREIGN KEY (`compraId`) REFERENCES `compras` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 27 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: union_venta_articulos
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `union_venta_articulos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cantidad` int(4) NOT NULL,
  `articuloId` int(11) DEFAULT NULL,
  `ventaId` int(11) DEFAULT NULL,
  `preciounitario` decimal(8, 2) NOT NULL,
  `nombreregistrado` varchar(80) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_f11f1c498f470236d3adc6b4ccc` (`articuloId`),
  KEY `FK_d34b5a1b4c13dd003edb7243eb9` (`ventaId`),
  CONSTRAINT `FK_d34b5a1b4c13dd003edb7243eb9` FOREIGN KEY (`ventaId`) REFERENCES `ventas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_f11f1c498f470236d3adc6b4ccc` FOREIGN KEY (`articuloId`) REFERENCES `articulo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 21 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: usuario
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cedula` varchar(13) NOT NULL,
  `nombre` varchar(64) NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `correo` varchar(45) NOT NULL,
  `username` varchar(25) NOT NULL,
  `password` varchar(255) NOT NULL,
  `estado_activo` tinyint(4) NOT NULL DEFAULT 1,
  `cargoId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_7db14c51775d26f3fdbd0a88cde` (`cargoId`),
  CONSTRAINT `FK_7db14c51775d26f3fdbd0a88cde` FOREIGN KEY (`cargoId`) REFERENCES `cargo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: ventas
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `ventas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fechaCreacion` datetime NOT NULL DEFAULT current_timestamp(),
  `total` decimal(10, 2) NOT NULL,
  `idusuarioId` int(11) DEFAULT NULL,
  `idclienteId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_0d73bb275ffaae557956bfd8d39` (`idusuarioId`),
  KEY `FK_cfec38fd11a4cfeafa938747165` (`idclienteId`),
  CONSTRAINT `FK_0d73bb275ffaae557956bfd8d39` FOREIGN KEY (`idusuarioId`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_cfec38fd11a4cfeafa938747165` FOREIGN KEY (`idclienteId`) REFERENCES `cliente` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 12 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: articulo
# ------------------------------------------------------------

INSERT INTO
  `articulo` (
    `id`,
    `nombre`,
    `cantidad`,
    `precio`,
    `categoria`,
    `estado_activo`
  )
VALUES
  (1, 'Tina pequeña', 1159, 10.00, 'Tina', 1);
INSERT INTO
  `articulo` (
    `id`,
    `nombre`,
    `cantidad`,
    `precio`,
    `categoria`,
    `estado_activo`
  )
VALUES
  (2, 'Tina mediana', 177, 15.00, 'Tina', 1);
INSERT INTO
  `articulo` (
    `id`,
    `nombre`,
    `cantidad`,
    `precio`,
    `categoria`,
    `estado_activo`
  )
VALUES
  (3, 'Tina grande 16oz', 110, 60.00, 'Tina', 1);
INSERT INTO
  `articulo` (
    `id`,
    `nombre`,
    `cantidad`,
    `precio`,
    `categoria`,
    `estado_activo`
  )
VALUES
  (4, 'Tina gigante', 499, 19.00, 'Tina', 1);
INSERT INTO
  `articulo` (
    `id`,
    `nombre`,
    `cantidad`,
    `precio`,
    `categoria`,
    `estado_activo`
  )
VALUES
  (5, 'Tina mini', 2094, 0.00, 'Tinas', 1);
INSERT INTO
  `articulo` (
    `id`,
    `nombre`,
    `cantidad`,
    `precio`,
    `categoria`,
    `estado_activo`
  )
VALUES
  (6, 'paleta', 20, 10.00, 'xd', 1);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: cargo
# ------------------------------------------------------------

INSERT INTO
  `cargo` (`id`, `nombre`)
VALUES
  (1, 'Empleado');
INSERT INTO
  `cargo` (`id`, `nombre`)
VALUES
  (2, 'Administrador');
INSERT INTO
  `cargo` (`id`, `nombre`)
VALUES
  (3, 'Gerente');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: categoria
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: cliente
# ------------------------------------------------------------

INSERT INTO
  `cliente` (
    `id`,
    `nombre`,
    `cedula`,
    `telefono`,
    `direccion`,
    `estado_activo`
  )
VALUES
  (1, 'José', '12345678', '042412453', 'Calle 90A', 1);
INSERT INTO
  `cliente` (
    `id`,
    `nombre`,
    `cedula`,
    `telefono`,
    `direccion`,
    `estado_activo`
  )
VALUES
  (
    2,
    'Rubén',
    '12345678',
    '0412754823',
    'Avenida 11C',
    1
  );
INSERT INTO
  `cliente` (
    `id`,
    `nombre`,
    `cedula`,
    `telefono`,
    `direccion`,
    `estado_activo`
  )
VALUES
  (
    3,
    'Julio',
    '31313464',
    '0412464654',
    'Acesdvsdfasdasfsdfds',
    1
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: compras
# ------------------------------------------------------------

INSERT INTO
  `compras` (
    `id`,
    `fechaCreacion`,
    `total`,
    `idusuarioId`,
    `idproveedorId`
  )
VALUES
  (2, '2023-04-17 01:19:12', 2220.00, 2, 2);
INSERT INTO
  `compras` (
    `id`,
    `fechaCreacion`,
    `total`,
    `idusuarioId`,
    `idproveedorId`
  )
VALUES
  (3, '2023-04-17 01:21:11', 2220.00, 2, 2);
INSERT INTO
  `compras` (
    `id`,
    `fechaCreacion`,
    `total`,
    `idusuarioId`,
    `idproveedorId`
  )
VALUES
  (4, '2023-04-17 01:22:41', 2220.00, 2, 2);
INSERT INTO
  `compras` (
    `id`,
    `fechaCreacion`,
    `total`,
    `idusuarioId`,
    `idproveedorId`
  )
VALUES
  (5, '2023-04-17 01:26:48', 2220.00, 2, 2);
INSERT INTO
  `compras` (
    `id`,
    `fechaCreacion`,
    `total`,
    `idusuarioId`,
    `idproveedorId`
  )
VALUES
  (6, '2023-04-17 01:46:48', 2220.00, 2, 2);
INSERT INTO
  `compras` (
    `id`,
    `fechaCreacion`,
    `total`,
    `idusuarioId`,
    `idproveedorId`
  )
VALUES
  (7, '2023-04-17 01:48:08', 2220.00, 2, 2);
INSERT INTO
  `compras` (
    `id`,
    `fechaCreacion`,
    `total`,
    `idusuarioId`,
    `idproveedorId`
  )
VALUES
  (8, '2023-04-17 01:51:12', 2220.00, 2, 2);
INSERT INTO
  `compras` (
    `id`,
    `fechaCreacion`,
    `total`,
    `idusuarioId`,
    `idproveedorId`
  )
VALUES
  (9, '2023-04-17 01:59:15', 2220.00, NULL, NULL);
INSERT INTO
  `compras` (
    `id`,
    `fechaCreacion`,
    `total`,
    `idusuarioId`,
    `idproveedorId`
  )
VALUES
  (10, '2023-04-17 02:01:45', 2220.00, 2, 2);
INSERT INTO
  `compras` (
    `id`,
    `fechaCreacion`,
    `total`,
    `idusuarioId`,
    `idproveedorId`
  )
VALUES
  (11, '2023-04-17 02:06:58', 2220.00, 2, 2);
INSERT INTO
  `compras` (
    `id`,
    `fechaCreacion`,
    `total`,
    `idusuarioId`,
    `idproveedorId`
  )
VALUES
  (12, '2023-04-17 02:15:16', 2220.00, 2, 2);
INSERT INTO
  `compras` (
    `id`,
    `fechaCreacion`,
    `total`,
    `idusuarioId`,
    `idproveedorId`
  )
VALUES
  (13, '2023-04-17 02:47:35', 2220.00, 2, 2);
INSERT INTO
  `compras` (
    `id`,
    `fechaCreacion`,
    `total`,
    `idusuarioId`,
    `idproveedorId`
  )
VALUES
  (14, '2023-04-17 02:48:03', 2220.00, 2, 2);
INSERT INTO
  `compras` (
    `id`,
    `fechaCreacion`,
    `total`,
    `idusuarioId`,
    `idproveedorId`
  )
VALUES
  (15, '2023-04-17 02:48:42', 2220.00, 2, 2);
INSERT INTO
  `compras` (
    `id`,
    `fechaCreacion`,
    `total`,
    `idusuarioId`,
    `idproveedorId`
  )
VALUES
  (16, '2023-04-17 02:53:14', 2220.00, 2, 2);
INSERT INTO
  `compras` (
    `id`,
    `fechaCreacion`,
    `total`,
    `idusuarioId`,
    `idproveedorId`
  )
VALUES
  (17, '2023-04-17 02:54:07', 2710.00, 2, 2);
INSERT INTO
  `compras` (
    `id`,
    `fechaCreacion`,
    `total`,
    `idusuarioId`,
    `idproveedorId`
  )
VALUES
  (18, '2023-04-17 03:46:08', 2560.00, 2, 2);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: proveedor
# ------------------------------------------------------------

INSERT INTO
  `proveedor` (
    `id`,
    `nombre`,
    `rif`,
    `telefono`,
    `direccion`,
    `correo`,
    `estado_activo`
  )
VALUES
  (
    1,
    'Polar',
    'J-12312343',
    '23423412',
    'algún lugar de caracas',
    'NO',
    1
  );
INSERT INTO
  `proveedor` (
    `id`,
    `nombre`,
    `rif`,
    `telefono`,
    `direccion`,
    `correo`,
    `estado_activo`
  )
VALUES
  (
    2,
    'Polar2',
    'J-12312343',
    '23423412',
    'algún lugar de caracas',
    '',
    1
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: union_compra_articulos
# ------------------------------------------------------------

INSERT INTO
  `union_compra_articulos` (
    `id`,
    `cantidad`,
    `articuloId`,
    `compraId`,
    `preciounitario`,
    `nombreregistrado`
  )
VALUES
  (13, 11, 1, NULL, 0.00, '');
INSERT INTO
  `union_compra_articulos` (
    `id`,
    `cantidad`,
    `articuloId`,
    `compraId`,
    `preciounitario`,
    `nombreregistrado`
  )
VALUES
  (14, 100, 5, 13, 0.00, '');
INSERT INTO
  `union_compra_articulos` (
    `id`,
    `cantidad`,
    `articuloId`,
    `compraId`,
    `preciounitario`,
    `nombreregistrado`
  )
VALUES
  (15, 11, 1, NULL, 0.00, '');
INSERT INTO
  `union_compra_articulos` (
    `id`,
    `cantidad`,
    `articuloId`,
    `compraId`,
    `preciounitario`,
    `nombreregistrado`
  )
VALUES
  (16, 100, 5, 14, 0.00, '');
INSERT INTO
  `union_compra_articulos` (
    `id`,
    `cantidad`,
    `articuloId`,
    `compraId`,
    `preciounitario`,
    `nombreregistrado`
  )
VALUES
  (17, 11, 3, NULL, 0.00, '');
INSERT INTO
  `union_compra_articulos` (
    `id`,
    `cantidad`,
    `articuloId`,
    `compraId`,
    `preciounitario`,
    `nombreregistrado`
  )
VALUES
  (18, 100, 4, 15, 0.00, '');
INSERT INTO
  `union_compra_articulos` (
    `id`,
    `cantidad`,
    `articuloId`,
    `compraId`,
    `preciounitario`,
    `nombreregistrado`
  )
VALUES
  (19, 11, 3, 16, 0.00, '');
INSERT INTO
  `union_compra_articulos` (
    `id`,
    `cantidad`,
    `articuloId`,
    `compraId`,
    `preciounitario`,
    `nombreregistrado`
  )
VALUES
  (20, 100, 4, 16, 0.00, '');
INSERT INTO
  `union_compra_articulos` (
    `id`,
    `cantidad`,
    `articuloId`,
    `compraId`,
    `preciounitario`,
    `nombreregistrado`
  )
VALUES
  (21, 11, 3, 17, 0.00, '');
INSERT INTO
  `union_compra_articulos` (
    `id`,
    `cantidad`,
    `articuloId`,
    `compraId`,
    `preciounitario`,
    `nombreregistrado`
  )
VALUES
  (22, 100, 4, 17, 0.00, '');
INSERT INTO
  `union_compra_articulos` (
    `id`,
    `cantidad`,
    `articuloId`,
    `compraId`,
    `preciounitario`,
    `nombreregistrado`
  )
VALUES
  (23, 49, 5, 17, 0.00, '');
INSERT INTO
  `union_compra_articulos` (
    `id`,
    `cantidad`,
    `articuloId`,
    `compraId`,
    `preciounitario`,
    `nombreregistrado`
  )
VALUES
  (24, 11, 3, 18, 0.00, '');
INSERT INTO
  `union_compra_articulos` (
    `id`,
    `cantidad`,
    `articuloId`,
    `compraId`,
    `preciounitario`,
    `nombreregistrado`
  )
VALUES
  (25, 100, 4, 18, 0.00, '');
INSERT INTO
  `union_compra_articulos` (
    `id`,
    `cantidad`,
    `articuloId`,
    `compraId`,
    `preciounitario`,
    `nombreregistrado`
  )
VALUES
  (26, 49, 5, 18, 0.00, '');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: union_venta_articulos
# ------------------------------------------------------------

INSERT INTO
  `union_venta_articulos` (
    `id`,
    `cantidad`,
    `articuloId`,
    `ventaId`,
    `preciounitario`,
    `nombreregistrado`
  )
VALUES
  (13, 3, 1, 8, 0.00, '');
INSERT INTO
  `union_venta_articulos` (
    `id`,
    `cantidad`,
    `articuloId`,
    `ventaId`,
    `preciounitario`,
    `nombreregistrado`
  )
VALUES
  (14, 4, 3, 8, 0.00, '');
INSERT INTO
  `union_venta_articulos` (
    `id`,
    `cantidad`,
    `articuloId`,
    `ventaId`,
    `preciounitario`,
    `nombreregistrado`
  )
VALUES
  (15, 3, 1, 9, 0.00, '');
INSERT INTO
  `union_venta_articulos` (
    `id`,
    `cantidad`,
    `articuloId`,
    `ventaId`,
    `preciounitario`,
    `nombreregistrado`
  )
VALUES
  (16, 4, 3, 9, 0.00, '');
INSERT INTO
  `union_venta_articulos` (
    `id`,
    `cantidad`,
    `articuloId`,
    `ventaId`,
    `preciounitario`,
    `nombreregistrado`
  )
VALUES
  (17, 3, 1, 10, 0.00, '');
INSERT INTO
  `union_venta_articulos` (
    `id`,
    `cantidad`,
    `articuloId`,
    `ventaId`,
    `preciounitario`,
    `nombreregistrado`
  )
VALUES
  (18, 4, 2, 10, 0.00, '');
INSERT INTO
  `union_venta_articulos` (
    `id`,
    `cantidad`,
    `articuloId`,
    `ventaId`,
    `preciounitario`,
    `nombreregistrado`
  )
VALUES
  (19, 3, 1, 11, 0.00, '');
INSERT INTO
  `union_venta_articulos` (
    `id`,
    `cantidad`,
    `articuloId`,
    `ventaId`,
    `preciounitario`,
    `nombreregistrado`
  )
VALUES
  (20, 4, 5, 11, 0.00, '');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: usuario
# ------------------------------------------------------------

INSERT INTO
  `usuario` (
    `id`,
    `cedula`,
    `nombre`,
    `fechaNacimiento`,
    `correo`,
    `username`,
    `password`,
    `estado_activo`,
    `cargoId`
  )
VALUES
  (
    1,
    '000000',
    'sysprop',
    '2002-12-25',
    'carlsgutierrez259@gmail.com',
    'admin',
    'FE52EA7B',
    1,
    1
  );
INSERT INTO
  `usuario` (
    `id`,
    `cedula`,
    `nombre`,
    `fechaNacimiento`,
    `correo`,
    `username`,
    `password`,
    `estado_activo`,
    `cargoId`
  )
VALUES
  (
    2,
    '23456123',
    'Jim Carrey',
    '2000-01-01',
    'xddd@gmail.com',
    'pepe',
    '1321asd',
    1,
    1
  );
INSERT INTO
  `usuario` (
    `id`,
    `cedula`,
    `nombre`,
    `fechaNacimiento`,
    `correo`,
    `username`,
    `password`,
    `estado_activo`,
    `cargoId`
  )
VALUES
  (
    3,
    '1231243',
    '',
    '2000-01-01',
    'xdddd@gmail.com',
    'prueba',
    'asfddaas',
    1,
    2
  );
INSERT INTO
  `usuario` (
    `id`,
    `cedula`,
    `nombre`,
    `fechaNacimiento`,
    `correo`,
    `username`,
    `password`,
    `estado_activo`,
    `cargoId`
  )
VALUES
  (
    4,
    '',
    '',
    '0000-00-00',
    'carlsgutierrez259@gmail.com',
    '',
    '1A7252B5',
    1,
    NULL
  );
INSERT INTO
  `usuario` (
    `id`,
    `cedula`,
    `nombre`,
    `fechaNacimiento`,
    `correo`,
    `username`,
    `password`,
    `estado_activo`,
    `cargoId`
  )
VALUES
  (
    5,
    '',
    '',
    '0000-00-00',
    'carlsgutierrez259@gmail.com',
    '',
    '15D32B44',
    1,
    NULL
  );
INSERT INTO
  `usuario` (
    `id`,
    `cedula`,
    `nombre`,
    `fechaNacimiento`,
    `correo`,
    `username`,
    `password`,
    `estado_activo`,
    `cargoId`
  )
VALUES
  (
    6,
    '',
    '',
    '0000-00-00',
    'carlsgutierrez259@gmail.com',
    '',
    '7DC7A1D4',
    1,
    NULL
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: ventas
# ------------------------------------------------------------

INSERT INTO
  `ventas` (
    `id`,
    `fechaCreacion`,
    `total`,
    `idusuarioId`,
    `idclienteId`
  )
VALUES
  (1, '2023-04-15 23:16:52', 10.00, 1, 1);
INSERT INTO
  `ventas` (
    `id`,
    `fechaCreacion`,
    `total`,
    `idusuarioId`,
    `idclienteId`
  )
VALUES
  (2, '2023-04-15 23:17:03', 30.00, 1, 1);
INSERT INTO
  `ventas` (
    `id`,
    `fechaCreacion`,
    `total`,
    `idusuarioId`,
    `idclienteId`
  )
VALUES
  (3, '2023-04-16 01:13:18', 50.00, 1, 2);
INSERT INTO
  `ventas` (
    `id`,
    `fechaCreacion`,
    `total`,
    `idusuarioId`,
    `idclienteId`
  )
VALUES
  (4, '2023-04-16 05:52:01', 1891.00, 1, 1);
INSERT INTO
  `ventas` (
    `id`,
    `fechaCreacion`,
    `total`,
    `idusuarioId`,
    `idclienteId`
  )
VALUES
  (5, '2023-04-16 07:47:35', 230.00, 1, 1);
INSERT INTO
  `ventas` (
    `id`,
    `fechaCreacion`,
    `total`,
    `idusuarioId`,
    `idclienteId`
  )
VALUES
  (6, '2023-04-16 08:22:24', 253.00, 1, 1);
INSERT INTO
  `ventas` (
    `id`,
    `fechaCreacion`,
    `total`,
    `idusuarioId`,
    `idclienteId`
  )
VALUES
  (7, '2023-04-16 08:29:10', 106.00, 1, 1);
INSERT INTO
  `ventas` (
    `id`,
    `fechaCreacion`,
    `total`,
    `idusuarioId`,
    `idclienteId`
  )
VALUES
  (8, '2023-04-16 08:33:48', 106.00, 1, 1);
INSERT INTO
  `ventas` (
    `id`,
    `fechaCreacion`,
    `total`,
    `idusuarioId`,
    `idclienteId`
  )
VALUES
  (9, '2023-04-16 08:43:47', 106.00, 1, 1);
INSERT INTO
  `ventas` (
    `id`,
    `fechaCreacion`,
    `total`,
    `idusuarioId`,
    `idclienteId`
  )
VALUES
  (10, '2023-04-17 01:52:40', 90.00, 1, 1);
INSERT INTO
  `ventas` (
    `id`,
    `fechaCreacion`,
    `total`,
    `idusuarioId`,
    `idclienteId`
  )
VALUES
  (11, '2023-04-17 02:06:53', 30.00, 1, 1);

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
