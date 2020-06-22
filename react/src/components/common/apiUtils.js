import {toast} from "react-toastify"

export function handleError ( error ) {
    // eslint-disable-next-line no-console
    toast.error( "Ooops ! Something went wrong back there ! " + error,
        {position: toast.POSITION.BOTTOM_RIGHT} )

    throw error
}
