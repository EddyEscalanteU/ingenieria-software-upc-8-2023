CREATE TABLE BITACORA (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    FECHA_HORA DATETIME,
    ID_VALOR INT,
    EVENTO VARCHAR(100),
    VALOR NVARCHAR(100),
    USUARIO VARCHAR(100)
);

CREATE TRIGGER TRIGGER_INSERT_USUARIO
ON USUARIOS FOR INSERT
AS
BEGIN

    SET NOCOUNT ON;
    DECLARE @Evento VARCHAR(100);
    DECLARE @Valor NVARCHAR(100);
    DECLARE @Id NVARCHAR(100);

    IF EXISTS (SELECT * FROM INSERTED)
    BEGIN
    -- Si existe una insercion en la columna USER_NAME
        IF EXISTS (SELECT USER_NAME FROM INSERTED)
        BEGIN
            SET @Evento = 'INSERT EN LA COLUMNA USER_NAME DE LA TABLA USUARIO';
            SELECT @Valor = USER_NAME FROM INSERTED;
            SELECT @Id = ID FROM INSERTED;
            INSERT INTO BITACORA (FECHA_HORA,ID_VALOR,EVENTO, VALOR, USUARIO)
            SELECT
                GETDATE(),
                @Id,
                @Evento,
                @Valor,
                SYSTEM_USER;
        END
        -- Si existe una insercion en la columna USER_NAME
        IF EXISTS (SELECT NOMBRE_COMPLETO FROM INSERTED)
        BEGIN
            SET @Evento = 'INSERT EN LA COLUMNA NOMBRE_COMPLETO DE LA TABLA USUARIO';
            SELECT @Valor = NOMBRE_COMPLETO FROM INSERTED;
            SELECT @Id = ID FROM INSERTED;
            INSERT INTO BITACORA (FECHA_HORA, ID_VALOR,EVENTO, VALOR, USUARIO)
            SELECT
                GETDATE(),
                @Id,
                @Evento,
                @Valor,
                SYSTEM_USER;
        END

        -- Si existe una insercion en la columna PASSWORD
        IF EXISTS (SELECT PASSWORD FROM INSERTED)
        BEGIN
            SET @Evento = 'INSERT EN LA COLUMNA PASSWORD DE LA TABLA USUARIO';
            SELECT @Valor = PASSWORD FROM INSERTED;
            SELECT @Id = ID FROM INSERTED;
            INSERT INTO BITACORA (FECHA_HORA, ID_VALOR,EVENTO, VALOR, USUARIO)
            SELECT
                GETDATE(),
                @Id,
                @Evento,
                @Valor,
                SYSTEM_USER;
        END
    END
END;

CREATE TRIGGER TRIGGER_UPDATE_USUARIO
ON USUARIOS FOR UPDATE
AS
BEGIN

    SET NOCOUNT ON;
    DECLARE @Evento VARCHAR(100);
    DECLARE @Valor NVARCHAR(100);
    DECLARE @Id NVARCHAR(100);

    IF EXISTS (SELECT * FROM INSERTED)
    BEGIN
    -- Si existe una insercion en la columna USER_NAME
        IF EXISTS (SELECT USER_NAME FROM INSERTED)
        BEGIN
            SET @Evento = 'UPDATE EN LA COLUMNA USER_NAME DE LA TABLA USUARIO';
            SELECT @Valor = USER_NAME FROM INSERTED;
            SELECT @Id = ID FROM INSERTED;
            INSERT INTO BITACORA (FECHA_HORA,ID_VALOR,EVENTO, VALOR, USUARIO)
            SELECT
                GETDATE(),
                @Id,
                @Evento,
                @Valor,
                SYSTEM_USER;
        END
        -- Si existe una insercion en la columna USER_NAME
        IF EXISTS (SELECT NOMBRE_COMPLETO FROM INSERTED)
        BEGIN
            SET @Evento = 'UPDATE EN LA COLUMNA NOMBRE_COMPLETO DE LA TABLA USUARIO';
            SELECT @Valor = NOMBRE_COMPLETO FROM INSERTED;
            SELECT @Id = ID FROM INSERTED;
            INSERT INTO BITACORA (FECHA_HORA, ID_VALOR,EVENTO, VALOR, USUARIO)
            SELECT
                GETDATE(),
                @Id,
                @Evento,
                @Valor,
                SYSTEM_USER;
        END

        -- Si existe una insercion en la columna PASSWORD
        IF EXISTS (SELECT PASSWORD FROM INSERTED)
        BEGIN
            SET @Evento = 'UPDATE EN LA COLUMNA PASSWORD DE LA TABLA USUARIO';
            SELECT @Valor = PASSWORD FROM INSERTED;
            SELECT @Id = ID FROM INSERTED;
            INSERT INTO BITACORA (FECHA_HORA, ID_VALOR,EVENTO, VALOR, USUARIO)
            SELECT
                GETDATE(),
                @Id,
                @Evento,
                @Valor,
                SYSTEM_USER;
        END
    END
END;

CREATE TRIGGER TRIGGER_DELETE_USUARIO
ON USUARIOS
FOR DELETE
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @Evento VARCHAR(100);
    DECLARE @Valor NVARCHAR(100);
    DECLARE @Id INT;

    IF EXISTS (SELECT * FROM DELETED)
    BEGIN
        SELECT @Id = ID FROM DELETED;

        SET @Evento = 'DELETE DE LA TABLA USUARIO CON EL ID: ' + CAST(@Id AS VARCHAR(10));

        INSERT INTO BITACORA (FECHA_HORA, ID_VALOR, EVENTO, VALOR, USUARIO)
        SELECT
            GETDATE(),
            @Id,
            @Evento,
            @Valor,
            SYSTEM_USER;
    END
END;



CREATE TRIGGER TRIGGER_INSERT_CATEGORIA_PRODUCTO
ON CATEGORIA_PRODUCTO FOR INSERT
AS
BEGIN

    SET NOCOUNT ON;
    DECLARE @Evento VARCHAR(100);
    DECLARE @Valor NVARCHAR(100);
    DECLARE @Id NVARCHAR(100);

    IF EXISTS (SELECT * FROM INSERTED)
    BEGIN
    -- Si existe una insercion en la columna NOMBRE
        IF EXISTS (SELECT NOMBRE FROM INSERTED)
        BEGIN
            SET @Evento = 'INSERT EN LA COLUMNA NOMBRE DE LA TABLA CATEGORIA_PRODUCTO';
            SELECT @Valor = NOMBRE FROM INSERTED;
            SELECT @Id = ID FROM INSERTED;
            INSERT INTO BITACORA (FECHA_HORA,ID_VALOR,EVENTO, VALOR, USUARIO)
            SELECT
                GETDATE(),
                @Id,
                @Evento,
                @Valor,
                SYSTEM_USER;
        END
    END
END;

CREATE TRIGGER TRIGGER_UPDATE_CATEGORIA_PRODUCTO
ON CATEGORIA_PRODUCTO FOR UPDATE
AS
BEGIN

    SET NOCOUNT ON;
    DECLARE @Evento VARCHAR(100);
    DECLARE @Valor NVARCHAR(100);
    DECLARE @Id NVARCHAR(100);

    IF EXISTS (SELECT * FROM INSERTED)
    BEGIN
    -- Si existe una insercion en la columna NOMBRE
        IF EXISTS (SELECT NOMBRE FROM INSERTED)
        BEGIN
            SET @Evento = 'UPDATE EN LA COLUMNA NOMBRE DE LA TABLA CATEGORIA_PRODUCTO';
            SELECT @Valor = NOMBRE FROM INSERTED;
            SELECT @Id = ID FROM INSERTED;
            INSERT INTO BITACORA (FECHA_HORA,ID_VALOR,EVENTO, VALOR, USUARIO)
            SELECT
                GETDATE(),
                @Id,
                @Evento,
                @Valor,
                SYSTEM_USER;
        END
    END
END;

CREATE TRIGGER TRIGGER_DELETE_CATEGORIA_PRODUCTO
ON CATEGORIA_PRODUCTO
FOR DELETE
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @Evento VARCHAR(100);
    DECLARE @Valor NVARCHAR(100);
    DECLARE @Id INT;

    IF EXISTS (SELECT * FROM DELETED)
    BEGIN
        SELECT @Id = ID FROM DELETED;

        SET @Evento = 'DELETE DE LA TABLA CATEGORIA_PRODUCTO CON EL ID: ' + CAST(@Id AS VARCHAR(10));

        INSERT INTO BITACORA (FECHA_HORA, ID_VALOR, EVENTO, VALOR, USUARIO)
        SELECT
            GETDATE(),
            @Id,
            @Evento,
            @Valor,
            SYSTEM_USER;
    END
END;
-----------------------------------------------------

CREATE TRIGGER TRIGGER_INSERT_PRODUCTO
ON PRODUCTO FOR INSERT
AS
BEGIN

    SET NOCOUNT ON;
    DECLARE @Evento VARCHAR(100);
    DECLARE @Valor NVARCHAR(100);
    DECLARE @Id NVARCHAR(100);

    IF EXISTS (SELECT * FROM INSERTED)
    BEGIN
        IF EXISTS (SELECT NOMBRE FROM INSERTED)
        BEGIN
            SET @Evento = 'INSERT EN LA COLUMNA NOMBRE DE LA TABLA PRODUCTO';
            SELECT @Valor = NOMBRE FROM INSERTED;
            SELECT @Id = ID FROM INSERTED;
            INSERT INTO BITACORA (FECHA_HORA,ID_VALOR,EVENTO, VALOR, USUARIO)
            SELECT
                GETDATE(),
                @Id,
                @Evento,
                @Valor,
                SYSTEM_USER;
        END
        IF EXISTS (SELECT ID_CATEGORIA FROM INSERTED)
        BEGIN
            SET @Evento = 'INSERT EN LA COLUMNA ID_CATEGORIA DE LA TABLA PRODUCTO';
            SELECT @Valor = ID_CATEGORIA FROM INSERTED;
            SELECT @Id = ID FROM INSERTED;
            INSERT INTO BITACORA (FECHA_HORA, ID_VALOR,EVENTO, VALOR, USUARIO)
            SELECT
                GETDATE(),
                @Id,
                @Evento,
                @Valor,
                SYSTEM_USER;
        END
    END
END;


CREATE TRIGGER TRIGGER_UPDATE_PRODUCTO
ON PRODUCTO FOR UPDATE
AS
BEGIN

    SET NOCOUNT ON;
    DECLARE @Evento VARCHAR(100);
    DECLARE @Valor NVARCHAR(100);
    DECLARE @Id NVARCHAR(100);

    IF EXISTS (SELECT * FROM INSERTED)
    BEGIN
        IF EXISTS (SELECT NOMBRE FROM INSERTED)
        BEGIN
            SET @Evento = 'UPDATE EN LA COLUMNA NOMBRE DE LA TABLA PRODUCTO';
            SELECT @Valor = NOMBRE FROM INSERTED;
            SELECT @Id = ID FROM INSERTED;
            INSERT INTO BITACORA (FECHA_HORA,ID_VALOR,EVENTO, VALOR, USUARIO)
            SELECT
                GETDATE(),
                @Id,
                @Evento,
                @Valor,
                SYSTEM_USER;
        END
        IF EXISTS (SELECT ID_CATEGORIA FROM INSERTED)
        BEGIN
            SET @Evento = 'UPDATE EN LA COLUMNA ID_CATEGORIA DE LA TABLA PRODUCTO';
            SELECT @Valor = ID_CATEGORIA FROM INSERTED;
            SELECT @Id = ID FROM INSERTED;
            INSERT INTO BITACORA (FECHA_HORA, ID_VALOR,EVENTO, VALOR, USUARIO)
            SELECT
                GETDATE(),
                @Id,
                @Evento,
                @Valor,
                SYSTEM_USER;
        END
    END
END;

CREATE TRIGGER TRIGGER_DELETE_PRODUCTO
ON PRODUCTO
FOR DELETE
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @Evento VARCHAR(100);
    DECLARE @Valor NVARCHAR(100);
    DECLARE @Id INT;

    IF EXISTS (SELECT * FROM DELETED)
    BEGIN
        SELECT @Id = ID FROM DELETED;

        SET @Evento = 'DELETE DE LA TABLA PRODUCTO CON EL ID: ' + CAST(@Id AS VARCHAR(10));

        INSERT INTO BITACORA (FECHA_HORA, ID_VALOR, EVENTO, VALOR, USUARIO)
        SELECT
            GETDATE(),
            @Id,
            @Evento,
            @Valor,
            SYSTEM_USER;
    END
END;


CREATE TRIGGER TRIGGER_INSERT_CARRITO_COMPRA
ON CARRITO_COMPRA FOR INSERT
AS
BEGIN

    SET NOCOUNT ON;
    DECLARE @Evento VARCHAR(100);
    DECLARE @Valor NVARCHAR(100);
    DECLARE @Id NVARCHAR(100);

    IF EXISTS (SELECT * FROM INSERTED)
    BEGIN
        IF EXISTS (SELECT FECHA FROM INSERTED)
        BEGIN
            SET @Evento = 'INSERT EN LA COLUMNA FECHA DE LA TABLA CARRITO_COMPRA';
            SELECT @Valor = FECHA FROM INSERTED;
            SELECT @Id = ID FROM INSERTED;
            INSERT INTO BITACORA (FECHA_HORA,ID_VALOR,EVENTO, VALOR, USUARIO)
            SELECT
                GETDATE(),
                @Id,
                @Evento,
                @Valor,
                SYSTEM_USER;
        END
        IF EXISTS (SELECT ID_USUARIO FROM INSERTED)
        BEGIN
            SET @Evento = 'INSERT EN LA COLUMNA ID_USUARIO DE LA TABLA CARRITO_COMPRA';
            SELECT @Valor = ID_USUARIO FROM INSERTED;
            SELECT @Id = ID FROM INSERTED;
            INSERT INTO BITACORA (FECHA_HORA, ID_VALOR,EVENTO, VALOR, USUARIO)
            SELECT
                GETDATE(),
                @Id,
                @Evento,
                @Valor,
                SYSTEM_USER;
        END
    END
END;

CREATE TRIGGER TRIGGER_UPDATE_CARRITO_COMPRA
ON CARRITO_COMPRA FOR UPDATE
AS
BEGIN

    SET NOCOUNT ON;
    DECLARE @Evento VARCHAR(100);
    DECLARE @Valor NVARCHAR(100);
    DECLARE @Id NVARCHAR(100);

    IF EXISTS (SELECT * FROM INSERTED)
    BEGIN
        IF EXISTS (SELECT FECHA FROM INSERTED)
        BEGIN
            SET @Evento = 'UPDATE EN LA COLUMNA FECHA DE LA TABLA CARRITO_COMPRA';
            SELECT @Valor = FECHA FROM INSERTED;
            SELECT @Id = ID FROM INSERTED;
            INSERT INTO BITACORA (FECHA_HORA,ID_VALOR,EVENTO, VALOR, USUARIO)
            SELECT
                GETDATE(),
                @Id,
                @Evento,
                @Valor,
                SYSTEM_USER;
        END
        IF EXISTS (SELECT ID_USUARIO FROM INSERTED)
        BEGIN
            SET @Evento = 'UPDATE EN LA COLUMNA ID_USUARIO DE LA TABLA CARRITO_COMPRA';
            SELECT @Valor = ID_USUARIO FROM INSERTED;
            SELECT @Id = ID FROM INSERTED;
            INSERT INTO BITACORA (FECHA_HORA, ID_VALOR,EVENTO, VALOR, USUARIO)
            SELECT
                GETDATE(),
                @Id,
                @Evento,
                @Valor,
                SYSTEM_USER;
        END
    END
END;


CREATE TRIGGER TRIGGER_DELETE_CARRITO_COMPRA
ON CARRITO_COMPRA
FOR DELETE
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @Evento VARCHAR(100);
    DECLARE @Valor NVARCHAR(100);
    DECLARE @Id INT;

    IF EXISTS (SELECT * FROM DELETED)
    BEGIN
        SELECT @Id = ID FROM DELETED;

        SET @Evento = 'DELETE DE LA TABLA CARRITO_COMPRA CON EL ID: ' + CAST(@Id AS VARCHAR(10));

        INSERT INTO BITACORA (FECHA_HORA, ID_VALOR, EVENTO, VALOR, USUARIO)
        SELECT
            GETDATE(),
            @Id,
            @Evento,
            @Valor,
            SYSTEM_USER;
    END
END;


CREATE TRIGGER TRIGGER_INSERT_DETALLE_CARRITO
ON DETALLE_CARRITO FOR INSERT
AS
BEGIN

    SET NOCOUNT ON;
    DECLARE @Evento VARCHAR(100);
    DECLARE @Valor NVARCHAR(100);
    DECLARE @Id NVARCHAR(100);

    IF EXISTS (SELECT * FROM INSERTED)
    BEGIN
        IF EXISTS (SELECT CANTIDAD FROM INSERTED)
        BEGIN
            SET @Evento = 'INSERT EN LA COLUMNA CANTIDAD DE LA TABLA DETALLE_CARRITO';
            SELECT @Valor = CANTIDAD FROM INSERTED;
            SELECT @Id = ID FROM INSERTED;
            INSERT INTO BITACORA (FECHA_HORA,ID_VALOR,EVENTO, VALOR, USUARIO)
            SELECT
                GETDATE(),
                @Id,
                @Evento,
                @Valor,
                SYSTEM_USER;
        END
        IF EXISTS (SELECT ID_PRODUCTO FROM INSERTED)
        BEGIN
            SET @Evento = 'INSERT EN LA COLUMNA ID_PRODUCTO DE LA TABLA DETALLE_CARRITO';
            SELECT @Valor = ID_PRODUCTO FROM INSERTED;
            SELECT @Id = ID FROM INSERTED;
            INSERT INTO BITACORA (FECHA_HORA, ID_VALOR,EVENTO, VALOR, USUARIO)
            SELECT
                GETDATE(),
                @Id,
                @Evento,
                @Valor,
                SYSTEM_USER;
        END
        IF EXISTS (SELECT ID_CARRITO_COMPRA FROM INSERTED)
        BEGIN
            SET @Evento = 'INSERT EN LA COLUMNA ID_CARRITO_COMPRA DE LA TABLA DETALLE_CARRITO';
            SELECT @Valor = ID_CARRITO_COMPRA FROM INSERTED;
            SELECT @Id = ID FROM INSERTED;
            INSERT INTO BITACORA (FECHA_HORA, ID_VALOR,EVENTO, VALOR, USUARIO)
            SELECT
                GETDATE(),
                @Id,
                @Evento,
                @Valor,
                SYSTEM_USER;
        END
    END
END;


CREATE TRIGGER TRIGGER_UPDATE_DETALLE_CARRITO
ON DETALLE_CARRITO FOR UPDATE
AS
BEGIN

    SET NOCOUNT ON;
    DECLARE @Evento VARCHAR(100);
    DECLARE @Valor NVARCHAR(100);
    DECLARE @Id NVARCHAR(100);

    IF EXISTS (SELECT * FROM INSERTED)
    BEGIN
        IF EXISTS (SELECT CANTIDAD FROM INSERTED)
        BEGIN
            SET @Evento = 'UPDATE EN LA COLUMNA CANTIDAD DE LA TABLA DETALLE_CARRITO';
            SELECT @Valor = CANTIDAD FROM INSERTED;
            SELECT @Id = ID FROM INSERTED;
            INSERT INTO BITACORA (FECHA_HORA,ID_VALOR,EVENTO, VALOR, USUARIO)
            SELECT
                GETDATE(),
                @Id,
                @Evento,
                @Valor,
                SYSTEM_USER;
        END
        IF EXISTS (SELECT ID_PRODUCTO FROM INSERTED)
        BEGIN
            SET @Evento = 'UPDATE EN LA COLUMNA ID_PRODUCTO DE LA TABLA DETALLE_CARRITO';
            SELECT @Valor = ID_PRODUCTO FROM INSERTED;
            SELECT @Id = ID FROM INSERTED;
            INSERT INTO BITACORA (FECHA_HORA, ID_VALOR,EVENTO, VALOR, USUARIO)
            SELECT
                GETDATE(),
                @Id,
                @Evento,
                @Valor,
                SYSTEM_USER;
        END
        IF EXISTS (SELECT ID_CARRITO_COMPRA FROM INSERTED)
        BEGIN
            SET @Evento = 'UPDATE EN LA COLUMNA ID_CARRITO_COMPRA DE LA TABLA DETALLE_CARRITO';
            SELECT @Valor = ID_CARRITO_COMPRA FROM INSERTED;
            SELECT @Id = ID FROM INSERTED;
            INSERT INTO BITACORA (FECHA_HORA, ID_VALOR,EVENTO, VALOR, USUARIO)
            SELECT
                GETDATE(),
                @Id,
                @Evento,
                @Valor,
                SYSTEM_USER;
        END
    END
END;

CREATE TRIGGER TRIGGER_DELETE_DETALLE_CARRITO
ON DETALLE_CARRITO
FOR DELETE
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @Evento VARCHAR(100);
    DECLARE @Valor NVARCHAR(100);
    DECLARE @Id INT;

    IF EXISTS (SELECT * FROM DELETED)
    BEGIN
        SELECT @Id = ID FROM DELETED;

        SET @Evento = 'DELETE DE LA TABLA DETALLE_CARRITO CON EL ID: ' + CAST(@Id AS VARCHAR(10));

        INSERT INTO BITACORA (FECHA_HORA, ID_VALOR, EVENTO, VALOR, USUARIO)
        SELECT
            GETDATE(),
            @Id,
            @Evento,
            @Valor,
            SYSTEM_USER;
    END
END;

CREATE TRIGGER TRIGGER_INSERT_GESTION_FUNCIONALIDADES
ON GESTION_FUNCIONALIDADES FOR INSERT
AS
BEGIN

    SET NOCOUNT ON;
    DECLARE @Evento VARCHAR(100);
    DECLARE @Valor NVARCHAR(100);
    DECLARE @Id NVARCHAR(100);

    IF EXISTS (SELECT * FROM INSERTED)
    BEGIN
        IF EXISTS (SELECT NOMBRE FROM INSERTED)
        BEGIN
            SET @Evento = 'INSERT EN LA COLUMNA NOMBRE DE LA TABLA GESTION_FUNCIONALIDADES';
            SELECT @Valor = NOMBRE FROM INSERTED;
            SELECT @Id = ID FROM INSERTED;
            INSERT INTO BITACORA (FECHA_HORA,ID_VALOR,EVENTO, VALOR, USUARIO)
            SELECT
                GETDATE(),
                @Id,
                @Evento,
                @Valor,
                SYSTEM_USER;
        END
        IF EXISTS (SELECT DESCRIPCION FROM INSERTED)
        BEGIN
            SET @Evento = 'INSERT EN LA COLUMNA DESCRIPCION DE LA TABLA GESTION_FUNCIONALIDADES';
            SELECT @Valor = DESCRIPCION FROM INSERTED;
            SELECT @Id = ID FROM INSERTED;
            INSERT INTO BITACORA (FECHA_HORA, ID_VALOR,EVENTO, VALOR, USUARIO)
            SELECT
                GETDATE(),
                @Id,
                @Evento,
                @Valor,
                SYSTEM_USER;
        END
    END
END;

CREATE TRIGGER TRIGGER_UPDATE_GESTION_FUNCIONALIDADES
ON GESTION_FUNCIONALIDADES FOR INSERT
AS
BEGIN

    SET NOCOUNT ON;
    DECLARE @Evento VARCHAR(100);
    DECLARE @Valor NVARCHAR(100);
    DECLARE @Id NVARCHAR(100);

    IF EXISTS (SELECT * FROM INSERTED)
    BEGIN
        IF EXISTS (SELECT NOMBRE FROM INSERTED)
        BEGIN
            SET @Evento = 'UPDATE EN LA COLUMNA NOMBRE DE LA TABLA GESTION_FUNCIONALIDADES';
            SELECT @Valor = NOMBRE FROM INSERTED;
            SELECT @Id = ID FROM INSERTED;
            INSERT INTO BITACORA (FECHA_HORA,ID_VALOR,EVENTO, VALOR, USUARIO)
            SELECT
                GETDATE(),
                @Id,
                @Evento,
                @Valor,
                SYSTEM_USER;
        END
        IF EXISTS (SELECT DESCRIPCION FROM INSERTED)
        BEGIN
            SET @Evento = 'UPDATE EN LA COLUMNA DESCRIPCION DE LA TABLA GESTION_FUNCIONALIDADES';
            SELECT @Valor = DESCRIPCION FROM INSERTED;
            SELECT @Id = ID FROM INSERTED;
            INSERT INTO BITACORA (FECHA_HORA, ID_VALOR,EVENTO, VALOR, USUARIO)
            SELECT
                GETDATE(),
                @Id,
                @Evento,
                @Valor,
                SYSTEM_USER;
        END
    END
END;

CREATE TRIGGER TRIGGER_DELETE_GESTION_FUNCIONALIDADES
ON GESTION_FUNCIONALIDADES
FOR DELETE
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @Evento VARCHAR(100);
    DECLARE @Valor NVARCHAR(100);
    DECLARE @Id INT;

    IF EXISTS (SELECT * FROM DELETED)
    BEGIN
        SELECT @Id = ID FROM DELETED;

        SET @Evento = 'DELETE DE LA TABLA GESTION_FUNCIONALIDADES CON EL ID: ' + CAST(@Id AS VARCHAR(10));

        INSERT INTO BITACORA (FECHA_HORA, ID_VALOR, EVENTO, VALOR, USUARIO)
        SELECT
            GETDATE(),
            @Id,
            @Evento,
            @Valor,
            SYSTEM_USER;
    END
END;
