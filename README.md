# DevShop

## Instalação e configuração
Você precisará, basicamente, de PHP >= 5.5.6 e MySQL.

Clone o repositório:

```
git clone git@github.com:beeblebrox3/devshop
```

Instale as dependências:

```
cd devshop
composer install
```

Copie o arquivo de configuração do exemplo:
```
cp config.sample.ini config.ini
```

Você precisa editar este arquivo e colocar os dados de acesso ao seu banco de dados (MySQL).
Depois de configurar isso, rode o comando abaixo para configurar as tabelas:

```
php install.php
```

Para rodar o projeto, use o servidor web integrado do PHP (ou use o servidor que quiser ;)):

```
php -S localhost:8000 -t public/
``` 

Acesse no seu navegador http://localhost:8000.


No menu da parte superior, clique em configurações e preencha o formulário com o nome da Organização no github que você pretente utilizar.