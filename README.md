# Chat Web

## Configuração Incial

### `Frontend`

1. Alterar as url's do front para localhost:8001

### `Backend`

1. Renomear o settings.py.example -> settings.py
2. Em DEBUG colcar True
3. python manage.py shell:<br>
from django.core.management.utils import get_random_secret_key<br>
get_random_secret_key()
4. Após isso pegar key e colocar em settings.py em SECRET_KEY = 'key' (entre apóstrofo)
5. python manage.py createsuperuser
6. Criar um grupo com o nome base e com permissões básicas. 


## Deploy

1. npm run start -> front
2. python manage.py runserver -> backend

## Exemplo

[Site teste](https://webappsandcoffee.000webhostapp.com/)