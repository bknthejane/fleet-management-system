import { createStyles, css } from "antd-style";

export const useStyles = createStyles({
  table: css`
    background: white;
    border-radius: 12px;
    padding: 16px;

    .ant-table-thead > tr > th {
      background-color: #f5f7fa !important;
      font-weight: 600;
    }
  `,
});
