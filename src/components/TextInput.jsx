const { default: styled } = require('styled-components')

const style = `
  padding: 5px;
  border-width: 1px;
  border-radius: 7px;
  // border-color: rgb(35, 185, 215);
  outline: none;
  width: calc(100% - 10px);
  background-color: rgb(248, 248, 248);
  font-size: 1em;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;

  &:focus {
    background-color: white;
    box-shadow: 0 0 0 1px black;
  }

  @media print {
    display: none;
  }
`

export const Input = styled.input`
  ${style}
`

export const Textarea = styled.textarea`
  ${style}
  resize: vertical;
`