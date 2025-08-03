import { createStyles, css } from "antd-style";

export const useStyles = createStyles({
  welcomeCard: css`
    background: linear-gradient(135deg, #4a90e2, #50c878);
    color: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);

    .ant-typography {
      color: white !important;
    }
  `,

  dashboardCard: css`
    text-align: center;
    padding: 24px 16px;
    border-radius: 12px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
    }
  `,

  infoCard: css`
    border-radius: 12px;
    background: #f9fafb;
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  `,
});
