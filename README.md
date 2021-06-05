# movies-explorer-api

### *API приложения по поиску фильмов и сохранения списка в личном кабинете пользователя*
***

## **Описание запросов:**
#

 ### **POST /signup**
 - ### *создаёт пользователя с переданными в теле*
 - ### *email, password и name*

 ### **POST /signin**
 - ### *проверяет переданные в теле почту и пароль*
 - ### *и возвращает JWT*

 ### **GET /users/me**
 - ### *возвращает информацию о пользователе (email и имя)*

 ### **PATCH /users/me**
 - ### *обновляет информацию о пользователе (email и имя)*
#
 ### **GET /movies**
 - ### *возвращает все сохранённые пользователем фильмы*

 ### **POST /movies**
 - ### *создаёт фильм с переданными в теле*
 - ### *country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId*

 ### **DELETE /movies/movieId**
 - ### *удаляет сохранённый фильм по id*
 

#
## **Описание команд:**
### **npm run ... :**
* **start** - продакшн-режим
* **dev** - режим разработки с хот-релоадом
#
## **Адрес API:**
* ### [https://api.diplomayp.nomoredomains.club/](https://api.diplomayp.nomoredomains.club/)
