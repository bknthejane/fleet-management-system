import { createStyles, css, keyframes } from "antd-style";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const useStyles = createStyles({
  pageContainer: css`
    height: 100vh;
    width: 100vw;
    background-image: linear-gradient(
        rgba(250, 250, 250, 0.9),
        rgba(240, 240, 240, 0.9)
      ),
      url("/Media.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  `,

  loginContainer: css`
    background: rgba(255, 255, 255, 0.97);
    border-radius: 20px;
    max-width: 400px;
    width: 100%;
    padding: 42px 36px;
    box-shadow: 0 10px 40px rgba(60, 64, 67, 0.15);
    color: #1f2937;
    animation: ${fadeIn} 0.6s ease forwards;
    transition: box-shadow 0.3s ease;

    &:hover {
      box-shadow: 0 15px 50px rgba(60, 64, 67, 0.25);
    }

    @media (max-width: 480px) {
      padding: 30px 24px;
      max-width: 320px;
    }
  `,

  logoContainer: css`
    text-align: center;
    margin-bottom: 28px;
  `,

  logoImage: css`
    max-height: 120px;
    margin-bottom: 18px;
    user-select: none;
  `,

  welcomeTitle: css`
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 10px;
    color: #334155;
  `,

  subHeading: css`
    font-size: 16px;
    font-weight: 400;
    color: #64748b;
    margin-bottom: 36px;
    line-height: 1.4;
  `,

  formItem: css`
    margin-bottom: 22px;

    .ant-input,
    .ant-input-password {
      background-color: #f9fafb !important;
      color: #334155;
      border: 1.8px solid #cbd5e1;
      border-radius: 12px;
      box-shadow: none;
      transition: border-color 0.3s ease, box-shadow 0.3s ease;

      &:hover {
        border-color: #94a3b8 !important;
      }

      &:focus,
      &:focus-visible {
        border-color: #60a5fa !important;
        box-shadow: 0 0 10px 2px rgba(96, 165, 250, 0.4);
        outline: none;
      }
    }

    .ant-input::placeholder {
      color: #94a3b8;
      opacity: 1;
    }

    .ant-input-prefix {
      color: #94a3b8;
    }
  `,

  button: css`
    width: 100%;
    background: linear-gradient(135deg, #64748b 0%, #475569 100%);
    border: none;
    color: white;
    font-weight: 600;
    height: 48px;
    border-radius: 12px;
    font-size: 17px;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(71, 85, 105, 0.4);
    transition: background 0.3s ease, transform 0.25s ease, box-shadow 0.25s ease;

    &:hover {
      background: linear-gradient(135deg, #475569 0%, #334155 100%);
      transform: scale(1.05);
      box-shadow: 0 8px 28px rgba(71, 85, 105, 0.6);
    }

    &:focus {
      background: linear-gradient(135deg, #64748b 0%, #475569 100%);
      box-shadow: 0 0 10px 3px rgba(71, 92, 119, 0.5);
      outline: none;
    }
  `,

  loadingContainer: css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  `,
});

export default useStyles;
