import { createStyles, css } from "antd-style";

export const useStyles = createStyles({
  splitLeft: css`
    height: 100%;
    width: 50%;
    position: fixed;
    z-index: 1;
    top: 0;
    overflow-x: hidden;
    padding-top: 20px;
    left: 0;
    background-image: linear-gradient(
        rgba(15, 42, 77, 0.85),
        rgba(8, 21, 38, 0.9)
      ),
      url("/Landingpage.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><pattern id="hexagon" width="60" height="52" patternUnits="userSpaceOnUse"><polygon points="30,0 50,15 50,37 30,52 10,37 10,15" fill="none" stroke="rgba(0,174,239,0.1)" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(%23hexagon)"/></svg>');
      pointer-events: none;
    }
    
    @media (max-width: 768px) {
      display: none;
    }
  `,
  
  splitRight: css`
    height: 100%;
    width: 50%;
    position: fixed;
    z-index: 1;
    top: 0;
    overflow-x: hidden;
    padding-top: 20px;
    right: 0;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    @media (max-width: 768px) {
      width: 100%;
      right: 0;
      left: 0;
      background: linear-gradient(135deg, #0f2a4d 0%, #081526 100%);
    }
  `,
  
  centered: css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  `,
  
  subHeading: css`
    color: #00aeef;
    font-size: 18px;
    margin-top: 20px;
    font-weight: 400;
  `,
  
  page: css`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  
  form: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
  `,
  
  formContent: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 400px;
    width: 100%;
  `,
  
  heading: css`
    text-align: center;
    font-size: 30px;
    padding: 1rem;
    color: #1e293b;
    margin-bottom: 20px;
    font-weight: 600;
    @media (max-width: 768px) {
      font-size: 24px;
      color: white;
    }
    @media (max-width: 480px) {
      font-size: 20px;
    }
  `,
  
  input: css`
    width: 300px;
    border-color: #cbd5e1;
    background-color: white !important;
    color: #1e293b;
    border-radius: 8px;
    
    .ant-input {
      background-color: white !important;
      color: #1e293b;
      border-color: #cbd5e1;
      border-radius: 8px;
    }
    
    .ant-input::placeholder {
      color: #64748b;
    }
    
    .ant-input-prefix {
      color: #64748b;
    }
    
    .ant-input-suffix {
      color: #64748b;
    }
    
    &:hover {
      .ant-input {
        background-color: white !important;
        border-color: #00aeef;
      }
    }
    
    &:focus-within {
      .ant-input {
        background-color: white !important;
        border-color: #00aeef;
        box-shadow: 0 0 0 2px rgba(0, 174, 239, 0.2);
      }
    }
    
    @media (max-width: 768px) {
      .ant-input {
        background-color: rgba(255, 255, 255, 0.1) !important;
        color: white;
        border-color: rgba(255, 255, 255, 0.3);
      }
      
      .ant-input::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
      
      .ant-input-prefix {
        color: rgba(255, 255, 255, 0.7);
      }
      
      .ant-input-suffix {
        color: rgba(255, 255, 255, 0.7);
      }
    }
    
    @media (max-width: 480px) {
      width: 280px;
    }
    @media (max-width: 360px) {
      width: 250px;
    }
  `,
  
  button: css`
    width: 300px;
    background: linear-gradient(135deg, #00aeef 0%, #0088cc 100%);
    border: none;
    color: white;
    font-weight: 600;
    height: 48px;
    border-radius: 8px;
    transition: all 0.3s ease;
    font-size: 16px;
    
    &:hover {
      background: linear-gradient(135deg, #0088cc 0%, #006699 100%);
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 174, 239, 0.3);
    }
    
    &:focus {
      background: linear-gradient(135deg, #00aeef 0%, #0088cc 100%);
    }
    
    @media (max-width: 480px) {
      width: 280px;
    }
    @media (max-width: 360px) {
      width: 250px;
    }
  `,
  
  link: css`
    color: #00aeef;
    text-decoration: none;
    
    &:hover {
      color: #0088cc;
      text-decoration: underline;
    }
  `,
  
  mobileLogo: css`
    display: none;
    text-align: center;
    padding: 20px 0;
    background: transparent;
    @media (max-width: 768px) {
      display: block;
      margin-bottom: 20px;
    }
  `,
  
  logoImage: css`
    max-height: 170px;
    width: auto;
    @media (max-width: 480px) {
      max-height: 120px;
    }
    @media (max-width: 360px) {
      max-height: 100px;
    }
  `,
  
  logoText: css`
    color: #00aeef;
    font-size: 24px;
    font-weight: bold;
    margin: 0;
    @media (max-width: 480px) {
      font-size: 20px;
    }
  `,
  
  divider: css`
    color: #64748b;
    margin: 24px 0;
    
    .ant-divider-inner-text {
      color: #64748b;
    }
    
    @media (max-width: 768px) {
      color: rgba(255, 255, 255, 0.7);
      
      .ant-divider-inner-text {
        color: rgba(255, 255, 255, 0.7);
      }
    }
  `,
  
  loadingContainer: css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    
    @media (max-width: 768px) {
      background: linear-gradient(135deg, #0f2a4d 0%, #081526 100%);
    }
  `,
  
  welcomeTitle: css`
    color: white;
    font-size: 48px;
    font-weight: 300;
    margin-bottom: 20px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    
    @media (max-width: 768px) {
      font-size: 36px;
    }
  `,
  
  logoContainer: css`
    margin-bottom: 30px;
  `,
  
  formItem: css`
    margin-bottom: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
    
    .ant-form-item-explain-error {
      color: #ff4d4f;
    }
  `
});