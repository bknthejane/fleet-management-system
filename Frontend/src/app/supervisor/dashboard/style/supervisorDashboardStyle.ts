import { createStyles, css } from "antd-style";

export const useStyles = createStyles({
  dashboardCard: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px;
    text-align: center;
    background: white !important;
    border-radius: 12px !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: all 0.3s;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
    }
  `,
});
