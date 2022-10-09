import { useState, useEffect } from 'react';
import axios from 'axios'

// useFetch será una función que reciba como parámetro un string con una url

const useFetch = (url) => {
    // Crearemos dos estados: loading(true) y result([]), que devolveremos en un objeto
    const [loading, setLoading] = useState(true)
    const [result, setResult] = useState([])

    // Añadiremos un useEffect que se ejecutará cuando la url cambie y hará un fetch a dicha url
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(url)

                setTimeout(() => {
                    setResult(response.data)
                    setLoading(false)                    
                }, 800);

            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [url]);

    return { loading, result }
}

// Haremos un export default de la función para importarla como hook en el componente deseado
export default useFetch;