# boil

Fucking awesome superb boilerplate

### Available env variables

NODE_ENV='production'|'development' or fuck it
PORT=number
HOST=string

### How Start HTTPS server

Для запуска https сервера необходимо установить значение
https: true

Сгенерированные сертификаты положить в корень сайта cert/server.key cert/server.crt.

Далее необходимо установить в систему эти сертификаты и пометить их как Always trusted.
Для Window дополнительно необходимо включить в chrome флаг chrome://flags/#unsafely-treat-insecure-origin-as-secure
