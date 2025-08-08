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

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 576px) {
      padding: 16px;
    }
  `,

  fabButton: css`
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: #313132ff !important;
    color: white;
    box-shadow: 0 4px 12px rgba(24, 144, 255, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #29292aff;
    }

    @media (max-width: 576px) {
      bottom: 16px;
      right: 16px;
      width: 48px;
      height: 48px;
      font-size: 20px;
    }
  `,
});
