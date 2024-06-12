import React from 'react'
import { StyledLogoWrapper } from './LogoWrapper.styled'
import ImageCarousel  from '../../Utils/ImageCarousel/ImageCarousel';
function LogoWrapper(){
    return(
        <StyledLogoWrapper>
            <ImageCarousel 
            isSlidable={false}
            imageList={["./assets/images/dibujos_lapiz_guino.svg", "./assets/images/dibujos_nina_curiosa.svg", "./assets/images/dibujos_lapiz_feliz.svg"]}
            />
        </StyledLogoWrapper>
    )
}

export default LogoWrapper;