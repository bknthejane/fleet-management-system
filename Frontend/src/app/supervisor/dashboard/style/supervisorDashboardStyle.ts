import { createStyles, css } from "antd-style";

export const useStyles = createStyles({

  welcomeCard: css`
        background: linear-gradient(135deg, #374151, #1f2937);
        color: white;
        border: none;
        border-radius: 16px;
        padding: 32px 24px;
        text-align: center;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

        .ant-typography {
            color: #ffffff !important;
        }
    `,

    secondaryText: css`
        color: #9ca3af;
    `,
    cardText: css`
        font-size: 24px;
        font-weight: 600;
        color: #1f2937;
    `,

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
