# Configure .env with .env.example

# Install Modules
npm install

# Create Database and schema
---------------------------------------------------------------------------------------------------------------------

# Run Migration
node ace migration:run

# Rollback Migration
node ace migration:rollback

# Create Migration
Example: node ace make:migration users

# Run Seed
node ace db:seed

# Create Seed
Example: node ace make:seeder authorized_keys

# Start
npm run dev

---

# DB Local
Requisitos:
Ter SQL Server instalado (Senha "root") e algum SGBD.

-Criar uma conexão local sem apontar o schema principal

-Criar database com nome 'dbstartbrasil'

-Se estiver usando o DBeaver (SGBD) para conexão local ir até opções avançadas da conexão e ativar "Usar SSL" se necessário

Se acontecer algum erro de sql_mode=only_full_group_by rodar o seguinte comando na base:
SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));

# Dependencies Version
- Node Version: 18.19.1
- Adonis Version: 5.9.5