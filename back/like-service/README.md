# like-service
-installer postgresql 
https://www.postgresql.org/download/

-tous installer (pour faire plus simple)

-executer PgAdmin4 
-suivre les instructions

-creé la base de donnée
-selectioner la base de donnée
-ouvrir un query tool (click droite sur le nom de la base, query tool)
-exectuter la ligne: CREATE EXTENSION IF NOT EXISTS "uuid-ossp"

-puis executer le code suivant 
CREATE TABLE IF NOT EXISTS public.likes
(
    like_uuid uuid NOT NULL DEFAULT uuid_generate_v4(),
    user_uuid uuid,
    project_uuid uuid,
    like_date date NOT NULL,
    CONSTRAINT likes_pkey PRIMARY KEY (like_uuid)
)

-la base de donnée et la table likes sont crée 

.env
SERVER_PORT= 8030

PROJECT_SERVICE_ADDRESS="localhost:8020"

DB_HOST='localhost'
DB_USER='postgres'
DB_NAME='' // nom de la base de donnée que vous avez saisi sur pgAdmin4, exemple: like_service_database
DB_PASSWORD='' // mot de passe que vous avez saisi sur pgAdmin4
DB_PORT='5432'



