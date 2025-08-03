import { createStyles, css } from "antd-style";

export const useStyles = createStyles({
  pageHeader: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  `,

  pageTitle: css`
    margin: 0 !important;
    font-weight: 600 !important;
  `,

  tableCard: css`
    border-radius: 12px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);

    .ant-table {
      border-radius: 12px;
    }
  `,
});
