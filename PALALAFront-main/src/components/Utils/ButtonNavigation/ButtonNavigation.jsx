import React from 'react'
import { StyledButtonNavigation } from './ButtonNavigation.styled';
import { Link } from 'react-router-dom';

function ButtonNavigation({label, href, styles}){
    return(
        <StyledButtonNavigation styles={styles} whileTap={{ scale: 0.9 }}>
            <Link className='navigation-link' to={href}>{label}</Link>
        </StyledButtonNavigation>
    );
}

export default ButtonNavigation;