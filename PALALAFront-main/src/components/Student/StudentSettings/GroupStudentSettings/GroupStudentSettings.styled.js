import { styled } from "styled-components";

export const StyledGroupStudentSettings = styled.div`
  width: 100%;
  .group-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    .group-options {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      grid-gap: 3rem;
      padding: 2rem;
      border-radius: 1rem;
      background-color: #ffffff;
      -webkit-box-shadow: 0px 0px 12px -4px rgba(0, 0, 0, 0.5);
      -moz-box-shadow: 0px 0px 12px -4px rgba(0, 0, 0, 0.5);
      box-shadow: 0px 0px 12px -4px rgba(0, 0, 0, 0.5);
      > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        &:last-child{
          align-items: center;
        }
      }
      .group-input {
        width: 100%;
        appearance: none;
        height: 3.5rem;
        font-size: 1.2rem;
        border-style: none;
        border-radius: 0.5rem;
        box-shadow: inset 0px 0px 10px -5px rgba(0, 0, 0, 0.5);
        border: 0.1rem solid rgba(254, 93, 65, 1);
        &:focus {
          outline: #ffbe0a solid 0.1rem;
        }
      }
    }

    .group-table {
      background-color: #ffffff;
      border-radius: 1rem;
      padding: 2rem;
      height: 37rem;
      -webkit-box-shadow: 0px 0px 12px -4px rgba(0, 0, 0, 0.5);
      -moz-box-shadow: 0px 0px 12px -4px rgba(0, 0, 0, 0.5);
      box-shadow: 0px 0px 12px -4px rgba(0, 0, 0, 0.5);
    }
  }

  @media (min-width: 720px) {
    .group-container {
      .group-options {
        grid-template-columns: repeat(3, 1fr);
      }
      .group-table{
        height: 50rem;
      }
    }
  }
`;

export const THEME = {
  Table: `z-index: 0;`,
  Header: ``,
  Body: ``,
  BaseRow: `
    background-color: #FFFFFF;
    
    &.row-select-selected, &.row-select-single-selected {
      background-color: var(--theme-ui-colors-background-secondary);
      color: var(--theme-ui-colors-text);
    }
  `,
  HeaderRow: `
    font-size: 10px;
    color: #fe5d41;
    
    .th {
      border-bottom: #fe5d41 solid 0.1rem;
    }
  `,
  Row: `
    font-size: 12px;
    color: var(--theme-ui-colors-text);

    &:not(:last-of-type) .td {
      border-bottom: #fe5d41 solid 0.1rem;
    }

    &:hover {
      color: #fe5d41;
    }
  `,
  BaseCell: `
    border-bottom: 1px solid transparent;
    border-right: 1px solid transparent;

    padding: 8px;
    height: 52px;

    svg {
      fill: var(--theme-ui-colors-text);
    }
  `,
  HeaderCell: ``,
  Cell: ``,
};
