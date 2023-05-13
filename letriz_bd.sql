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
PRIMARY KEY (id)
);

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
DELIMITER ;

Procedure que verifica o login, se a senha inserida está de acordo com o cpf cadastrado no sistema
DELIMITER $$
CREATE PROCEDURE verificar_login(IN p_cpf VARCHAR(11), IN p_senha VARCHAR(50), OUT p_resultado INT)
BEGIN
    DECLARE senha_correta VARCHAR(50);
    SELECT senha INTO senha_correta FROM cliente_tb WHERE cpf = p_cpf;
    IF senha_correta = p_senha THEN
        SET p_resultado = 1;
    ELSE
        SET p_resultado = 0;
    END IF;
END$$
DELIMITER ;*/

/*drop table item_pedido_tb;
drop table pedido_tb;
drop table cliente_tb;
drop table produto_tb;*/


