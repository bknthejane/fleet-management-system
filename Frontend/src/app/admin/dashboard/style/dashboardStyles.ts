import { createStyles, css } from "antd-style";

export const useStyles = createStyles({
  container: css`
    max-width: 1400px;
    margin: 0 auto;
    padding: 24px;
    position: relative;
  `,

  headerSection: css`
    margin-bottom: 24px;
  `,

  mainTitle: css`
    color: #1a202c !important;
    font-size: 32px !important;
    font-weight: 600 !important;
    margin-bottom: 8px !important;
  `,

  subtitle: css`
    color: #6b7280 !important;
    font-size: 16px !important;
  `,

  folderGrid: css`
    margin-top: 0;
  `,

  folderCard: css`
    border-radius: 12px !important;
    border: 1px solid #e5e7eb !important;
    box-shadow: none;
    transition: all 0.3s ease;
    height: 100%;
    position: relative;
    padding: 24px;
    cursor: pointer;

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08) !important;
      transform: translateY(-2px);
    }
    
    .ant-card-body {
      padding: 0 !important;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  `,

  cardContent: css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  `,

  folderIcon: css`
    width: 50px;
    height: 50px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 24px;
    margin-bottom: 16px;
  `,

  folderInfo: css`
    flex: 1;
  `,

  folderTitle: css`
    color: #1a202c !important;
    font-size: 18px !important;
    font-weight: 600 !important;
    margin-bottom: 4px !important;
  `,

  folderSubtitle: css`
    color: #6b7280 !important;
    font-size: 14px !important;
  `,

  moreButton: css`
    position: absolute;
    top: 10px;
    right: 10px;
    color: #6b7280 !important; // Changed to a gray color
    &:hover {
      color: #374151 !important; // Darker gray on hover
    }
  `,

  paginationContainer: css`
    text-align: center;
    margin-top: 30px;
  `,

  fabButton: css`
    position: fixed;
    bottom: 40px;
    right: 40px;
    height: 56px;
    width: 56px;
    font-size: 24px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    background-color: #f3f4f6 !important;
    border-color: #e5e7eb !important;
    color: #6b7280 !important; // Changed to a gray color
  `,
});