--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: images; Type: TABLE; Schema: public; Owner: kylestech95
--

CREATE TABLE public.images (
    id integer NOT NULL,
    image_key character varying(55) NOT NULL
);


ALTER TABLE public.images OWNER TO kylestech95;

--
-- Name: images_id_seq; Type: SEQUENCE; Schema: public; Owner: kylestech95
--

CREATE SEQUENCE public.images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.images_id_seq OWNER TO kylestech95;

--
-- Name: images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kylestech95
--

ALTER SEQUENCE public.images_id_seq OWNED BY public.images.id;


--
-- Name: images id; Type: DEFAULT; Schema: public; Owner: kylestech95
--

ALTER TABLE ONLY public.images ALTER COLUMN id SET DEFAULT nextval('public.images_id_seq'::regclass);


--
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: kylestech95
--

COPY public.images (id, image_key) FROM stdin;
\.


--
-- Name: images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kylestech95
--

SELECT pg_catalog.setval('public.images_id_seq', 1, false);


--
-- Name: images images_pkey; Type: CONSTRAINT; Schema: public; Owner: kylestech95
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

