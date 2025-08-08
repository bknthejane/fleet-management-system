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

    @media (max-width: 576px) {
      padding: 24px 16px;
    }
  `,

  secondaryText: css`
    color: #9ca3af;
    font-size: 1rem;

    @media (max-width: 576px) {
      font-size: 0.875rem;
    }
  `,

  dashboardCard: css`
    text-align: center;
    padding: 24px;
    border-radius: 12px !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: 0.3s;
    border: 1px solid transparent;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 576px) {
      padding: 16px;
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
