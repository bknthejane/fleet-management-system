import { createStyles, css } from "antd-style";

export const useStyles = createStyles({
    pageHeader: css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 16px;
        margin-bottom: 24px;
        background: #1f2937;
        color: white;
        padding: 24px;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

        @media (max-width: 768px) {
            flex-direction: column;
            align-items: flex-start;
        }
    `,

    pageTitle: css`
        margin: 0 !important;
        font-weight: 600 !important;
        color: white !important;
    `,

    tableCard: css`
        border-radius: 12px;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
        border: 1px solid #e0e0e0;

        .ant-table-wrapper {
            border-radius: 12px;
            overflow: hidden;
        }
    `,

    headerControls: css`
        display: flex;
        align-items: center;
        gap: 16px;

        @media (max-width: 768px) {
            width: 100%;
            flex-direction: column;
            align-items: flex-start;
        }
    `,

    searchBar: css`
        width: 300px;

        @media (max-width: 768px) {
            width: 100%;
        }
    `,

    addButton: css`
        background-color: #374151 !important;
        border-color: #374151 !important;
        color: white !important;

        &:hover {
            background-color: #4b5563 !important;
            border-color: #4b5563 !important;
        }

        @media (max-width: 768px) {
            width: 100%;
        }
    `,

    tableActionButton: css`
        color: #1f2937 !important;

        &:hover {
            color: #4b5563 !important;
        }
    `,

    viewButton: css`
        color: #1f2937 !important;
        &:hover {
            color: #4b5563 !important;
        }
    `,
});