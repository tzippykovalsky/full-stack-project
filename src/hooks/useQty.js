import { useState } from "react"



const useQty = () => {

    let [qty, setQty] = useState(1)

    const addQty = () => {
        if (qty < 10) {
            setQty(qty + 1)
        }
    }

    const removeQty = () => {
        if (qty > 1) {
            setQty(qty - 1)
        }
    }


    return { removeQty, addQty, qty }

}

export default useQty;