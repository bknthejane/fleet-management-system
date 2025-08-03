import { createStyles, css } from "antd-style";

export const useStyles = createStyles({
  layout: css`
    min-height: 100vh;
    background: #f5f7fa;
  `,

  sidebar: css`
    background: #6b7685 !important;
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

  onlineStatus: css`
    color: rgba(255, 255, 255, 0.7) !important;
    font-size: 13px;
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

  breadcrumbText: css`
    font-size: 18px !important;
    font-weight: 600 !important;
    color: #1a202c !important;
  `,

  headerRight: css`
    display: flex;
    align-items: center;
    gap: 16px;
  `,

  headerButton: css`
    color: #6b7685 !important;
    
    &:hover {
      background: #f5f7fa !important;
    }
  `,

  content: css`
    padding: 24px;
    background: #f5f7fa;
    min-height: calc(100vh - 64px);
  `,
});
