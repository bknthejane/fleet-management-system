import { createStyles, css } from "antd-style";

export const useStyles = createStyles({
  layout: css`
    min-height: 100vh;
    background: linear-gradient(-45deg, #1f2937, #374151, #4b5563, #3f3f46) !important;
  `,

  sidebar: css`
    background: linear-gradient(-45deg, #1f2937, #374151, #4b5563, #3f3f46); !important;
    position: relative;
    
    .ant-layout-sider-children {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  `,

  sidebarHeader: css`
    padding: 24px 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  `,

  logoSection: css`
    margin-bottom: 24px;
  `,

  shareButton: css`
    .ant-btn {
      background: rgba(255, 255, 255, 0.1);
      border: none;
      color: white;
      border-radius: 20px;
      height: 36px;
      font-size: 14px;
      
      &:hover {
        background: rgba(255, 255, 255, 0.2);
        color: white;
      }
    }
  `,

  shareIcon: css`
    color: white !important;
  `,

  userProfile: css`
    display: flex;
    align-items: center;
    gap: 12px;
  `,

  avatar: css`
    border: 2px solid rgba(255, 255, 255, 0.2);
  `,

  userInfo: css`
    flex: 1;
    min-width: 0;
  `,

  userName: css`
    color: white !important;
    font-weight: 500;
    font-size: 16px;
    display: block;
    margin-bottom: 4px;
  `,

  menu: css`
    flex: 1;
    background: transparent !important;
    border: none !important;
    margin-top: 16px;
    
    .ant-menu-item,
    .ant-menu-submenu-title {
      color: rgba(255, 255, 255, 0.85) !important;
      margin: 4px 8px !important;
      border-radius: 8px !important;
      height: 40px !important;
      line-height: 40px !important;
      
      &:hover {
        background: rgba(255, 255, 255, 0.1) !important;
        color: white !important;
      }
      
      &.ant-menu-item-selected {
        background: rgba(255, 255, 255, 0.15) !important;
        color: white !important;
      }
    }
    
    .ant-menu-submenu-arrow {
      color: rgba(255, 255, 255, 0.65) !important;
    }
    
    .ant-menu-item-icon,
    .ant-menu-submenu-title .ant-menu-item-icon {
      color: rgba(255, 255, 255, 0.85) !important;
    }
  `,

  addFilesSection: css`
    padding: 16px;
    margin-top: auto;
  `,

  addFilesButton: css`
    background: #4a5568 !important;
    border: 1px dashed rgba(255, 255, 255, 0.3) !important;
    color: white !important;
    height: auto !important;
    padding: 16px !important;
    border-radius: 12px !important;
    display: flex !important;
    align-items: center !important;
    gap: 12px !important;
    
    &:hover {
      background: #5a6578 !important;
      border-color: rgba(255, 255, 255, 0.5) !important;
    }
    
    span:first-child {
      font-size: 20px;
      font-weight: bold;
    }
  `,

  addFilesSubtext: css`
    color: rgba(255, 255, 255, 0.7) !important;
    font-size: 12px !important;
  `,

  mainLayout: css`
    background: #f5f7fa;
  `,

  header: css`
    background: white !important;
    padding: 0 24px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    border-bottom: 1px solid #e8eaed !important;
    height: 64px !important;
  `,

  headerLeft: css`
    display: flex;
    align-items: center;
    gap: 16px;
  `,

  collapseButton: css`
    color: #6b7685 !important;
    font-size: 16px !important;
    
    &:hover {
      background: #f5f7fa !important;
    }
  `,

  breadcrumb: css`
    display: flex;
    align-items: center;
    gap: 8px;
  `,

  breadcrumbText: css`
    font-size: 18px !important;
    font-weight: 600 !important;
    color: #1a202c !important;
  `,

  betaBadge: css`
    .ant-badge-count {
      background: #ff6b47 !important;
      color: white !important;
      font-size: 10px !important;
      font-weight: 600 !important;
      height: 18px !important;
      line-height: 18px !important;
      border-radius: 9px !important;
      padding: 0 6px !important;
      min-width: auto !important;
    }
  `,

  headerRight: css`
    display: flex;
    align-items: center;
    gap: 16px;
  `,

  searchContainer: css`
    position: relative;
    display: flex;
    align-items: center;
  `,

  searchIcon: css`
    position: absolute;
    left: 12px;
    color: #9ca3af;
    z-index: 1;
  `,

  searchInput: css`
    padding: 8px 12px 8px 36px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    background: #f9fafb;
    font-size: 14px;
    width: 280px;
    outline: none;
    
    &::placeholder {
      color: #9ca3af;
    }
    
    &:focus {
      border-color: #6366f1;
      background: white;
    }
  `,

  headerButton: css`
    color: #6b7685 !important;
    
    &:hover {
      background: #f5f7fa !important;
    }
  `,

  upgradeButton: css`
    background: #10b981 !important;
    border-color: #10b981 !important;
    border-radius: 8px !important;
    font-weight: 500 !important;
    
    &:hover {
      background: #059669 !important;
      border-color: #059669 !important;
    }
  `,

  content: css`
    padding: 24px;
    background: #f5f7fa;
    min-height: calc(100vh - 64px);
  `,
});