import React from 'react'
import { StyledInfoBox } from './InfoBox.styled';

function InfoBox({ img, title, text}){
    return(
        <StyledInfoBox>
            <div>
                {img}
            </div>
            <div>
                <h3>{ title }</h3>
                <p>{ text }</p>
            </div>
        </StyledInfoBox>
    );
}

export default InfoBox;