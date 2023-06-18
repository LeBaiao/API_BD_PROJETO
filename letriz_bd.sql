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

DELIMITER //
CREATE FUNCTION sp_rendimento_cliente (cliente_id INT)
RETURNS DECIMAL(10, 2)
DETERMINISTIC
BEGIN
    DECLARE total DECIMAL(10, 2);

    SELECT SUM(pf.valor_total) INTO total
    FROM pedido_tb p
    JOIN pedido_finalizado_tb pf ON p.id = pf.id_pedido
    WHERE p.id_cliente = cliente_id;

    RETURN total;
END //
DELIMITER ;


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

DELIMITER //
CREATE TRIGGER trg_valida_valor_produto
AFTER INSERT ON produto_tb
FOR EACH ROW
BEGIN
    IF NEW.preco < 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'O valor do produto não pode ser negativo.';
    END IF;
END //
DELIMITER ;


CREATE VIEW vx_pedidos AS
SELECT itens.*, c.id, c.nome AS "Cliente", p.nome AS "Produto"
FROM item_pedido_tb itens JOIN produto_tb p
ON itens.id_produto =  p.id
JOIN pedido_tb ped
ON itens.id_pedido = ped.id
JOIN cliente_tb c
ON c.id = ped.id_cliente



