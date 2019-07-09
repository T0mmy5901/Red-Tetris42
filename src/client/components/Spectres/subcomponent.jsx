import React from "react";
import PropTypes from "prop-types";
import BoardSub from "../Board/subcomponent";
import { StyledContainer } from "./styles";

const SpectreSub = ({ spectres }) => {
  return (
    <StyledContainer>
      {spectres.map((spectre, index) => (
        <BoardSub key={index} board={spectre.board} isSpectre={true} />
      ))}
    </StyledContainer>
  );
};

SpectreSub.propTypes = {
  spectres: PropTypes.array.isRequired
};

export default SpectreSub;
