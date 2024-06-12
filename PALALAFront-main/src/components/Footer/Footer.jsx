import React from 'react'
import { StyledFooter } from './Footer.styled';
import { Link } from 'react-router-dom';

function Footer(){
    return(
        <StyledFooter>
            <h2>PALALA</h2>
            <div>
                <h3>Compañía</h3>
                <Link to='/AboutUs'>Sobre Nosotros</Link>
                <Link to='/Contact'>Contáctanos</Link>
                <Link onClick={() => window.open("./assets/docs/manual.pdf", "_blank")}>¿Necesitas Ayuda?</Link>
            </div>
            <div>
                <h3>Legal</h3>
                <Link to='./assets/docs/aviso_de_privacidad.pdf' target='_blank'>Política de Privacidad</Link>
                <Link to='./assets/docs/terminos_y_condiciones.pdf' target='_blank'>Términos de Servicio</Link>                
            </div>
            <div>
                <h2>@ 2023 PALALA</h2>
            </div>
        </StyledFooter>
    );
}

export default Footer;