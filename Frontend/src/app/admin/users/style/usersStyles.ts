import { createStyles, css } from "antd-style";

export const useStyles = createStyles(() => ({
  container: css`
    padding: 24px;
    min-height: 100%;
    background-color: #f5f5f5;
  `,

  card: css`
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
    background-color: #ffffff;
  `,

  headerSection: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  `,

  title: css`
    margin: 0;
    font-weight: 600;
    color: #333333;
  `,

  addButton: css`
    border-radius: 6px;
    padding: 0 16px;
  `,

  table: css`
    border-radius: 12px;
    overflow: hidden;
    background-color: #ffffff;
  `,

  modalForm: css`
    margin-top: 8px;
  `,
}));
