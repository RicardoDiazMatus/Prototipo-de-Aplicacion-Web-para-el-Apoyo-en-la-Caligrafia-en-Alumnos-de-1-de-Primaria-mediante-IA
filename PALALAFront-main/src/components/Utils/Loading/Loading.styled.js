import { motion } from "framer-motion";
import { styled } from "styled-components";

export const StyledLoading = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.backgroundcolor};
  border-radius: 3rem;
  width: 100%;
  height: 100%;
  lord-icon {
    width: ${(props) => props.iconwidth};
    height: ${(props) => props.iconheight};
  }
  .loading-file-info {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    font-weight: bold;
    color: ${(props) => props.firstcolor};
  }
`;
