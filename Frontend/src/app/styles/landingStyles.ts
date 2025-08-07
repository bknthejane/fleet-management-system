import { createStyles, css, keyframes } from 'antd-style';

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

export const useStyles = createStyles(() => ({
  background: css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: url('/Media.jpg') no-repeat center center / cover;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    z-index: 1;
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
    z-index: 1;
  `,

  contentWrapper: css`
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 3rem;
    padding: 3rem 4rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 2rem;
    backdrop-filter: blur(25px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    animation: ${fadeIn} 1s ease-out;

    @media (max-width: 768px) {
      flex-direction: column;
      padding: 2rem;
      text-align: center;
    }
  `,

  logoContainer: css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  logo: css`
    background: white;
    padding: 0.5rem;
    border-radius: 50%;
  `,

  textSection: css`
    display: flex;
    flex-direction: column;
    max-width: 600px;
  `,

  title: css`
    color: #ffffff;
    font-size: 3rem;
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
      font-size: 2.2rem;
    }
  `,

  subtitle: css`
    color: #f1f1f1;
    font-size: 1.25rem;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  `,

  animatedButton: css`
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


}));
