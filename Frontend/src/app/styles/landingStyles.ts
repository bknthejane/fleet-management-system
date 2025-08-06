import { createStyles, css, keyframes } from 'antd-style';

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-3rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const useStyles = createStyles(() => ({
  background: css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

    background-image: url('/Media.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    display: flex;
    align-items: center;
    padding-left: 5rem;

    overflow-x: hidden;
  `,
  logoContainer: css`
    position: absolute;
    top: -1.5rem;
    left: 1rem;
    display: flex;
    
    
    z-index: 10;
  `,
  logo: css`
    // border: 2px solid white;
    // background: white;
  `,
  textSection: css`
    max-width: 40rem;
    color: #fff;
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0.3) 80%,
      transparent 100%
    );
    padding: 3rem 4rem;
    border-radius: 1rem;
    animation: ${slideIn} 1s ease-out forwards;
  `,
  title: css`
    font-size: 3rem;
    color: #ffffff;
    margin-bottom: 1.5rem;
  `,
  subtitle: css`
    font-size: 1.2rem;
    color: #e6e6e6;
    margin-bottom: 2rem;
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
}));
