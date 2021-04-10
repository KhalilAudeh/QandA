CREATE DATABASE "q&a"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1256'
    LC_CTYPE = 'English_United States.1256'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

CREATE SEQUENCE questions_question_id_seq;

CREATE TABLE public.questions
(
    question_id integer NOT NULL DEFAULT nextval('questions_question_id_seq'::regclass),
    content character varying COLLATE pg_catalog."default",
    type character varying COLLATE pg_catalog."default",
    CONSTRAINT questions_pkey PRIMARY KEY (question_id)
)

TABLESPACE pg_default;

ALTER TABLE public.questions
    OWNER to postgres;

CREATE SEQUENCE answers_answer_id_seq;

CREATE TABLE public.answers
(
    answer_id integer NOT NULL DEFAULT nextval('answers_answer_id_seq'::regclass),
    content character varying COLLATE pg_catalog."default",
    question_id integer NOT NULL DEFAULT nextval('questions_question_id_seq'::regclass),
    CONSTRAINT answers_pkey PRIMARY KEY (answer_id),
    CONSTRAINT question_id_to_answers FOREIGN KEY (question_id)
        REFERENCES public.questions (question_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE public.answers
    OWNER to postgres;
-- Index: fki_question_id_to_answers

-- DROP INDEX public.fki_question_id_to_answers;

CREATE INDEX fki_question_id_to_answers
    ON public.answers USING btree
    (question_id ASC NULLS LAST)
    TABLESPACE pg_default;
