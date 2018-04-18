import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import { equals } from 'ramda'

import { Text, TextGroup, Tooltip } from 'blockchain-info-components'
import { utils } from 'blockchain-wallet-v4/src'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

const hasLabel = (io) => io.label

const Addresses = props => {
  const { from, to, outputs, inputs, coin } = props
  const labelTo = <Text size='13px' weight={300} id='scenes.transactions.content.list.listitem.to'>{to}</Text>
  const labelFrom = <Text size='13px' weight={300} id='scenes.transactions.content.list.listitem.from'>{from}</Text>
  return (
    <Wrapper>
      <TextGroup inline>
        <Text size='13px' weight={500}>
          <FormattedMessage id='scenes.transactions.content.list.listitem.to' defaultMessage='To: ' />
        </Text>
        <Tooltip width='auto' label={labelTo} hover={outputs && outputs.some(hasLabel)}>
          { outputs && outputs.map((output) => output.label &&
            <Text size='12px' weight={300}>
              {equals(coin, 'BCH') ? utils.bch.toCashAddr(output.address, true) : output.address}
            </Text>)
          }
        </Tooltip>
      </TextGroup>
      <TextGroup inline>
        <Text size='13px' weight={500}>
          <FormattedMessage id='scenes.transactions.content.list.listitem.to' defaultMessage='From: ' />
        </Text>
        <Tooltip width='auto' label={labelFrom} hover={inputs && inputs.some(hasLabel)}>
          { inputs && inputs.map((input) => input.label &&
            <Text size='12px' weight={300}>
              {equals(coin, 'BCH') ? utils.bch.toCashAddr(input.address, true) : input.address}
            </Text>)
          }
        </Tooltip>
      </TextGroup>
    </Wrapper>
  )
}

Addresses.propTypes = {
  to: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired
}

export default Addresses
