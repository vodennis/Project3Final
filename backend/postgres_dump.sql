--
-- PostgreSQL database dump
--

-- Dumped from database version 16.6 (Postgres.app)
-- Dumped by pg_dump version 16.6 (Postgres.app)

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
-- Name: ingredients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ingredients (
    ingredients_id integer NOT NULL,
    name character varying(255)
);


ALTER TABLE public.ingredients OWNER TO postgres;

--
-- Name: ingredients_ingredients_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ingredients_ingredients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ingredients_ingredients_id_seq OWNER TO postgres;

--
-- Name: ingredients_ingredients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ingredients_ingredients_id_seq OWNED BY public.ingredients.ingredients_id;


--
-- Name: recipes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recipes (
    recipe_id integer NOT NULL,
    name character varying(255),
    steps character varying(255),
    instructions character varying(255),
    ingredients text[],
    image_url character varying(255),
    likes integer DEFAULT 0
);


ALTER TABLE public.recipes OWNER TO postgres;

--
-- Name: recipes_recipe_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.recipes_recipe_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.recipes_recipe_id_seq OWNER TO postgres;

--
-- Name: recipes_recipe_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.recipes_recipe_id_seq OWNED BY public.recipes.recipe_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    name character varying(255),
    saved_recipes integer[] DEFAULT ARRAY[]::integer[]
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: ingredients ingredients_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredients ALTER COLUMN ingredients_id SET DEFAULT nextval('public.ingredients_ingredients_id_seq'::regclass);


--
-- Name: recipes recipe_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipes ALTER COLUMN recipe_id SET DEFAULT nextval('public.recipes_recipe_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: ingredients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ingredients (ingredients_id, name) FROM stdin;
1	chicken
2	beans
3	flour\n
4	pasta
5	tomato sauce
6	olive oil
7	garlic
8	milk
9	eggs
10	sugar
11	lettuce
12	tomatoes
13	cucumbers
14	vinegar
15	butter
16	chocolate chips
17	bread
18	cheese
\.


--
-- Data for Name: recipes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recipes (recipe_id, name, steps, instructions, ingredients, image_url, likes) FROM stdin;
2	Pancakes	Step 1: Mix ingredients. Step 2: Cook on a hot pan.	Combine flour, milk, eggs, and sugar in a bowl. Heat a pan and pour batter in small circles to cook.	{flour,milk,eggs,sugar}	https://www.tastesoflizzyt.com/wp-content/uploads/2023/12/sourdough-pancakes-23.jpg	3
4	Chocolate Chip Cookies	Step 1: Prepare dough. Step 2: Bake in the oven.	Mix flour, sugar, butter, and chocolate chips to prepare the dough. Shape into balls and bake at 375°F for 10-12 minutes.	{flour,sugar,butter,"chocolate chips"}	https://handletheheat.com/wp-content/uploads/2020/10/BAKERY-STYLE-CHOCOLATE-CHIP-COOKIES-9-637x637-1.jpg	0
5	Grilled Cheese Sandwich	Step 1: Assemble sandwich. Step 2: Grill on a pan.	Place cheese between slices of bread. Butter the outside of the bread and grill on a pan until golden brown.	{bread,cheese,butter}	https://www.allrecipes.com/thmb/UVU9W8kTfADN7YjALIn1u9MfCUY=/0x512/filters:no_upscale():max_bytes(150000):strip_icc()/125434-GrilledCheeseoftheGods-mfs-3x2-067-267097af4d0b446ab646bba044445147.jpg	0
3	Garden Salad	Step 1: Chop vegetables. Step 2: Mix in a bowl. Step 3: Add dressing.	Chop lettuce, tomatoes, and cucumbers. Mix in a bowl and drizzle with olive oil and vinegar.	{lettuce,tomatoes,cucumbers,"olive oil",vinegar}	https://garlicsaltandlime.com/wp-content/uploads/2022/07/Garden-salad-thumbnail.jpg	2
1	Spaghetti	Step 1: Boil water. Step 2: Cook pasta. Step 3: Prepare sauce.	Bring a pot of water to a boil, cook the spaghetti until al dente, and prepare the tomato sauce in a separate pan.	{pasta,"tomato sauce","olive oil",garlic}	https://veganwithgusto.com/wp-content/uploads/2021/05/spicy-spaghetti-arrabbiata.jpg	6
6	tes	test	test	{pasta,"olive oil",garlic,eggs}	test	0
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, name, saved_recipes) FROM stdin;
1	Dennis Vo\n	{}
\.


--
-- Name: ingredients_ingredients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ingredients_ingredients_id_seq', 3, true);


--
-- Name: recipes_recipe_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.recipes_recipe_id_seq', 6, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 1, true);


--
-- Name: ingredients ingredients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_pkey PRIMARY KEY (ingredients_id);


--
-- Name: recipes recipes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_pkey PRIMARY KEY (recipe_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- PostgreSQL database dump complete
--

