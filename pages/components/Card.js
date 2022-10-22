import { Box, useStyleConfig } from '@chakra-ui/react'

const Card = (props) => {
  const { size, variant, ...rest } = props

  const styles = useStyleConfig('Card', { size, variant })

  return <Box __css={styles} {...rest} />
}

export default Card