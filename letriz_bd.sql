/*CREATE DATABASE Letriz_bd;*/
USE Letriz_bd;

CREATE TABLE cliente_tb(
id INT auto_increment not null,
cpf VARCHAR(11),
nome VARCHAR(50),
email VARCHAR(50),
senha VARCHAR(50),
endereco VARCHAR(50),
PRIMARY KEY (id)
);

CREATE TABLE produto_tb(
id INT auto_increment not null,
nome VARCHAR(50),
editora  VARCHAR(50),
preco DECIMAL(10,2),
estoque INT,
estado VARCHAR(10),
PRIMARY KEY (id)
);
alter table produto_tb add estado VARCHAR(10);
select * from produto_tb;
CREATE TABLE pedido_tb(
id INT auto_increment not null,
id_cliente INT,
PRIMARY KEY (id),
FOREIGN KEY(id_cliente) REFERENCES cliente_tb(id)
);


CREATE TABLE item_pedido_tb(
id_pedido INT,
num_item INT,
id_produto INT,
quantidade INT,
PRIMARY KEY(id_pedido, num_item),
FOREIGN KEY(id_pedido) REFERENCES pedido_tb(id),
FOREIGN KEY (id_produto) REFERENCES produto_tb(id)
);

CREATE TABLE pedido_finalizado_tb(
id_finalizado INT auto_increment not null,
id_pedido INT,
data_pedido date,
valor_total DECIMAL(10,2),
forma_pagamento VARCHAR(50),
PRIMARY KEY (id_finalizado),
FOREIGN KEY (id_pedido) REFERENCES pedido_tb (id)
);

 /*Funtion que calcula o total do pedido
DELIMITER $$
CREATE FUNCTION calcular_preco_total_pedido(id_pedido INT) RETURNS DECIMAL(10,2)
BEGIN
    DECLARE preco_total DECIMAL(10,2);
    SELECT SUM(item_pedido_tb.quantidade * produto_tb.preco)
    INTO preco_total
    FROM item_pedido_tb
    INNER JOIN produto_tb ON item_pedido_tb.id_produto = produto_tb.id
    WHERE item_pedido_tb.id_pedido = id_pedido;
    RETURN preco_total;
END$$
DELIMITER ;*/


DELIMITER //
CREATE PROCEDURE validar_login(IN p_email VARCHAR(255), IN p_senha VARCHAR(255))
BEGIN
    DECLARE v_count INT;
    -- Verificar se o email e a senha correspondem a um usuário válido
    SELECT COUNT(*) INTO v_count
    FROM cliente_tb
    WHERE email = p_email AND senha = p_senha;
    -- Retornar o resultado da validação
    IF v_count = 1 THEN
        SELECT 'Login válido' AS mensagem;
    ELSE
        SELECT 'Login inválido' AS mensagem;
    END IF;
END //
DELIMITER ;

/*drop table item_pedido_tb;
drop table pedido_tb;
drop table cliente_tb;
drop table produto_tb;*/


