import styled from "styled-components";

export const TableContainer = styled.section`
  div.month {
    margin-bottom: 5vh;
  }

  table {
    width: 100%;
    border-spacing: 0 8px;

    tbody {
      margin-left: 10vw;
    }

    th {
      color: #969cb3;
      font-weight: normal;
      padding: 10px 16px;
      text-align: left;
      font-size: 16px;
      line-height: 24px;
    }

    td {
      padding: 10px 16px;
      border: 0;
      background: #fff;
      font-size: 16px;
      font-weight: normal;
      color: #969cb3;

      &.title {
        color: #363f5f;
      }

      &.income {
        color: #12a454;
      }

      &.outcome {
        color: #e83f5b;
      }

      &.time {
        width: 22vw;
      }
    }

    td:first-child {
      border-radius: 8px 0 0 8px;
    }

    td:last-child {
      border-radius: 0 8px 8px 0;
    }

    a {
      text-decoration: none;
      font-size: 16px;
      transition: opacity 0.2s;
      cursor: pointer;

      & + a {
        margin-left: 32px;
      }

      &:hover {
        opacity: 0.6;
      }
    }
  }
`;
