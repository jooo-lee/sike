import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.button`
  font-size: 1rem;
  padding: 0.75rem 1rem;
  background-color: #0071e3;
  color: white;
  border: none;
  border-radius: 980px;
  outline-offset: 4px;
`;

const MainButton = ({ text, type = 'submit' }) => {
  return <Button type={type}>{text}</Button>;
};

MainButton.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default MainButton;
