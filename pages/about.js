import { withTheme } from 'emotion-theming'
import {
  Checkbox
} from '@chakra-ui/core'

const Home = () => {
  return <Checkbox defaultIsChecked>Checkbox</Checkbox>
}

export default withTheme(Home)
