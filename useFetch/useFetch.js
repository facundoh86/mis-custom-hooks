import { useEffect, useRef, useState } from "react";


export const useFetch = ( url ) => {


    // La idea del isMounted es que se mantenga la referencia mientra este hook este vivo
    // o cuando el componente que lo usa sigue montado cuando se cambie el valor de mi isMounted no
    // quiero que se renderice nuevamente del componente, simplemente estoy manteniendo la referencia al valor
    const isMounted= useRef(true);
    const [ state, setstate ] = useState({ data: null, loading: true, error: null });

    // USEEFFECT relacionado al USEEREF (isMounted), se deja la dependencia vacia para que se renderice
    // solo una vez, este useeffect lo q hace es controlar el cambio del estado de ismounted.
    useEffect(() => {

        return  () => {

            // Este cambio no va a disparar nuevamente la rendereizacionn de mi componente
            // solo mantengo la referencia al mismo
            // se cambia a false cuando el hook useFetch deja de existir
            isMounted.current = false;
        }

    }, [])

    useEffect(() => {

        // Este setState sirve para que me aparezca el loading al momento de clickear en el
        // boton de siguiente quote
        setstate({data: null, loading: true, error: null});

        fetch(url)

        .then( resp => resp.json())

        .then( data => {

                // Aqui hago una condicion si el componenten isMounted(true) puedo llamarlo de manera segura
                // caso contrario no hago nada porque el componente va a estar desmontado
                if(isMounted.current){
                    setstate({
                        loading: false,
                        error: null,
                        data
                    })

                };
        })
        .catch((  ) => {
            setstate({
                data: null, loading: false, error: 'No se pudo cargar la info'
            })
        });
    },[ url ])

    return state;
}

