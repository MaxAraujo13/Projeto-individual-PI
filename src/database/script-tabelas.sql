
CREATE DATABASE VozesDeLuanda;

USE VozesDeLuanda;

CREATE TABLE usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT, 
nome VARCHAR (50),
email VARCHAR (45), 
senha VARCHAR (30),
entidade VARCHAR (45),
estado VARCHAR (2)
);

CREATE TABLE sugestao (
nome VARCHAR (45), 
descricao VARCHAR (400),
fkUsuario INT,
CONSTRAINT chUsuario 
	FOREIGN KEY (fkUsuario) 
		REFERENCES usuario(idUsuario),
CONSTRAINT chComposta
		PRIMARY KEY (fkUsuario,idSug) -- N existe sugestão, sem usuario
);

CREATE TABLE cruzadinha (
idPontuacao INT PRIMARY KEY AUTO_INCREMENT,
pontuacao INT, 
fkUsuario INT,
CONSTRAINT chFkUsuario
	FOREIGN KEY (fkUsuario)
		REFERENCES usuario(idUsuario)
);


CREATE TABLE acesso (
idAcesso INT PRIMARY KEY AUTO_INCREMENT, 
entidade_acessada VARCHAR(20),
momento DATETIME,
fk_Usuario INT,
CONSTRAINT fkUsu
	FOREIGN KEY (fk_Usuario) 
    REFERENCES usuario(idUsuario)
);

SELECT * FROM usuario;


