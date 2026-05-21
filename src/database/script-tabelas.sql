
CREATE DATABASE VozesDeLuanda;

USE VozesDeLuanda;

CREATE TABLE usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT, 
nome VARCHAR (50),
email VARCHAR (45), 
senha VARCHAR (30),
frenteiro VARCHAR (45),
estado VARCHAR (2)
);

CREATE TABLE sugestao (
idSug INT,
email VARCHAR (60), 
nome VARCHAR (45), 
descricao VARCHAR (400),
fkUsuario INT,
CONSTRAINT chUsuario 
	FOREIGN KEY (fkUsuario) 
		REFERENCES usuario(idUsuario),
CONSTRAINT chComposta
		PRIMARY KEY (fkUsuario,idSug) -- N existe sugestão, sem usuario
);

CREATE TABLE pontuacao (
pontuacao INT, 
fkUsuario INT,
CONSTRAINT chFkUsuario
	FOREIGN KEY (fkUsuario)
		REFERENCES usuario(idUsuario)
);

CREATE TABLE entidades (
idEntidade INT PRIMARY KEY,
nome VARCHAR(45)

);

CREATE TABLE acesso (
idAcesso INT, 
fkEntidade INT,
CONSTRAINT chEntidade 
	FOREIGN KEY (fkEntidade) 
    REFERENCES entidade(idEntidad),
fkUsuario INT,
CONSTRAINT chUsuarioFk 
	FOREIGN KEY (fkUsuario)
    REFERENCES usuario(idUsuario),
CONSTRAINT pkEntidade
	PRIMARY KEY  (idAcesso,fkEntidade,fkUsuario)
);

SELECT * FROM usuario;

DELETE FROM usuario WHERE idUsuario = 5;


TRUNCATE TABLE usuario;

DROP TABLE usuario;