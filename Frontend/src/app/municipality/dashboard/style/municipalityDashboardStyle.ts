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

    dashboardCard: css`
        text-align: center;
        padding: 24px 16px;
        border-radius: 16px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        transition: all 0.3s ease;
        background-color: #ffffff;
        border: 1px solid rgba(255, 255, 255, 0.1);

        &:hover {
            transform: translateY(-8px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }

        .ant-card-body {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        @media (max-width: 576px) {
            margin-bottom: 16px;
        }
    `,

    infoCard: css`
        border-radius: 16px;
        background-color: #f5f7fa;
        padding: 16px;
        display: flex;
        align-items: center;
        gap: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        border: none;
    `,

    cardIcon: css`
        font-size: 48px;
        margin-bottom: 16px;
        color: #6b7280;
    `,

    cardTitle: css`
        margin-top: 0;
        margin-bottom: 8px !important;
        font-weight: 500;
        color: #374151;
    `,

    cardText: css`
        font-size: 24px;
        font-weight: 600;
        color: #1f2937;
    `,

    secondaryText: css`
        color: #9ca3af;
    `,
});