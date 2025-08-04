import { createStyles, css } from "antd-style";

export const useStyles = createStyles({
  dashboardCard: css`
    text-align: center;
    padding: 16px;
    border-radius: 12px !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

    .ant-typography {
      margin-bottom: 0 !important;
    }
  `,

  recentJobsCard: css`
    margin-top: 32px;
    border-radius: 12px !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  `,

  listItem: css`
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 15px;
  `,
});
