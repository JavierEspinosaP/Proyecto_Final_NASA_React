import React, { useContext } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import { landingsContext } from '../../../context/landingsContext'



const Landings = () => {

  const { landingsData, setLandingsData } = useContext(landingsContext)

  const icono = new L.Icon({
    iconUrl: require('../../../assets/asteroid.png'),
    iconAnchor: null,
    popupAnchor: [0, -10],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(15, 15)
  });


  return <div className="landings">

    <h1>Mapa de impactos de meteoritos</h1>
    <section className="infoMap">
    <section className="infoLandings">
      <p>
        Un meteorito es un meteoroide que alcanza la superficie de un planeta debido a que no se desintegra por completo en la atmósfera.
      </p>
      <p>
        Los meteoritos cuya caída se produce delante de testigos o que se logran recuperar instantes después de ser observados durante su tránsito en la atmósfera son llamados «caídas» (landings).
        El resto de los meteoritos se conocen como hallazgos. A la fecha (mediados de 2020),
        existen aproximadamente 1050 caídas atestiguadas que produjeron especímenes en las diversas colecciones del mundo. En contraste, existen más de 31.000 hallazgos de meteoritos bien documentados.

        Los meteoritos se nombran siempre como el lugar en donde fueron encontrados, generalmente una ciudad próxima o alguna característica geográfica. En los casos donde muchos meteoritos son encontrados en un mismo lugar, el nombre puede ser seguido por un número o una letra (ejemplo: Allan Hills 84001 o Dimmitt).
      </p>
      </section>
      <MapContainer center={[31.505, -0.09]} zoom={3} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {landingsData.map((data, i) =>
          data.geolocation && data.reclat && data.reclong ? (
            <Marker
              key={i}
              position={[data.geolocation.latitude, data.geolocation.longitude]}
              icon={icono}
            >
              <Popup>Detalles:
                <ul>
                  <li>Nombre: {data.name}</li>
                  <li>ID: {data.id}</li>
                  <li>Clase: {data.recclass}</li>
                  <li>Masa: {data.mass} kg</li>
                  <li>Fecha: {data.year.slice(0, 10)}</li>
                  <li>Latitud: {data.reclat}</li>
                  <li>Longitud: {data.reclong}</li>
                </ul>
              </Popup>
            </Marker>
          ) : null)}
      </MapContainer>
    </section>

  </div>;
}


export default Landings;
