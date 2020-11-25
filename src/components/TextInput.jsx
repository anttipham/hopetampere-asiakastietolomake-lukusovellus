const { default: styled } = require('styled-components')

const style = `
  padding: 5px;
  border-width: 1px;
  border-radius: 7px;
  // border-color: rgb(35, 185, 215);
  width: calc(100% - 10px);
  // background-color: rgb(249, 249, 249);
  font-size: 1em;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;

  &:focus {
    background-color: white;
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