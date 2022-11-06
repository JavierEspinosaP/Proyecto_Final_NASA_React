Puede visitarse en 👉  https://sleepy-retreat-77024.herokuapp.com/

En este proyecto se requería montar una web con el stack MERN completo, base de datos en MongoDB, utilizando su cloud Atlas, servidor configurado con Express y
un front end desarrollado en ReactJS, además de dar estilos con SASS.

La web se divide en cuatro vistas:

- La primera, Home, consume datos de la API de la NASA, proporcionando una imagen y una descripción que se actualiza diariamente.

![Home nuevo](https://user-images.githubusercontent.com/103537170/200192740-1a7fe33e-3fe7-4cda-bf27-36a700858103.png)

- La vista "Mapa" posiciona con coordenadas los avistamientos de meteoritos en todo el mundo desde que se tienen registros, pudiendo seleccionar cada uno para mostrar sus detalles. Estos datos se consumen de la base de datos en MongoDB. Para mostrar el mapa se utilizó la librería libre "Leaflet" y se optó por un tema "modo noche" más acorde a los colores de la web.

![mapa](https://user-images.githubusercontent.com/103537170/200192753-6ae11379-82d1-407a-abf4-b4ed5b65747d.png)

- En la vista de "Landings" se pueden consultar de la base de datos todos los detalles de los meteoritos, sus coordenadas, masa, etc...
Las imagenes que acompañan cada tarjeta han sido generadas por una IA (Stable Diffusion), hay un total de 100 imágenes distintas, colocadas aleatoriamente entre los distintos documentos.

![Landings](https://user-images.githubusercontent.com/103537170/200192805-854095e4-bc7a-4241-b804-19cbf43c957c.png)

En esta pantalla se ofrece la posibilidad de ordenar la información por nombre, fecha o peso, así como buscar un objeto en concreto por su nombre, lo que arrojará un modal con sus características.

![search](https://user-images.githubusercontent.com/103537170/200192815-410841b3-3a60-412f-b763-f10ea27c3ff8.png)

Por último, la vista NEAS, proporciona información sobre la otra colección de la base de datos, con las mismas funcionalidades que Landings.

En proceso de desarrollo, se encuentra una nueva funcionalidad, que proporcionará al usuario la posibilidad de "comprar documentos", con un carrito de compra y una pasarela de pago ficticia.

Con este proyecto he afianzado conocimientos sobre unir un backend desarrollado con NodeJS y Express y un frontend desarrollado en React, repasado el consumo de API's externas así como SASS para los estilos, la utilización de librerias como Material UI, hooks (paginación), useContext y Leaflet con React.
