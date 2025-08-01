import { createStyles } from "antd-style";

export const useStyles = createStyles(({ token }) => {
  return {
    container: {
      padding: 24,
      minHeight: "100%",
      backgroundColor: token.colorBgLayout,
    },

    card: {
      borderRadius: 12,
      boxShadow: "0 2px 12px rgba(0, 0, 0, 0.05)",
    },

    headerSection: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },

    title: {
      margin: 0,
      fontWeight: 600,
    },

    addButton: {
      borderRadius: 6,
      padding: "0 16px",
    },

    table: {
      borderRadius: 12,
      overflow: "hidden",
      backgroundColor: token.colorBgContainer,
    },

    modalForm: {
      marginTop: 8,
    },
  };
});
