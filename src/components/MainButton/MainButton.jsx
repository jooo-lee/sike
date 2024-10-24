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
  transition: background-color 0.5s;

  &:hover {
    cursor: pointer;
    background-color: #0145b7;
  }
`;

const MainButton = ({
  text,
  type = 'submit',
  disabled = false,
  onClick = () => {},
}) => {
  return (
    <Button type={type} disabled={disabled} onClick={onClick}>
      {text}
    </Button>
  );
};

MainButton.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default MainButton;
