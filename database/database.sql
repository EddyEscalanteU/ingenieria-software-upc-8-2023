



/*

create database upd_database

use upd_database


USUARIOS
CATEGORIA_PRODUCTO
PRODUCTO
DETALLE_CARRITO
CARRITO_COMPRA

DROP TABLE USUARIOS;
DROP TABLE CATEGORIA_PRODUCTO;
DROP TABLE PRODUCTO;
DROP TABLE DETALLE_CARRITO;
DROP TABLE CARRITO_COMPRA;


*/


--/////////////////////////USUARIOS///////////////////////////////////////////

IF OBJECT_ID('USUARIOS', 'U') IS NOT NULL 
  DROP TABLE USUARIOS; 
GO

CREATE TABLE USUARIOS
(
  "ID"                          INT IDENTITY(1,1),
  "USER_NAME"                   VARCHAR(40) NOT NULL,
  "NOMBRE_COMPLETO"             VARCHAR(100) NOT NULL,
  "PASSWORD"		            VARCHAR(100) NOT NULL,
  "USUARIO_REGISTRO"            VARCHAR(50) DEFAULT SYSTEM_USER NOT NULL,
  "FECHA_REGISTRO"              DATETIME DEFAULT getdate() NOT NULL,
  "ESTADO_REGISTRO"				INT DEFAULT 1 NOT NULL, 
  CONSTRAINT USUARIOS_PK		PRIMARY KEY (ID)
);

--/////////////////////////CATEGORIA_PRODUCTO///////////////////////////////////////////

IF OBJECT_ID('CATEGORIA_PRODUCTO', 'U') IS NOT NULL 
  DROP TABLE CATEGORIA; 
GO

CREATE TABLE CATEGORIA_PRODUCTO
(
  "ID"								INT IDENTITY(1,1),
  "NOMBRE"							VARCHAR(100) NOT NULL,
  "USUARIO_REGISTRO"				VARCHAR(50) DEFAULT SYSTEM_USER NOT NULL,
  "FECHA_REGISTRO"					DATETIME DEFAULT getdate() NOT NULL,
  "ESTADO_REGISTRO"					INT DEFAULT 1 NOT NULL, 
  CONSTRAINT CATEGORIA_PRODUCTO_PK	PRIMARY KEY (ID)
);

--/////////////////////////PRODUCTO///////////////////////////////////////////

IF OBJECT_ID('PRODUCTO', 'U') IS NOT NULL 
  DROP TABLE PRODUCTO; 
GO

CREATE TABLE PRODUCTO
(
  "ID"                          INT IDENTITY(1,1),
  "NOMBRE"						VARCHAR(100) NOT NULL,
  "ID_CATEGORIA"				INT NOT NULL,
  "USUARIO_REGISTRO"            VARCHAR(50) DEFAULT SYSTEM_USER NOT NULL,
  "FECHA_REGISTRO"              DATETIME DEFAULT getdate() NOT NULL,
  "ESTADO_REGISTRO"				INT DEFAULT 1 NOT NULL, 
  CONSTRAINT PRODUCTO_PK		PRIMARY KEY (ID)
);

ALTER TABLE PRODUCTO
  ADD CONSTRAINT "FK_PRODUCTO_TO_CATEGORIA_PRODUCTO" 
  FOREIGN KEY(ID_CATEGORIA)
  REFERENCES CATEGORIA_PRODUCTO("ID");
  
  
--/////////////////////////CARRITO_COMPRA///////////////////////////////////////////

IF OBJECT_ID('CARRITO_COMPRA', 'U') IS NOT NULL 
  DROP TABLE CARRITO_COMPRA; 
GO

CREATE TABLE CARRITO_COMPRA
(
  "ID"                          INT IDENTITY(1,1),
  "FECHA"						DATETIME NOT NULL,
  "ID_USUARIO"					INT NOT NULL,
  "USUARIO_REGISTRO"            VARCHAR(50) DEFAULT SYSTEM_USER NOT NULL,
  "FECHA_REGISTRO"              DATETIME DEFAULT getdate() NOT NULL,
  "ESTADO_REGISTRO"				INT DEFAULT 1 NOT NULL, 
  CONSTRAINT CARRITO_COMPRA_PK		PRIMARY KEY (ID)
);

ALTER TABLE CARRITO_COMPRA
  ADD CONSTRAINT "FK_CARRITO_COMPRA_TO_USUARIO" 
  FOREIGN KEY("ID_USUARIO")
  REFERENCES USUARIOS("ID");


--/////////////////////////DETALLE_CARRITO///////////////////////////////////////////

IF OBJECT_ID('DETALLE_CARRITO', 'U') IS NOT NULL 
  DROP TABLE DETALLE_CARRITO; 
GO

CREATE TABLE DETALLE_CARRITO
(
  "ID"								INT IDENTITY(1,1),
  "CANTIDAD"						INT NOT NULL,
  "ID_PRODUCTO"						INT NOT NULL,
  "ID_CARRITO_COMPRA"				INT NOT NULL,
  "USUARIO_REGISTRO"				VARCHAR(50) DEFAULT SYSTEM_USER NOT NULL,
  "FECHA_REGISTRO"					DATETIME DEFAULT getdate() NOT NULL,
  "ESTADO_REGISTRO"					INT DEFAULT 1 NOT NULL, 
  CONSTRAINT DETALLE_CARRITO_PK		PRIMARY KEY (ID)
);

ALTER TABLE DETALLE_CARRITO
  ADD CONSTRAINT "FK_DETALLE_CARRITO_TO_PRODUCTO" 
  FOREIGN KEY("ID_PRODUCTO")
  REFERENCES PRODUCTO("ID");

ALTER TABLE DETALLE_CARRITO
  ADD CONSTRAINT "FK_DETALLE_CARRITO_TO_CARRITO_COMPRA" 
  FOREIGN KEY("ID_CARRITO_COMPRA")
  REFERENCES CARRITO_COMPRA("ID");
--

-- /////////////////////////////// AGREGAR COLUMNAS PARA LA GESTION DE PRECIOS
-- Agregar columnas a las tablas detalle carrito y producto:
-- Tabla detalle carrito:
--	precio_venta: decimal
-- Tabla producto:
--	precio_unitario: decimal

-- Agregar columna precio_venta a la tabla detalle carrito
ALTER TABLE DETALLE_CARRITO
ADD  precio_venta decimal NOT NULL DEFAULT 0;

-- Agregar columna precio_unitario a la tabla producto
ALTER TABLE PRODUCTO
ADD  precio_unitario decimal NOT NULL DEFAULT 0;
--
--/////////////////////////Tabla para gestionar las funcionalidades del sistema///////////////////////////////////////////

CREATE TABLE GESTION_FUNCIONALIDADES
(
  "ID" INT IDENTITY(1, 1) PRIMARY KEY,
  "NOMBRE" VARCHAR(100) NOT NULL,
  "DESCRIPCION" VARCHAR(255),
  "USUARIO_REGISTRO" VARCHAR(50) DEFAULT SYSTEM_USER NOT NULL,
  "FECHA_REGISTRO" DATETIME DEFAULT GETDATE() NOT NULL,
  "ESTADO_REGISTRO" INT DEFAULT 1 NOT NULL
);

--/////////////////////////Tabla de roles de usuario///////////////////////////////////////////

CREATE TABLE ROLES_USUARIO
(
  "ID" INT IDENTITY(1,1) PRIMARY KEY,
  "NOMBRE_ROL" VARCHAR(50) NOT NULL,
  "DESCRIPCION" VARCHAR(255),
  "USUARIO_REGISTRO" VARCHAR(50) DEFAULT SYSTEM_USER NOT NULL,
  "FECHA_REGISTRO" DATETIME DEFAULT GETDATE() NOT NULL,
  "ESTADO_REGISTRO" INT DEFAULT 1 NOT NULL
);

--/////////////////////////Tabla de asignacion de roles a un usuario///////////////////////////////////////////

CREATE TABLE ASIGNACION_ROLES
(
  "ID" INT IDENTITY(1, 1) PRIMARY KEY,
  "ID_USUARIO" INT NOT NULL,
  "ID_ROL" INT NOT NULL,
  CONSTRAINT USUARIO_ROLES_UNIQUE UNIQUE ("ID_USUARIO", "ID_ROL"),
  FOREIGN KEY ("ID_USUARIO") REFERENCES USUARIOS ("ID"),
  FOREIGN KEY ("ID_ROL") REFERENCES ROLES_USUARIO ("ID")
);

/*


select * from USUARIOS //Backend
select * from CATEGORIA_PRODUCTO //Backend
select * from PRODUCTO //Backend
select * from CARRITO_COMPRA //Backend
select * from DETALLE_CARRITO
select * from GESTION_FUNCIONALIDADES
select * from ROLES_USUARIO

/FUNCIONALIDADES/
INSERT INTO GESTION_FUNCIONALIDADES ("NOMBRE", "DESCRIPCION", "USUARIO_REGISTRO", "FECHA_REGISTRO", "ESTADO_REGISTRO")
VALUES ('Iniciar sesión en el sistema', 'Permite a los usuarios iniciar sesión en el sistema', 'Admin', GETDATE(), 1);
INSERT INTO GESTION_FUNCIONALIDADES ("NOMBRE", "DESCRIPCION", "USUARIO_REGISTRO", "FECHA_REGISTRO", "ESTADO_REGISTRO")
VALUES ('Visualizar información del perfil', 'Permite a los usuarios ver su información de perfil', 'Admin', GETDATE(), 1);
INSERT INTO GESTION_FUNCIONALIDADES ("NOMBRE", "DESCRIPCION", "USUARIO_REGISTRO", "FECHA_REGISTRO", "ESTADO_REGISTRO")
VALUES ('Administración de Productos', 'Permite a los usuarios administrar productos en el sistema', 'Admin', GETDATE(), 1);
INSERT INTO GESTION_FUNCIONALIDADES ("NOMBRE", "DESCRIPCION", "USUARIO_REGISTRO", "FECHA_REGISTRO", "ESTADO_REGISTRO")
VALUES ('Administración de Carrito de Compra', 'Permite a los usuarios administrar su carrito de compra', 'Admin', GETDATE(), 1);
INSERT INTO GESTION_FUNCIONALIDADES ("NOMBRE", "DESCRIPCION", "USUARIO_REGISTRO", "FECHA_REGISTRO", "ESTADO_REGISTRO")
VALUES ('Registro de actividades', 'Permite el registro de actividades de usuarios en el sistema', 'Admin', GETDATE(), 1);
INSERT INTO GESTION_FUNCIONALIDADES ("NOMBRE", "DESCRIPCION", "USUARIO_REGISTRO", "FECHA_REGISTRO", "ESTADO_REGISTRO")
VALUES ('Visualizar información de proveedor', 'Permite a los usuarios ver la información de los proveedores', 'Admin', GETDATE(), 1);
INSERT INTO GESTION_FUNCIONALIDADES ("NOMBRE", "DESCRIPCION", "USUARIO_REGISTRO", "FECHA_REGISTRO", "ESTADO_REGISTRO")
VALUES ('Administración de Categorías de Productos', 'Permite a los usuarios administrar las categorías de productos en el sistema', 'Admin', GETDATE(), 1);

/ROLES DE USUARIO/
INSERT INTO ROLES_USUARIO ("NOMBRE_ROL", "DESCRIPCION")
VALUES ('Usuario del sistema', 'Rol para usuarios regulares');
INSERT INTO ROLES_USUARIO ("NOMBRE_ROL", "DESCRIPCION")
VALUES ('Vendedor', 'Rol para vendedores');
INSERT INTO ROLES_USUARIO ("NOMBRE_ROL", "DESCRIPCION")
VALUES ('Administrador del sistema', 'Rol para administradores');

INSERT INTO [dbo].[USUARIOS]([USER_NAME], [NOMBRE_COMPLETO], [PASSWORD]) VALUES ('jorge.c', 'Jorge Campos', '2023') 




INSERT INTO [dbo].[CATEGORIA_PRODUCTO]([NOMBRE]) VALUES ('Limpieza') 


INSERT INTO [dbo].[PRODUCTO]([NOMBRE], [ID_CATEGORIA]) VALUES ('Producto 1', 1) 
INSERT INTO [dbo].[PRODUCTO]([NOMBRE], [ID_CATEGORIA]) VALUES ('Producto 2', 1) 
INSERT INTO [dbo].[PRODUCTO]([NOMBRE], [ID_CATEGORIA]) VALUES ('Producto 3', 1) 



INSERT INTO [dbo].[CARRITO_COMPRA]([FECHA], [ID_USUARIO]) VALUES (getdate(), 1) 


INSERT INTO [dbo].[DETALLE_CARRITO]([CANTIDAD], [ID_PRODUCTO], [ID_CARRITO_COMPRA]) VALUES (10, 1, 1) 
INSERT INTO [dbo].[DETALLE_CARRITO]([CANTIDAD], [ID_PRODUCTO], [ID_CARRITO_COMPRA]) VALUES (5, 2, 1) 
INSERT INTO [dbo].[DETALLE_CARRITO]([CANTIDAD], [ID_PRODUCTO], [ID_CARRITO_COMPRA]) VALUES (1, 3, 1) 

*/


--  /*************************PROCEDIMIENTOS ALMACENADOS******************************\
-- /                                                                                  \
--/  
--****** Buscar segun nombre y contrasenia y devuelve todos los sus datos ************
CREATE PROCEDURE SearchUserByUserAndPass
    @UserName VARCHAR(40),
    @Password VARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT *
    FROM USUARIOS
    WHERE USER_NAME = @UserName AND PASSWORD = @Password AND ESTADO_REGISTRO = 1;
END


--****** modificar la contrasenia segun le mandemos el ID y el password ************
CREATE PROCEDURE changeUserPasswordDB
    @UserID INT,
    @NewPassword VARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE USUARIOS
    SET PASSWORD = @NewPassword
    WHERE ID = @UserID;
END