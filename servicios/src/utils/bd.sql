create database PARCI;
use PARCI;



CREATE TABLE entidades_federativas (
  id_entidad INT NOT NULL AUTO_INCREMENT,
  nombre_entidad VARCHAR(45) NULL,
  estado TINYINT NULL,
  PRIMARY KEY (id_entidad)
);

CREATE TABLE municipios (
  id_municipio INT NOT NULL AUTO_INCREMENT,
  nombre_municipio VARCHAR(45) NULL,
  fk_idEntidad INT NULL,
  estado TINYINT NULL,
  PRIMARY KEY (id_municipio),
  INDEX fk_idEntidad_idx (fk_idEntidad ASC) VISIBLE,
  CONSTRAINT fk_idEntidad
    FOREIGN KEY (fk_idEntidad)
    REFERENCES entidades_federativas (id_entidad)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
);

CREATE TABLE categorias (
  id_categoria INT NOT NULL AUTO_INCREMENT,
  nombre_categoria VARCHAR(45) NULL,
  color VARCHAR(45) NULL,
  estado TINYINT NULL,
  PRIMARY KEY (id_categoria)
);

CREATE TABLE personas (
  id_persona INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(45) NULL,
  apellido_paterno VARCHAR(45) NULL,
  apellido_materno VARCHAR(45) NULL,
  correo_electronico VARCHAR(45) NULL,
  fecha_nacimiento VARCHAR(45) NULL,
  fk_idMunicipio INT NULL,
  PRIMARY KEY (id_persona),
  INDEX fk_idMunicipio_idx (fk_idMunicipio ASC) VISIBLE,
  CONSTRAINT fk_idMunicipio
    FOREIGN KEY (fk_idMunicipio)
    REFERENCES municipios (id_municipio)
    ON DELETE CASCADE 
    ON UPDATE NO ACTION
);

CREATE TABLE usuarios (
  id_usuario INT NOT NULL AUTO_INCREMENT,
  usuario VARCHAR(45) NULL,
  contraseña VARCHAR(255) NULL,
  rol ENUM('Moderador', 'Administrador', 'Usuario') NULL,
  codigo VARCHAR(45) NULL,
  fecha_opinion DATE NULL,
  contador_opinion INT NULL,
  fk_idPersona INT NULL,
  PRIMARY KEY (id_usuario),
  INDEX fk_idPersonaUsuario_idx (fk_idPersona ASC) VISIBLE,
  CONSTRAINT fk_idPersonaUsuario
    FOREIGN KEY (fk_idPersona)
    REFERENCES personas (id_persona)
	ON DELETE CASCADE 
    ON UPDATE NO ACTION
);

CREATE TABLE personalizacion (
  id_personalizacion INT NOT NULL AUTO_INCREMENT,
  tema ENUM('Claro', 'Oscuro') NULL,
  tamaño_letra ENUM('Chica', 'Mediana', 'Grande') NULL,
  fk_idUsuario INT NULL,
  PRIMARY KEY (id_personalizacion),
  INDEX fk_idUsuario_idx (fk_idUsuario ASC) VISIBLE,
  CONSTRAINT fk_idUsuario
    FOREIGN KEY (fk_idUsuario)
    REFERENCES usuarios (id_usuario)
    ON DELETE CASCADE 
    ON UPDATE NO ACTION
);

CREATE TABLE reportes (
  id_reporte INT NOT NULL AUTO_INCREMENT,
  fecha DATE NULL,
  titulo VARCHAR(45) NULL,
  descripcion TEXT NULL, -- Cambiado a tipo TEXT
  imagen varchar(100) NULL,
  fk_idPersona INT NULL,
  fk_idMunicipio INT NULL,
  fk_idCategoria INT NULL,
  estado ENUM('Espera', 'Publicado', 'Rechazado') NULL,
  PRIMARY KEY (id_reporte),
  CONSTRAINT fk_idCategoriaReporte
    FOREIGN KEY (fk_idCategoria)
    REFERENCES categorias (id_categoria)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_idPersonaReporte
    FOREIGN KEY (fk_idPersona)
    REFERENCES personas (id_persona)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_idMunicipioReporte
    FOREIGN KEY (fk_idMunicipio)
    REFERENCES municipios (id_municipio)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
);


CREATE TABLE opiniones (
  id_opinion INT NOT NULL AUTO_INCREMENT,
  fecha DATE NULL,
  opinion TEXT NULL,
  fk_idReporte INT NULL,
  fk_idPersona INT NULL,
  PRIMARY KEY (id_opinion),
  INDEX fk_idReporte_idx (fk_idReporte ASC) VISIBLE,
  INDEX fk_idPersona_idx (fk_idPersona ASC) VISIBLE,
  CONSTRAINT fk_idReporte
    FOREIGN KEY (fk_idReporte)
    REFERENCES reportes (id_reporte)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_idPersona
    FOREIGN KEY (fk_idPersona)
    REFERENCES personas (id_persona)
    ON DELETE CASCADE 
    ON UPDATE NO ACTION
);

CREATE TABLE visitas (
numero_visitas BIGINT,
  fecha DATE NULL
);

CREATE TABLE votos_opinion (
    id_votos_opinion INT NOT NULL AUTO_INCREMENT,
    voto ENUM('positivo', 'negativo') NULL,
    fk_idPersona INT NULL,
    fk_idOpinion INT NULL,
    PRIMARY KEY (id_votos_opinion),
    INDEX fk_idPersonaOpinion_idx (fk_idPersona ASC) VISIBLE,
    INDEX fk_idOpinion_votos_idx (fk_idOpinion ASC) VISIBLE,
    CONSTRAINT fk_idPersona_votos
        FOREIGN KEY (fk_idPersona)
        REFERENCES personas (id_persona)
        ON DELETE CASCADE 
        ON UPDATE NO ACTION,
    CONSTRAINT fk_idOpinion_votos
        FOREIGN KEY (fk_idOpinion)
        REFERENCES opiniones (id_opinion)
        ON DELETE CASCADE 
        ON UPDATE NO ACTION
);


CREATE TABLE votos_reporte (
    id_votos_reporte INT NOT NULL AUTO_INCREMENT,
    voto ENUM('positivo', 'negativo') NULL,
    fk_idPersona INT NULL,
    fk_idReporte INT NULL,
    PRIMARY KEY (id_votos_reporte),
    INDEX fk_idPersona_voto_reporte_idx (fk_idPersona ASC) VISIBLE,
    CONSTRAINT fk_idPersona_voto_reporte
        FOREIGN KEY (fk_idPersona)
        REFERENCES personas (id_persona)
        ON DELETE CASCADE 
        ON UPDATE NO ACTION,
    INDEX fk_idReporte_voto_reporte_idx (fk_idReporte ASC) VISIBLE,
    CONSTRAINT fk_idReporte_voto_reporte
        FOREIGN KEY (fk_idReporte)
        REFERENCES reportes (id_reporte)
        ON DELETE CASCADE
        ON UPDATE NO ACTION
);


insert into entidades_federativas (nombre_entidad, estado) values ('Aguascalientes', 1);
insert into entidades_federativas (nombre_entidad, estado) values ('Baja California', 1);
insert into entidades_federativas (nombre_entidad, estado) values ('Baja California Sur', 1);
insert into entidades_federativas (nombre_entidad, estado) values ('Campeche', 1);
insert into entidades_federativas (nombre_entidad, estado) values ('Chiapas', 1);
insert into entidades_federativas (nombre_entidad, estado) values ('Chihuahua', 1);
insert into entidades_federativas (nombre_entidad, estado) values ('Ciudad de México', 1);
insert into entidades_federativas (nombre_entidad, estado) values ('Coahuila', 1);
insert into entidades_federativas (nombre_entidad, estado) values ('Colima', 1);
insert into entidades_federativas (nombre_entidad, estado) values ('Durango', 1);
insert into entidades_federativas (nombre_entidad, estado) values ('Estado de México', 1);
insert into entidades_federativas (nombre_entidad, estado) values ('Guanajuato', 1);
insert into entidades_federativas (nombre_entidad, estado) values ('Guerrero', 1);
insert into entidades_federativas (nombre_entidad, estado) values ('Hidalgo', 1);
insert into entidades_federativas (nombre_entidad, estado) values ('Jalisco', 1);
insert into entidades_federativas (nombre_entidad, estado) values ('Michoacán', 1);
insert into entidades_federativas (nombre_entidad, estado) values ('Morelos', 1);
insert into entidades_federativas (nombre_entidad, estado) values ('Nayarit', 1);
insert into entidades_federativas (nombre_entidad, estado) values ('Nuevo León', 1);
insert into entidades_federativas (nombre_entidad, estado) values ('Oaxaca', 1);
insert into entidades_federativas (nombre_entidad, estado) values ('Puebla', 1);
insert into entidades_federativas (nombre_entidad, estado) values ('Querétaro', 1);
insert into entidades_federativas (nombre_entidad, estado) values ('Quintana Roo', 1);
insert into entidades_federativas (nombre_entidad, estado) values ('San Luis Potosí', 1);
insert into entidades_federativas (nombre_entidad, estado) values ('Sinaloa', 1);
insert into entidades_federativas (nombre_entidad, estado) values ('Sonora', 1);
insert into entidades_federativas (nombre_entidad, estado) values ('Tabasco', 1);
insert into entidades_federativas (nombre_entidad, estado) values ('Tamaulipas', 1);
insert into entidades_federativas (nombre_entidad, estado) values ('Tlaxcala', 1);
insert into entidades_federativas (nombre_entidad, estado) values ('Veracruz', 1);
insert into entidades_federativas (nombre_entidad, estado) values ('Yucatán', 1);
insert into entidades_federativas (nombre_entidad, estado) values ('Zacatecas', 1);



insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Aguascalientes', 1, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Asientos', 1, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Calvillo', 1, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Cosío', 1, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Jesús María', 1, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Pabellón de Arteaga', 1, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Rincón de Romos', 1, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('San Francisco de los Romo', 1, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('El Llano', 1, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('San José de Gracia', 1, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Tepezalá', 1, 1);


insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Ensenada', 2, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Mexicali', 2, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Tecate', 2, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Tijuana', 2, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Playas de Rosarito', 2, 1);


insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Comondú', 3, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Mulegé', 3, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('La Paz', 3, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Los Cabos', 3, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Loreto', 3, 1);


insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Calkiní', 4, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Campeche', 4, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Carmen', 4, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Champotón', 4, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Hecelchakán', 4, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Hopelchén', 4, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Palizada', 4, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Tenabo', 4, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Escárcega', 4, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Calakmul', 4, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Candelaria', 4, 1);


insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Acacoyagua', 5, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Acala', 5, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Acapetahua', 5, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Altamirano', 5, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Amatán', 5, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Amatenango de la Frontera', 5, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Amatenango del Valle', 5, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Angel Albino Corzo', 5, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Arriaga', 5, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Bejucal de Ocampo', 5, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Bella Vista', 5, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Berriozábal', 5, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Bochil', 5, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('El Bosque', 5, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Cacahoatán', 5, 1);



insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Ahumada', 6, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Aldama', 6, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Allende', 6, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Aquiles Serdán', 6, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Ascensión', 6, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Bachíniva', 6, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Balleza', 6, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Batopilas', 6, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Bocoyna', 6, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Buenaventura', 6, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Camargo', 6, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Carichí', 6, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Casas Grandes', 6, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Coronado', 6, 1);



insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Azcapotzalco', 7, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Coyoacán', 7, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Cuajimalpa de Morelos', 7, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Gustavo A. Madero', 7, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Iztacalco', 7, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Iztapalapa', 7, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('La Magdalena Contreras', 7, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Milpa Alta', 7, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Álvaro Obregón', 7, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Tláhuac', 7, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Tlalpan', 7, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Xochimilco', 7, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Benito Juárez', 7, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Cuauhtémoc', 7, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Miguel Hidalgo', 7, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Venustiano Carranza', 7, 1);


insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Abasolo', 8, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Acuña', 8, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Allende', 8, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Arteaga', 8, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Candela', 8, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Castaños', 8, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Cuatro Ciénegas', 8, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Escobedo', 8, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Francisco I. Madero', 8, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Frontera', 8, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('General Cepeda', 8, 1);



insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Armería', 9, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Colima', 9, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Comala', 9, 1);

insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Canatlán', 10, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Canelas', 10, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Coneto de Comonfort', 10, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Cuencamé', 10, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Durango', 10, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('General Simón Bolívar', 10, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Gómez Palacio', 10, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Guadalupe Victoria', 10, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Guanaceví', 10, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Hidalgo', 10, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Indé', 10, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Lerdo', 10, 1);



insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Acambay de Ruíz Castañeda', 11, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Acolman', 11, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Aculco', 11, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Almoloya de Alquisiras', 11, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Almoloya de Juárez', 11, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Almoloya del Río', 11, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Amanalco', 11, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Amatepec', 11, 1);



insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Abasolo', 12, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Acámbaro', 12, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('San Miguel de Allende', 12, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Apaseo el Alto', 12, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Apaseo el Grande', 12, 1);



insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Acapulco de Juárez', 13, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Ahuacuotzingo', 13, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Ajuchitlán del Progreso', 13, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Alcozauca de Guerrero', 13, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Alpoyeca', 13, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Apaxtla', 13, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Arcelia', 13, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Atenango del Río', 13, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Atlamajalcingo del Monte', 13, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Atlixtac', 13, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Atoyac de Álvarez', 13, 1);


insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Acatlán', 14, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Acaxochitlán', 14, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Actopan', 14, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Agua Blanca de Iturbide', 14, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Ajacuba', 14, 1);


insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Acatic', 15, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Acatlán de Juárez', 15, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Ahualulco de Mercado', 15, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Amacueca', 15, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Amatitán', 15, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Ameca', 15, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('San Juanito de Escobedo', 15, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Arandas', 15, 1);


insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Acuitzio', 16, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Aguililla', 16, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Álvaro Obregón', 16, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Angamacutiro', 16, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Angangueo', 16, 1);


insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Amacuzac', 17, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Atlatlahucan', 17, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Axochiapan', 17, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Ayala', 17, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Coatlán del Río', 17, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Cuautla', 17, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Cuernavaca', 17, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Emiliano Zapata', 17, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Huitzilac', 17, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Jantetelco', 17, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Jiutepec', 17, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Jojutla', 17, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Jonacatepec', 17, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Mazatepec', 17, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Miacatlán', 17, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Ocuituco', 17, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Puente de Ixtla', 17, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Temixco', 17, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Tepalcingo', 17, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Tepoztlán', 17, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Tetecala', 17, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Tetela del Volcán', 17, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Tlalnepantla', 17, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Tlaltizapán de Zapata', 17, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Tlaquiltenango', 17, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Tlayacapan', 17, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Totolapan', 17, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Xochitepec', 17, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Yautepec', 17, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Yecapixtla', 17, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Zacatepec', 17, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Zacualpan de Amilpas', 17, 1);
insert into municipios (nombre_municipio, fk_idEntidad, estado) values ('Temoac', 17, 1);




insert into categorias (nombre_categoria, color) values ('Seguridad', '#FF0000');
insert into categorias (nombre_categoria, color) values ('Servicios', '#FF8000');
insert into categorias (nombre_categoria, color) values ('Infraestructura', '#FFFF00');
insert into categorias (nombre_categoria, color) values ('Educación', '#00FF00');
insert into categorias (nombre_categoria, color) values ('Salud', '#00FFFF');
insert into categorias (nombre_categoria, color) values ('Medio Ambiente', '#0000FF');
insert into categorias (nombre_categoria, color) values ('Cultura', '#8000FF');
insert into categorias (nombre_categoria, color) values ('Deporte', '#FF00FF');
insert into categorias (nombre_categoria, color) values ('Economía', '#FF0080');
insert into categorias (nombre_categoria, color) values ('Turismo', '#FF8080');
insert into categorias (nombre_categoria, color) values ('Gobierno', '#FF8000');


insert into personas (nombre, apellido_paterno, apellido_materno, correo_electronico, fecha_nacimiento, fk_idMunicipio) values ('Jose Emilio', 'Enriquez', 'Torres', '20213tn105@utez.edu.mx', '1999-10-05', 152);
insert into personas (nombre, apellido_paterno, apellido_materno, correo_electronico, fecha_nacimiento, fk_idMunicipio) values ('David', 'Martinez', 'Jaramillo', '20213tn119@utez.edu.mx', '1999-10-05', 152);
insert into personas (nombre, apellido_paterno, apellido_materno, correo_electronico, fecha_nacimiento, fk_idMunicipio) values ('Emilio', 'Vejar', 'Diaz', '20213tn091@utez.edu.mx', '1999-10-05', 152);
insert into personas (nombre, apellido_paterno, apellido_materno, correo_electronico, fecha_nacimiento, fk_idMunicipio) values ('Alejandro', 'Ibarra', 'Brito', '20213tn116@utez.edu.mx', '1999-10-05', 152);
insert into personas (nombre, apellido_paterno, apellido_materno, correo_electronico, fecha_nacimiento, fk_idMunicipio) values ('Ana Belen', 'Velasquez', 'Diaz', '20213tn149@utez.edu.mx', '1999-10-05', 152);
insert into personas (nombre, apellido_paterno, apellido_materno, correo_electronico, fecha_nacimiento, fk_idMunicipio) values ('Mitzi Dayann', 'Aquino', 'Gutierrez', '20203tn069@utez.edu.mx', '1999-10-05', 152);


insert into usuarios (usuario, contraseña, rol, codigo, fk_idPersona) values ('Birria', '$2a$12$WgNjTNFiByI8NUYaDQEPNeqeyMOVShO.MdtBPa2W2rKJEJt8dlKje', 'Administrador', '123456', 1);
insert into usuarios (usuario, contraseña, rol, codigo, fk_idPersona) values ('Surtida', '$2a$12$WgNjTNFiByI8NUYaDQEPNeqeyMOVShO.MdtBPa2W2rKJEJt8dlKje', 'Moderador', '123456', 2);
insert into usuarios (usuario, contraseña, rol, codigo, contador_opinion, fk_idPersona) values ('Mazisa', '$2a$12$WgNjTNFiByI8NUYaDQEPNeqeyMOVShO.MdtBPa2W2rKJEJt8dlKje', 'Usuario', '123456', 0, 3);
insert into usuarios (usuario, contraseña, rol, codigo, contador_opinion, fk_idPersona) values ('Alambre', '$2a$12$WgNjTNFiByI8NUYaDQEPNeqeyMOVShO.MdtBPa2W2rKJEJt8dlKje', 'Usuario', '123456', 0, 4);
insert into usuarios (usuario, contraseña, rol, codigo, contador_opinion, fk_idPersona) values ('Mitzi', '$2a$12$WgNjTNFiByI8NUYaDQEPNeqeyMOVShO.MdtBPa2W2rKJEJt8dlKje', 'Usuario', '123456', 0, 5);
insert into usuarios (usuario, contraseña, rol, codigo, contador_opinion, fk_idPersona) values ('Belen', '$2a$12$WgNjTNFiByI8NUYaDQEPNeqeyMOVShO.MdtBPa2W2rKJEJt8dlKje', 'Usuario', '123456', 0, 6);



insert into personalizacion (tema, tamaño_letra, fk_idUsuario) values ('Oscuro', 'Chica', 1);
insert into personalizacion (tema, tamaño_letra, fk_idUsuario) values ('Claro', 'Chica', 2);
insert into personalizacion (tema, tamaño_letra, fk_idUsuario) values ('Oscuro', 'Grande', 3);
insert into personalizacion (tema, tamaño_letra, fk_idUsuario) values ('Claro', 'Mediana', 4);
insert into personalizacion (tema, tamaño_letra, fk_idUsuario) values ('Oscuro', 'Mediana', 5);
insert into personalizacion (tema, tamaño_letra, fk_idUsuario) values ('Claro', 'Grande', 6);


insert into reportes (fecha, titulo, descripcion, imagen, fk_idPersona, fk_idMunicipio, fk_idCategoria, estado) 
values ('2021-05-05', 'Robo a mano armada', 'Me asaltaron en la calle', '["https://www.elsoldemexico.com.mx/mexico/justicia/5gqj2t-robos-a-mano-armada-en-la-cdmx-crecen-20-en-enero.jpg"]', 3, 152, 1, 'Espera');

insert into reportes (fecha, titulo, descripcion, imagen,
fk_idPersona, fk_idMunicipio, fk_idCategoria, estado) 
values ('2021-05-05', 'Robo a mano armada', 'Me asaltaron en la calle', '["https://www.elsoldemexico.com.mx/mexico/justicia/5gqj2t-robos-a-mano-armada-en-la-cdmx-crecen-20-en-enero.jpg"]', 3, 152, 1, 'Publicado');
