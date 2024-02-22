## Arquitectura

El proyecto "game-quest-booking" se basa en el framework Next.js junto con typescript, elegido estratégicamente para potenciar el SEO y acelerar la carga de la página, incluyendo la optimización de imágenes y fuentes para una experiencia de usuario óptima.

La mayoría de los componentes fueron desarrollados personalmente con Tailwind CSS, permitiendo un control preciso del diseño y funcionalidad. Esta elección se traduce en una adaptabilidad ágil a diversos casos y la capacidad de realizar mejoras con facilidad.

El estado global del sitio se gestiona principalmente mediante Redux Toolkit, respaldando funciones críticas como la información de usuarios, autenticación, actualización en tiempo real de cupos con pusher y cambios de estado de reservas, especialmente en casos de cancelación. Además, se hace uso estratégico de Context en ciertas secciones del proyecto para una mayor flexibilidad.

La comunicación efectiva con el backend se logra a través de una API REST mediante Fetch, considerando la baja compatibilidad de Next.js con Axios en el lado del servidor.

En complemento, se ha implementado un pequeño backend dentro de la API de Next. Este backend gestiona las cookies para almacenar y verificar los tokens de autenticación, proporcionando una capa adicional de seguridad que protege las rutas mediante el middleware de Next.

## Instalacion

#### Paso 1

Clonar el proyecto

```
$ git clone https://github.com/Dante05S/game-quest-booking.git
```

#### Paso 2

Normalmente las `.env` estan ocultas y no se suben al respositorio, pero en esta ocación las deje con acceso publico para facilitar la configuración del entorno

#### Paso 3

Instalar dependencias

```
$ npm install
```

#### Paso 4

Levantar el servidor

```
$ npm run dev
```

#### Paso 5

[Probar instalacion](http://localhost:3000)

<blockquote>
<span>
💡
</span>
<span>
Si tienes algun problema al momento de realizar uno de estos pasos, no dudes en mencionarmelo.
</span>
</blockquote>

## Pantallazos

### GameQuestBookingCore

<img width="1000" height="600" src="/public/1.png">
<br/>

### GameQuestBooking

<img width="1000" height="600" src="/public/2.png">
<br/>

### HomePage

<img width="1000" height="600" src="/public/3.png">
<br/>

### Visualización de eventos

<img width="1000" height="600" src="/public/4.png">
<br/>

### Login

<img width="1000" height="600" src="/public/5.png">
<br/>

### Verificación de correo

<img width="1000" height="600" src="/public/6.png">
<br/>

### Codigo Correo

<img width="1000" height="600" src="/public/8.png">
<br/>

### Registro

<img width="1000" height="600" src="/public/7.png">
<br/>

### Reserva de lugares

<img width="1000" height="600" src="/public/9.png">
<br/>

### Cancelar reservas

<img width="1000" height="600" src="/public/10.png">
<br/>
<img width="1000" height="600" src="/public/11.png">
<br/>

### Comentarios y Calificaciones

<img width="1000" height="600" src="/public/12.png">
<br/>
<img width="1000" height="600" src="/public/13.png">
<br/>
<img width="1000" height="600" src="/public/14.png">
