--
-- PostgreSQL database dump
--

-- Dumped from database version 15.6 (Debian 15.6-1.pgdg110+2)
-- Dumped by pg_dump version 15.6 (Debian 15.6-1.pgdg110+2)

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
-- Name: credentials; Type: TABLE; Schema: public; Owner: kylestech95
--

CREATE TABLE public.credentials (
    id integer NOT NULL,
    plain text NOT NULL,
    hash text NOT NULL
);


ALTER TABLE public.credentials OWNER TO kylestech95;

--
-- Name: credentials_id_seq; Type: SEQUENCE; Schema: public; Owner: kylestech95
--

CREATE SEQUENCE public.credentials_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.credentials_id_seq OWNER TO kylestech95;

--
-- Name: credentials_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kylestech95
--

ALTER SEQUENCE public.credentials_id_seq OWNED BY public.credentials.id;


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


ALTER TABLE public.images_id_seq OWNER TO kylestech95;

--
-- Name: images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kylestech95
--

ALTER SEQUENCE public.images_id_seq OWNED BY public.images.id;


--
-- Name: credentials id; Type: DEFAULT; Schema: public; Owner: kylestech95
--

ALTER TABLE ONLY public.credentials ALTER COLUMN id SET DEFAULT nextval('public.credentials_id_seq'::regclass);


--
-- Name: images id; Type: DEFAULT; Schema: public; Owner: kylestech95
--

ALTER TABLE ONLY public.images ALTER COLUMN id SET DEFAULT nextval('public.images_id_seq'::regclass);


--
-- Data for Name: credentials; Type: TABLE DATA; Schema: public; Owner: kylestech95
--

COPY public.credentials (id, plain, hash) FROM stdin;
1	testmailbox987654@gmail.com	$2b$12$5OVmUqLtjYS1R8vBjsxN9eujUB2NfK0pCHZmbHuxjbjSZybmfXtO2
\.


--
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: kylestech95
--

COPY public.images (id, image_key) FROM stdin;
1	html output.png
2	email_server.png
3	cowboyyum.webp
\.


--
-- Name: credentials_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kylestech95
--

SELECT pg_catalog.setval('public.credentials_id_seq', 1, true);


--
-- Name: images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kylestech95
--

SELECT pg_catalog.setval('public.images_id_seq', 1, false);


--
-- Name: credentials credentials_pkey; Type: CONSTRAINT; Schema: public; Owner: kylestech95
--

ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT credentials_pkey PRIMARY KEY (id);


--
-- Name: images images_pkey; Type: CONSTRAINT; Schema: public; Owner: kylestech95
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

