const { default: styled } = require('styled-components')

const Button = styled.button`
  padding: 5px 8px;
  margin: 5px;
  border-radius: 10px;
  border-width: 1px;
  background-color: rgb(245, 245, 245);
  outline: none;

  &:hover {
    background-color: rgb(239, 239, 239);
  }
`

export default Button