# Проект "Яндекс Найм" (Хакатон от «Яндекс Практикума»)

## 1. [Описание](#1)
## 2. [API, эндпойнты для интеграции с фронтендом и другие технические моменты](#2)
## 3. [Запуск проекта в Docker контейнерах с помощью Docker Compose](#3)
## 4. [Ссылка на развернутый проект](#4) 
## 5. [Автор проекта:](#5)

## 1. Описание  <a id=1></a>

Проект "Яндекс Найм" (Хакатон от «Яндекс Практикума») предоставляет пользователям следующие возможности:
- Авторизовываться HR-пользователям;
- Просматривать общий список кандидатов с возможность фильтровать по ключевым полям:
  "Направление специальности", "Курс Практикума",  "Ключевые навыки" и "Опыт работы"
- Просматривать понравившегося кандидата подробно, можно ознакомиться с 
детальным опытом работы, образованием, контактной информацией кандидата;
- Ддобавлять кандидата в отслеживаемые(потенциально можно предложить работу);
- Распечатать резюме понравившегося кандидата (PDF-форма);
- Просматривать список существующих вакансий;
- Просматривать конретную вакансию кандидата и ознакомиться с зарплатными ожиданиями, 
требованиями к кандидату, местро проживания и направление специальности;
- Создавать вакансию необходимую для компании с помощью необходимых фильтров.


## 2. API, эндпойнты для интеграции с фронтендом и другие технические моменты <a id=2></a>

- http://84.201.133.88:8000/api/v1/users/  Работа с пользователями. Регистрация пользователей.
Вывод пользователей. У авторизованных HR пользователей. POST и GET запросы.
возможность добавления кандидата в отслеживаемые.
- http://84.201.133.88:8000/api/v1/candidates/ Просмотр всех кандидатов(короткий список атрибутов кандидата)
  GET запрос.  
- http://84.201.133.88:8000/api/v1/candidates/{id} Подробное резюме о конкретнос кандидате. GET запрос.  
- http://84.201.133.88:8000/api/v1/vacancies/ Просмотр списка вакансий кандидатов. GET запрос. 
- http://84.201.133.88:8000/api/v1/vacancies/ Создание вакансии кандидата. POST запрос.
- http://127.0.0.1:8000/api/v1/candidates/?specialization_id=Программирование фильтр по полю специализации.
Также предусмотрены и другие аналогичные фильтры по "Направлению", "Курсам практикума", "Ключевые навыки".
- Реализован загрузчик данных общий candidates_rest, который включает в себя загрузчики: Курсов ЯП, Типов занятости,
Опыт работы(в годах), Направление специализации, Ключевые навыки, Софт скиллы, Уровень кандидата, График работы, 
Детальный опыт работы, Образование кандидата. Также реализован загрузчик candidates_main, который включает в себя
загрузку следующий полей: Имя, Отчество, Фамилия соискателя, пол, возраст, телефон, почта, другой контакт,
статус соискателя, Направление специальности, уровень кандидата, опыт работы и обо мне(может быть только одно значение)

## 3. Стек технологий проекта <a id=3></a>
[![Django](https://img.shields.io/badge/Django-4.2.1-6495ED)](https://www.djangoproject.com) [![Djangorestframework](https://img.shields.io/badge/djangorestframework-3.14.0-6495ED)](https://www.django-rest-framework.org/) [![Django Authentication with Djoser](https://img.shields.io/badge/Django_Authentication_with_Djoser-2.2.0-6495ED)](https://djoser.readthedocs.io/en/latest/getting_started.html) [![Nginx](https://img.shields.io/badge/Nginx-1.21.3-green)](https://nginx.org/ru/) [![React](https://img.shields.io/badge/React-18.2.0-blue)](https://react.dev/) [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)](https://www.postgresql.org/) [![YandexCloud](https://img.shields.io/badge/yandex-cloud-5282FF?logo=yandexcloud)](https://www.cloud.yandex.com/)

- Веб-сервер: nginx (контейнер nginx)  
- Frontend фреймворк: React.js (контейнер frontend)  
- Backend фреймворк: Django (контейнер backend)  
- API фреймворк: Django REST (контейнер backend)  
- База данных: PostgreSQL (контейнер db)

Веб-сервер nginx перенаправляет запросы клиентов к контейнерам frontend и backend, либо к хранилищам (volume) статики и файлов.  
Контейнер nginx взаимодействует с контейнером backend через gunicorn.  
Контейнер frontend взаимодействует с контейнером backend посредством API-запросов и передачи информации на фронтенд.


## 3. Запуск проекта в Docker контейнерах с помощью Docker Compose <a id=3></a>

Склонируйте проект из репозитория:
```bash
git git@github.com:DPavlen/Hackathon_team_8.git
```
Перейдите в директорию проекта Hackathon_team_8:
```bash
cd Hackathon_team_8/
```
Создайте файл .env для PostgreSQL в корне проекта и контейнера backend, впишите в него переменные для инициализации БД и связи с ней. Затем добавьте строки, содержащиеся в файле .env.example и подставьте свои значения.
Пример из файла с расширением .env:
```bash
# Мы используем СУБД PostgreSQL, необходимо заполнить следующие константы.
POSTGRES_USER=your_django_user
POSTGRES_PASSWORD=your_password
POSTGRES_DB=db_name
# Добавляем переменные для Django-проекта:
DB_HOST=db
DB_PORT=port_for_db  # Default is 5432
# Настройки настройки переменных settings
SECRET_KEY=DJANGO_SECRET_KEY  # Your django secret key 'django-insecure......'
DEBUG=True # Set to True if you do need Debug.
ALLOWED_HOSTS=127.0.0.1 # localhost by default if DEBUG=False
```
Запустите Docker Compose с этой конфигурацией на своём компьютере. Название файла конфигурации надо указать явным образом, ведь оно отличается от дефолтного. Имя файла указывается после ключа -f:
```bash
docker compose -f docker-compose.production.yml up
```
Команда описанная выше, сбилдит Docker образы и запустит backend, frontend, СУБД и Nginx в отдельных Docker контей.
Выполните миграции в контейнере с backend и необходимо собрать статику backend'a, поочередно выполните 2 команды:
```bash
sudo docker compose -f docker-compose.yml exec backend python manage.py migrate
sudo docker compose -f docker-compose.yml exec backend python manage.py collectstatic
```
Создать суперюзера (Администратора):
```bash
sudo docker compose -f docker-compose.production.yml exec backend python manage.py createsuperuser
```

Переместите собранную статику в volume(Данные можно сохранить отдельно от контейнера: для этого придумали Docker volume), 
созданный Docker Compose для хранения статики:
```bash
sudo docker compose -f docker-compose.yml exec backend cp -r /app/collected_static/. /static/static/
```
По завершении всех операции проект будет запущен и доступен по адресу:
```bash
http://127.0.0.1/
```
Останавливает все сервисы, связанные с определённой конфигурацией Docker Compose. 
Для остановки Docker контейнеров выполните следующую команду в корне проекта:
```bash
sudo docker compose -f docker-compose.yml down
```

## 4. Ссылка на развернутый проектe <a id=4></a>
Ссылка на развернутый проектe http://84.201.133.88:8000/ или http://infinity-team.ddns.net/


## 5. Автор проекта: <a id=5></a> 
**Павленко Дмитрий**
- Ссылка на мой профиль в GitHub [Dmitry Pavlenko](https://github.com/DPavlen)  

**Бобков Константин**
- Ссылка на мой профиль в GitHub [Konstantin Bobkov](https://github.com/deltabobkov)
