import { createStyles, css, keyframes } from "antd-style";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(2rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const useStyles = createStyles({
  background: css`
    position: relative;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: url('/Media.jpg') no-repeat center center / cover;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    overflow: hidden;
  `,

  overlay: css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px);
    background: rgba(0, 0, 0, 0.4);
    z-index: 1; /* behind loginContainer */
  `,

  logoContainer: css`
    text-align: center;
    margin-bottom: 28px;
  `,

  logoImage: css`
    background: white;
    padding: 0.5rem;
    border-radius: 50%;
  `,

  welcomeTitle: css`
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 10px;
    color: #1f2937;
  `,

  subHeading: css`
    font-size: 16px;
    font-weight: 400;
    color: #f1f1f1;
    margin-bottom: 36px;
    line-height: 1.5;
  `,

  formItem: css`
    margin-bottom: 22px;

    .ant-input,
    .ant-input-password {
      background-color: #f3f4f6 !important;
      color: #1f2937;
      border: 1.8px solid #cbd5e1;
      border-radius: 12px;

      &:hover {
        border-color: #94a3b8 !important;
      }

      &:focus,
      &:focus-visible {
        border-color: #7c3aed !important;
        box-shadow: 0 0 10px 2px rgba(124, 58, 237, 0.4);
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
    padding: 0.8rem 2.5rem;
    border: none;
    font-size: 1rem;
    font-weight: bold;
    color: #f5f5f5;
    border-radius: 2rem;
    background: linear-gradient(-45deg, #1f2937, #374151, #4b5563, #3f3f46);
    background-size: 300% 300%;
    animation: ${gradientShift} 6s ease infinite;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 8px 28px rgba(0, 0, 0, 0.6);
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(107, 114, 128, 0.5);
    }

    @media (max-width: 768px) {
      width: 100%;
    }
  `,

  loginContainer: css`
    position: relative;
    z-index: 2;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 2rem;
    max-width: 400px;
    width: 100%;
    padding: 42px 36px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(25px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    color: #1f2937;
    animation: ${fadeIn} 1s ease forwards;
    transition: box-shadow 0.3s ease;

    &:hover {
      box-shadow: 0 15px 50px rgba(31, 41, 55, 0.35);
    }

    @media (max-width: 480px) {
      padding: 30px 24px;
      max-width: 320px;
    }
`,
});

export default useStyles;
