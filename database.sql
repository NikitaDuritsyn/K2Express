-- ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
-- |||||||||||||||||||||||||||||||||||||||||||||||||||||||      ВОПРОСЫ     |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
-- |||||||||||||||||||||||||||||||||||||||||||||||||||||||      ВОПРОСЫ     |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
-- |||||||||||||||||||||||||||||||||||||||||||||||||||||||      ВОПРОСЫ     |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
-- |||||||||||||||||||||||||||||||||||||||||||||||||||||||      ВОПРОСЫ     |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
-- ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
-- Где дожны храниться Payments и тарифы с услугами. Потому что пока мне не особо понятно как это правильно реализовать. Я так понял относится эта сущьность к Session (или сделать 2 payment сущности одна относиться к Session, а вторая к клиенту)
-- Может ли тариф быть разным у каждого пользователя? (скорее всего нет) Если да, то нужна помощь чтобы понять как распределить данные о них в бд и логику на фронте (кажется что так проще но хз)
-- ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
-- |||||||||||||||||||||||||||||||||||||||||||||||||||||||      НАПОМИН     |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
-- |||||||||||||||||||||||||||||||||||||||||||||||||||||||      НАПОМИН     |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
-- |||||||||||||||||||||||||||||||||||||||||||||||||||||||      НАПОМИН     |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
-- |||||||||||||||||||||||||||||||||||||||||||||||||||||||      НАПОМИН     |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
-- ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
-- UNIQUE - свойство которое делает поле уникальным во всем столбце таблицы
-- Email CHARACTER VARYING(30) UNIQUE, как пример. Нужно сделать с мыслом
-- FOREIGN KEY (user_id) REFERENCES person (id)
-- user_id INTEGER,
-- sql lenguage Russian кодировка - \! chcp 1251
-- DataBase kamenka2
create TABLE users(
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    lastname text NOT NULL,
    email text NOT NULL UNIQUE,
    password text NOT NULL,
    phone VARCHAR(20) NOT NULL
);

create TABLE clients(
    id SERIAL PRIMARY KEY,
    session_id INTEGER,
    FOREIGN KEY (session_id) REFERENCES session (id),
    name text NOT NULL,
    lastname text NOT NULL,
    tariff_id INTEGER NOT NULL,
    number_phone text,
    deposit INTEGER,
    deponent INTEGER,
    status INTEGER NOT NULL,
);

create TABLE session(
    id SERIAL PRIMARY KEY,
    date text NOT NULL,
    time text NOT NULL,
    timeLine text NOT NULL,
    room text NOT NULL,
    start_time text NOT NULL,
    end_time text NOT NULL,
    status INTEGER NOT NULL,
);

create TABLE services(
    id SERIAL PRIMARY KEY,
    client_id INTEGER,
    FOREIGN KEY (client_id) REFERENCES clients (id),
    name text NOT NULL,
    price NUMERIC NOT NULL
);

create TABLE tariffs(
    id SERIAL PRIMARY KEY,
    name text NOT NULL
);

create TABLE payments(
    id SERIAL PRIMARY KEY,
    session_id INTEGER,
    FOREIGN KEY (session_id) REFERENCES session (id),
    client_id INTEGER,
    FOREIGN KEY (client_id) REFERENCES clients (id),
    payment INTEGER NOT NULL
);

create TABLE clients_timeline(
    id SERIAL PRIMARY KEY,
    session_id INTEGER,
    FOREIGN KEY (session_id) REFERENCES session (id),
    client_id INTEGER,
    FOREIGN KEY (client_id) REFERENCES clients (id),
    payment INTEGER NOT NULL
);