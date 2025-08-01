import { createStyles, css } from "antd-style";

export const useStyles = createStyles({
  container: css`
    max-width: 1200px;
    margin: 0 auto;
  `,

  headerSection: css`
    margin-bottom: 32px;
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
    margin-bottom: 32px;
  `,

  addFolderCard: css`
    height: 200px;
    border: 2px dashed #d1d5db !important;
    background: transparent !important;
    
    .ant-card-body {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px !important;
    }
  `,

  addFolderContent: css`
    text-align: center;
  `,

  addButton: css`
    border: none !important;
    color: #6b7280 !important;
    font-size: 16px !important;
    height: auto !important;
    padding: 12px 24px !important;
    
    &:hover {
      color: #374151 !important;
      background: #f9fafb !important;
    }
  `,

  folderCard: css`
    height: 200px;
    border-radius: 16px !important;
    border: 1px solid #e5e7eb !important;
    transition: all 0.3s ease;
    
    &:hover {
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1) !important;
      transform: translateY(-2px);
    }
    
    .ant-card-body {
      padding: 24px !important;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  `,

  folderHeader: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  `,

  folderId: css`
    background: #f3f4f6;
    color: #6b7280;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
  `,

  moreButton: css`
    color: #9ca3af !important;
    
    &:hover {
      color: #6b7280 !important;
      background: #f9fafb !important;
    }
  `,

  folderIcon: css`
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 20px;
    font-weight: 600;
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

  statsSection: css`
    margin-top: 32px;
  `,

  storageCard: css`
    border-radius: 16px !important;
    border: 1px solid #e5e7eb !important;
    
    .ant-card-body {
      padding: 24px !important;
    }
  `,

  recentCard: css`
    border-radius: 16px !important;
    border: 1px solid #e5e7eb !important;
    
    .ant-card-body {
      padding: 24px !important;
    }
  `,

  cardHeader: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    
    h4 {
      color: #1a202c !important;
      font-size: 18px !important;
      font-weight: 600 !important;
      margin: 0 !important;
    }
  `,

  storageChart: css`
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
  `,

  storageStats: css`
    .ant-row {
      gap: 16px;
    }
  `,

  statItem: css`
    display: flex;
    align-items: center;
    gap: 8px;
  `,

  statDot: css`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  `,

  statLabel: css`
    color: #6b7280 !important;
    font-size: 12px !important;
    display: block;
  `,

  statValue: css`
    color: #1a202c;
    font-size: 14px;
    font-weight: 600;
    margin-top: 2px;
  `,

  fileItem: css`
    border: none !important;
    padding: 12px 0 !important;
    
    &:not(:last-child) {
      border-bottom: 1px solid #f3f4f6 !important;
    }
  `,

  fileInfo: css`
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
  `,

  fileIcon: css`
    width: 40px;
    height: 40px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 16px;
  `,

  fileDetails: css`
    flex: 1;
    min-width: 0;
  `,

  fileName: css`
    color: #1a202c !important;
    font-size: 14px !important;
    font-weight: 500 !important;
    display: block;
    margin-bottom: 4px;
  `,

  fileAvatars: css`
    display: flex;
    align-items: center;
    gap: 8px;
  `,

  extraCount: css`
    color: #6b7280 !important;
    font-size: 12px !important;
  `,

  fileDate: css`
    color: #9ca3af !important;
    font-size: 12px !important;
  `,
});