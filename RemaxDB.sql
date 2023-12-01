Create database remax;
use remax;
create table Ubicacion(
CDIR varchar(10) primary key,
DIR varchar(100),
DIST varchar(20),
PROV varchar(20),
CIU varchar(20)
);

create table Area_Propiedad(
CAR varchar(10) primary key,
ART varchar(10),
ARD varchar(10),
ARC varchar(10)
);

create table Cliente(
DNI varchar(8) primary key,
NOM varchar(20),
CDIR varchar(10),
foreign key (CDIR) references Ubicacion(CDIR)
);

create table N_Telefonos(
DNI varchar(8),
foreign key (DNI) references Cliente(DNI),
NTEL varchar(9),
primary key (DNI, NTEL)
);

create table Propiedad(
NPR varchar(12) primary key,
DNIC varchar(8),
foreign key (DNIC) references Cliente(DNI),
CDIR varchar (10),
foreign key (CDIR) references Ubicacion(CDIR),
CAR varchar(10),
foreign key (CAR) references Area_Propiedad(CAR),
ANT varchar(5),
PRC varchar(15),
NBA varchar(2),
NHB varchar(2),
NPS varchar(2)
);

DELIMITER //
-- Trigger Genrador de PK Ubicación al realizar una insercion--
CREATE TRIGGER pkUbicacion
BEFORE INSERT ON Ubicacion
FOR EACH ROW
BEGIN
    DECLARE max_id INT;
    -- Obtener el máximo valor de CDIR
    SELECT MAX(CAST(SUBSTRING(CDIR, 6) AS UNSIGNED)) INTO max_id FROM Ubicacion;
    -- Si max_id es NULL (sin registros), establecerlo en 0
    IF max_id IS NULL THEN
        SET max_id = 0;
    END IF;
    -- Generar el nuevo valor para CDIR
    SET NEW.CDIR = CONCAT('CDIR', LPAD(max_id + 1, 6, '0'));
END;
-- Trigger Genrador de PK de Area Propiedad al realizar una insercion --
CREATE TRIGGER pkAreaPro
BEFORE INSERT ON Area_Propiedad
FOR EACH ROW
BEGIN
    DECLARE max_id INT;
    -- Obtener el máximo valor de CAR
    SELECT MAX(CAST(SUBSTRING(CAR, 7) AS UNSIGNED)) INTO max_id FROM Area_Propiedad;
    -- Si max_id es NULL (sin registros), establecerlo en 0
    IF max_id IS NULL THEN
        SET max_id = 0;
    END IF;
    -- Generar el nuevo valor para CDIR
    SET NEW.CAR = CONCAT('CAR', LPAD(max_id + 1, 7, '0'));
END;//
DELIMITER;


DELIMITER //
-- Procedimiento Insercion de Ubicacion --
CREATE PROCEDURE setUbicacion(IN S_DIR VARCHAR(100), IN S_DIST VARCHAR(20), IN S_PROV VARCHAR(20), in S_CIU varchar(20))
BEGIN 
insert into Ubicacion (DIR, DIST, PROV, CIU) values
(S_DIR, S_DIST, S_PROV, S_CIU);
END;

-- Procedimiento Insercion de Area Propiedad --
CREATE PROCEDURE setAreaPropiedad(IN S_ART VARCHAR(10),IN S_ARD VARCHAR(10), IN S_ARC VARCHAR(10))
BEGIN 
insert into Area_Propiedad (ART, ARD, ARC) values
(S_ART, S_ARD, S_ARC);
END;

-- Procedimiento Insercion de Cliente --
CREATE PROCEDURE setCliente(IN S_DNI VARCHAR(8),IN S_NOM VARCHAR(20),IN S_CDIR VARCHAR(10))
BEGIN 
insert into Cliente (DNI, NOM, CDIR) values
(S_DNI, S_NOM, S_CDIR);
END;

-- Procedimiento Insercion de N Telefono --
CREATE PROCEDURE setNTelefonos(IN S_DNI varchar(8),IN S_NTEL VARCHAR(9))
BEGIN 
insert into N_Telefonos (DNI, NTEL) values
(S_DNI, S_NTEL);
END;

-- Procedimiento Insercion de Propiedad --
CREATE PROCEDURE setPropiedad(IN S_NPR VARCHAR(12), IN S_DNIC VARCHAR(8), IN S_CDIR VARCHAR(10), IN S_CAR VARCHAR(10), IN S_ANT VARCHAR(5), IN S_PRC VARCHAR(15), IN S_NBA VARCHAR(2), IN S_NHB VARCHAR(2), IN S_NPS VARCHAR(2))
BEGIN 
insert into Propiedad (NPR, DNIC, CDIR, CAR, ANT, PRC, NBA, NHB, NPS) values
(S_NPR, S_DNIC, S_CDIR, S_CAR, S_ANT, S_PRC, S_NBA, S_NHB, S_NPS);
END;

-- Procedimiento Obtener PK ultima Ubicación --
CREATE PROCEDURE getLastCDIR(OUT resultado VARCHAR(10))
BEGIN
  SELECT CDIR INTO resultado
  FROM Ubicacion
  ORDER BY CDIR DESC
  LIMIT 1;
END;

-- Procedimiento Obtener PK ultima Area Propiedad --
CREATE PROCEDURE getLastCAR(OUT resultado VARCHAR(10))
BEGIN
  SELECT CAR INTO resultado
  FROM Area_Propiedad
  ORDER BY CAR DESC
  LIMIT 1;
END;

-- Procedimiento para el registro de Todos los datos de un cliente --
CREATE PROCEDURE regCli(IN S_DIR VARCHAR(100), IN S_DIST VARCHAR(20), IN S_PROV VARCHAR(20), in S_CIU varchar(20),
						IN S_DNI VARCHAR(8),IN S_NOM VARCHAR(20),
                        IN S_NTEL VARCHAR(9))
BEGIN
	call setUbicacion(S_DIR, S_DIST, S_PROV, S_CIU);
    CALL getLastCDIR(@lastCDIR);
    call setCliente(S_DNI, S_NOM, @lastCDIR);
    call setNTelefonos(S_DNI, S_NTEL);
END;

-- Procedimiento para el registro de Todos los datos de una propiedad --
CREATE PROCEDURE regPro(IN S_DIR VARCHAR(100), IN S_DIST VARCHAR(20), IN S_PROV VARCHAR(20), in S_CIU varchar(20),
						IN S_ART VARCHAR(10),IN S_ARD VARCHAR(10), IN S_ARC VARCHAR(10),
                        IN S_NPR VARCHAR(12), IN S_DNIC VARCHAR(8), IN S_ANT VARCHAR(5), IN S_PRC VARCHAR(15), IN S_NBA VARCHAR(2), IN S_NHB VARCHAR(2), IN S_NPS VARCHAR(2))					
BEGIN
	CALL setUbicacion(S_DIR, S_DIST, S_PROV, S_CIU);
    CALL getLastCDIR(@lastCDIR);
    CALL setAreaPropiedad(S_ART, S_ARD, S_ARC);
    call getLastCAR(@lastCAR);
    call setPropiedad(S_NPR, S_DNIC, @lastCDIR, @lastCAR, S_ANT, S_PRC, S_NBA, S_NHB, S_NPS);
END; //
DELIMITER ;

DELIMITER //
-- Procedimiento Insercion de Ubicacion --
CREATE PROCEDURE getPro(OUT S_NPR VARCHAR(12), OUT S_DNIC VARCHAR(8), OUT S_CDIR VARCHAR(10), OUT S_CAR VARCHAR(10),
						OUT S_ANT VARCHAR(5), OUT S_PRC VARCHAR(15), OUT S_NBA VARCHAR(2), OUT S_NHB VARCHAR(2), OUT S_NPS VARCHAR(2))
BEGIN 
	SELECT NPR, DNIC, CDIR, CAR, ANT, PRC, NBA, NHB, NPS 
    INTO S_NPR, S_DNIC, S_CDIR, S_CAR, S_ANT, S_PRC, S_NBA, S_NHB, S_NPS FROM Propiedad
    order by CAR desc
    limit 1;
END //
DELIMITER ;

CALL getPro(@S_NPR, @S_DNIC, @S_CDIR, @S_CAR, @S_ANT, @S_PRC, @S_NBA, @S_NHB, @S_NPS);
SELECT @S_NPR as NPR, @S_DNIC as DNIC, @S_CDIR as CDIR, @S_CAR as CAR,
    @S_ANT as ANT, @S_PRC as PRC, @S_NBA as NBA, @S_NHB as NHB, @S_NPS as NPS;
    

call regCli('Colegio Ingenieros F-3', 'Cerro Colorado', 'Arequipa', 'Arequipa', '73018668', 'Fernando Dios', '941358274');
call regCli('Av Caracas 621', 'JLBYR', 'Arequipa', 'Arequipa', '76452310', 'Angie Alvarez', '945134723');
call regCli('Contamana 219', 'JLBYR', 'Arequipa', 'Arequipa', '71645291', 'Jose Huamani', '951826738');
call regCli('Av Brazil 328', 'Cerro Colorado', 'Arequipa', 'Arequipa', '76146899', 'Piero Muñante', '986326456');
call regCli('Jiron Jose Antonio Encinas 124', 'Cercado', 'Arequipa', 'Arequipa', '70513742', 'Terrep Bejar', '914236825');

call regPro('Colegio Ingenieros F-3', 'Cerro Colorado', 'Arequipa', 'Arequipa', '900', '400', '500', '719238495434', '73018668', '7', '90000', '4', '4', '3');
call regPro('Av Caracas 621', 'JLBYR', 'Arequipa', 'Arequipa', '1000', '500', '500', '293847283456', '76452310', '5', '5000', '2', '2', '2');
call regPro('Contamana 219', 'JLBYR', 'Arequipa', 'Arequipa', '400', '400', '0', '273646473812', '71645291', '3', '10000', '3', '3', '1');
call regPro('Av Brazil 328', 'Cerro Colorado', 'Arequipa', 'Arequipa', '700', '400', '300', '989898767654', '76146899', '1', '7000', '3', '3', '1');
call regPro('Jiron Jose Antonio Encinas 124', 'Cercado', 'Arequipa', 'Arequipa', '100', '50', '50', '121232323456', '70513742', '5', '8000', '3', '3', '1');




