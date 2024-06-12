import { styled } from "styled-components";

export const StyledGroupProfessorSettings = styled.div`
  width: 90%;
  margin: 0 auto;

  .settings-professor-container {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
  }

  .element-professor-container {
    margin-bottom: 2rem;
  }

  .group-container {
    > div {
      margin-top: 2rem;
    }
  }

  .table-options {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
    padding: 2rem;
    background-color: #ffffff;
    -webkit-box-shadow: 0px 0px 12px -4px rgba(0, 0, 0, 0.5);
    -moz-box-shadow: 0px 0px 12px -4px rgba(0, 0, 0, 0.5);
    box-shadow: 0px 0px 12px -4px rgba(0, 0, 0, 0.5);
    border-radius: 1rem;

    .group-table-input {
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

    .group-table-select {
      z-index: 2;
    }

    > div {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
    }
  }

  .group-table {
    //max-height: 50vh;
    //overflow-y: scroll;
    //overflow-x: hidden;
    background-color: #ffffff;
    border-radius: 1rem;
    padding: 2rem;
    height: 50rem;
    -webkit-box-shadow: 0px 0px 12px -4px rgba(0, 0, 0, 0.5);
    -moz-box-shadow: 0px 0px 12px -4px rgba(0, 0, 0, 0.5);
    box-shadow: 0px 0px 12px -4px rgba(0, 0, 0, 0.5);
    .group-table-expanded {
      background-color: #ffffff;
      box-shadow: inset 0px 5px 10px -5px rgba(0, 0, 0, 0.5);
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-column: 1 / 4;
      grid-row-gap: 4rem;

      .group-table-expanded-buttons {
        grid-column: 1 / 3;
        div {
          display: flex;
          justify-content: space-around;
          width: 100%;
        }
      }

      > div {
      }

      p {
        font-weight: bold;
        font-size: 1.2rem;
      }
      span {
        font-weight: normal;
        font-size: 1.2rem;
        display: inline-block;
        width: 11rem;
        border-bottom: 0.3rem solid #fe5d41;
      }
    }
  }

  .student-container {
    width: 100%;
  }

  .student-container {
    > div {
      margin-top: 2rem;
    }
  }

  .student-table {
    background-color: #ffffff;
    border-radius: 1rem;
    padding: 2rem;
    height: 50rem;
    -webkit-box-shadow: 0px 0px 12px -4px rgba(0, 0, 0, 0.5);
    -moz-box-shadow: 0px 0px 12px -4px rgba(0, 0, 0, 0.5);
    box-shadow: 0px 0px 12px -4px rgba(0, 0, 0, 0.5);
  }

  @media (min-width: 768px) {
    .table-options {
      display: grid;
      grid-gap: 10rem;
      &.student-table {
        grid-template-columns: repeat(1, 1fr);
        overflow: hidden;
      }

      &.group-table {
        grid-template-columns: repeat(2, 1fr);
        overflow: hidden;
      }
    }

    .student-table {
      height: 65vh;
    }

    .group-table {
      height: 65vh;
    }
    .settings-professor-container {
      flex-direction: row;
      justify-content: space-between;
    }

    .element-professor-container {
      width: 100%;
      margin-right: 2rem;
      &.student-element {
        width: 50%;
        margin-left: 2rem;
        margin-right: 0;
      }
    }
  }

  @media (min-width: 768px) {
    .table-options {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

export const THEME = {
  Table: ``,
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
