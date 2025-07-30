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
    // background: white; /* Optional white background for visibility */
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
    background-color: #00aeef;
    border-color: #00aeef;
    border-radius: 0.5rem;
    padding: 0.75rem 2rem;
    font-size: 1rem;
    transition: transform 0.3s ease, background 0.3s ease;

    &:hover {
      background-color: #008fc1;
      border-color: #008fc1;
      transform: scale(1.05);
    }
  `,
}));
