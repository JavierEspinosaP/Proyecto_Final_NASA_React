Puede visitarse en 👉  https://sleepy-retreat-77024.herokuapp.com/ (Parece que en Microsoft Edge, y puede que en otros browsers que desconozco, ciertas partes de la página no se ajustan correctamente, estoy trabajando en ello)

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

La vista NEAS, proporciona información sobre la otra colección de la base de datos, con las mismas funcionalidades que Landings.

Podemos loguearnos para acceder a funcionalidades como la "pasarela de pago" ficticia, desarrollada con Redux, con la que podemos añadir al carrito landings o NEAS, y pagarlos con Paypal. Está disponible el registro con mail y contraseña y también con Google. 

![carrito](https://user-images.githubusercontent.com/103537170/217319514-45889a6c-e1aa-4f68-bab9-704391f02b6b.jpg)

Para la recuperación de contraseña he utilizado Nodemailer, en caso de que pidas la recuperación, se te pedirá el correo y se te enviará una contraseña temporal para que puedas acceder a tu cuenta. En desarrollo se encuentra la funcionalidad para poder restablecer una contraseña que nosotros decidamos.

Por último, y a modo de "Easter Egg", es posible entrar en una vista "oculta" en la que podremos jugar a un juego de la misma temática, desarrollado con la librería Phaser 3, en la que controlaremos una nave y tendremos por objetivo evitar que los asteroides caigan en la tierra (el juego aún se encuentra en version desarrollo y para reiniciar la partida es necesario recargar la página). Para ello se deberá hacer clic en el icono de la NASA 10 veces antes de 3 segundos.

![game](https://user-images.githubusercontent.com/103537170/217319584-4ed252b8-ec8f-4b3d-af35-6d94e5e4f4fe.jpg)

