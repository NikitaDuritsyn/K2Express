-- DataBase kamenka2
create TABLE clients(
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    lastname text NOT NULL
);

























    -- DataBaseTodoAPP
create TABLE person(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password text NOT NULL,
    salt text,
    phone VARCHAR(20) NOT NULL,
    token text,
    role VARCHAR(50) DEFAULT 'user'
);
create TABLE tasks(
    id SERIAL PRIMARY KEY,
    user_id INT references person(id),
    title text,
    description text,
    status BOOLEAN,
    imporatant_index INT
);


    -- UNIQUE - свойство которое делает поле уникальным во всем столбце таблицы
    -- Email CHARACTER VARYING(30) UNIQUE, как пример. Нужно сделать с мыслом
create TABLE person(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password text NOT NULL,
    salt text,
    phone VARCHAR(20) NOT NULL,
    token text,
    role VARCHAR(50) DEFAULT 'user'
);
create TABLE orders(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) DEFAULT 'NULL',
    description text DEFAULT 'NULL',
    username VARCHAR(50) NOT NULL,
    patronymic VARCHAR(50),
    userlastname VARCHAR(50),
    email VARCHAR(255),
    phone VARCHAR(20) NOT NULL
);
create TABLE person(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password text NOT NULL,
    salt text,
    phone VARCHAR(20) NOT NULL,
    token text,
    role VARCHAR(50) NOT NULL
);
-- // //////////////// // --
create TABLE products(
    id SERIAL PRIMARY KEY,
    type VARCHAR(255) DEFAULT 'NULL',
    title VARCHAR(255) DEFAULT 'Преимущества',
    titleTwo VARCHAR(255) DEFAULT 'NULL',
    descriptionMaterial text DEFAULT 'NULL',
    descriptionAdvantages text DEFAULT 'NULL',
    price VARCHAR(50) DEFAULT 'NULL',
    urlImage text DEFAULT 'NULL'
);
create TABLE reviews(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) DEFAULT 'NULL',
    lastname VARCHAR(255) DEFAULT 'NULL',
    date VARCHAR(255) DEFAULT 'NULL',
    description text DEFAULT 'NULL',
    grade NUMERIC
);
-- ОТЫЗЫВЫ ФАЛЬШИВКИ НУЖНО СДЕЛАТЬ ОБНОВЛЕНИЕ ДАТЫ НА НИХ ПО ТАЙМЕРУ
create TABLE reviewsStatic(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) DEFAULT 'NULL',
    lastname VARCHAR(255) DEFAULT 'NULL',
    date VARCHAR(255) DEFAULT 'NULL',
    description text DEFAULT 'NULL', -- Сделать ограничение на 300 символов
    grade NUMERIC
);

    -- FOREIGN KEY (user_id) REFERENCES person (id)
    -- user_id INTEGER,
    -- sql lenguage Russian кодировка - \! chcp 1251