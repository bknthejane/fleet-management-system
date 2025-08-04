import { createStyles, css } from "antd-style";

export const useStyles = createStyles({
  dashboardCard: css`
    text-align: center;
    padding: 24px;
    border-radius: 12px !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: 0.3s;
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  `,
  table: css`
    background: white;
    border-radius: 8px;
    padding: 16px;
  `,
});
