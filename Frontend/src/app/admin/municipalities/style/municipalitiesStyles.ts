import { createStyles, css } from "antd-style";

export const useStyles = createStyles({
    container: css`
        max-width: 1400px;
        margin: 0 auto;
        padding: 24px;
    `,

    header: css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;

        @media (max-width: 768px) {
            flex-direction: column;
            align-items: stretch;
        }
    `,

    searchBar: css`
        width: 300px;
        @media (max-width: 768px) {
            width: 100%;
            margin-bottom: 8px;
        }
    `,

    addButton: css`
        background-color: #f3f4f6 !important;
        color: #6b7280 !important;
        border-color: #e5e7eb !important;

        &:hover {
            background-color: #e5e7eb !important;
            color: #374151 !important;
        }

        @media (max-width: 768px) {
            width: 100%;
        }
    `,
    modalForm: css`
        margin-top: 24px;
    `,
});