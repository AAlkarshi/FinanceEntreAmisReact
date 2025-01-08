import { useEffect, useState } from 'react';

function Compteur() {
    const [compte, setcompte] = useState(0);

    useEffect(function() {
        var timer = setInterval(function() {
            setcompte(compte+1);
            console.log("compte =" , compte);
        } , 1000);
    
    
    return function() {
        clearInterval(timer);
    }
});


    return (
        <>
            Le compteur vaut : {compte}
        </>
    )
}

export default Compteur;


