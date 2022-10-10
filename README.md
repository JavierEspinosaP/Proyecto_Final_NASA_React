En este proyecto se requería montar una web con el stack MERN completo, base de datos en MongoDB, utilizando su cloud Atlas, servidor configurado con Express y
un front end desarrollado en ReactJS, además de dar estilos con SASS.

La web se divide en cuatro vistas:

- La primera, Home, consume datos de la API de la NASA, proporcionando una imagen y una descripción que se actualiza diariamente.

![Home](https://user-images.githubusercontent.com/103537170/194782828-08cea40d-4b2d-42f3-929f-1ca8c0f85d93.png)

- La pestaña Landings proporciona acceso a una vista "Mapa", que posiciona con coordenadas los avistamientos de meteoritos en todo el mundo desde que se tienen registros, pudiendo seleccionar cada uno para mostrar sus detalles. Estos datos se consumen de la base de datos en MongoDB. Para mostrar el mapa se utilizó la librería libre "Leaflet" y se optó por un tema "modo noche" más acorde a los colores de la web.

![Map](https://user-images.githubusercontent.com/103537170/194782954-1919d561-44f0-4bcc-b60e-1fe3cfa649e5.png)

- En la vista "Lista" de Landings se pueden consultar de la base de datos todos los detalles de los meteoritos, sus coordenadas, masa, etc...
Las imagenes que acompañan cada tarjeta han sido generadas por una IA (Stable Diffusion), hay un total de 100 imágenes distintas, colocadas aleatoriamente entre los distintos documentos.

![Landings](https://user-images.githubusercontent.com/103537170/194783074-fac21313-fe80-4e4d-b736-fbe0c6e9a741.png)

En esta pantalla se ofrece la posibilidad de ordenar la información por nombre, fecha o peso, así como buscar un objeto en concreto por su nombre, lo que arrojará un modal con sus características.

![search](https://user-images.githubusercontent.com/103537170/194783122-8e1dcca7-90d5-48e0-9091-e3b3ccf49d53.png)

Por último, la vista NEAS, proporciona información sobre la otra colección de la base de datos, con las mismas funcionalidades que Landings.

En proceso de desarrollo, se encuentra una nueva funcionalidad, que proporcionará al usuario la posibilidad de "comprar documentos", con un carrito de compra y una pasarela de pago ficticia.

Con este proyecto he afianzado conocimientos sobre unir un backend desarrollado con NodeJS y Express y un frontend desarrollado en React, repasado el consumo de API's externas así como SASS para los estilos, la utilización de librerias como Material UI, hooks (paginación), useContext y Leaflet con React.
