import Button from '@atlaskit/button'
import ModalDialog, { ModalTransition } from '@atlaskit/modal-dialog'
import React, { Fragment, PureComponent } from 'react'

import { ListView } from '../../../core/ListView'
import { Offset } from '../../../shared/Offset'
import { Separator } from '../../../shared/Separator'
import { Text } from '../../../core/Text'
import { View } from '../../../core/View'
import { api } from '../../../../api'
import { useFetch } from '../../../../hook/useFetch'

function TemplatePickerDialog({ onClose, onPick }) {
  const { data, loading, error } = useFetch({ templates: () => api.get('/templates') })

  if (!data) return null

  const { templates } = data

  return (
    <ModalDialog
      onClose={onClose}
      components={{
        Container: ({ children, className }) => children,
      }}
    >
        <Offset vertical spacing="big" />
        {
          templates ? (
            <ListView dataSource={ templates }
                      renderRow={({ _id, name, items }) => (
                        <View style={{ flexDirection: 'column' }} key={_id}>
                          <View style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text>{name}</Text>
                            &nbsp;
                            <Button onClick={() => {
                              onPick(items)
                              onClose()
                            }}
                                    appearance="primary"
                                    spacing="compact">
                              Pick
                            </Button>
                          </View>
                          <Offset vertical />
                          <Separator />
                          <Offset vertical />
                        </View>
            )} />
          ) : <Text>No templates existing</Text>
        }
        <Offset vertical spacing="medium" />
    </ModalDialog>
  )
}

export default class TemplatePicker extends PureComponent {
  state = { isOpen: false }

  open = () => {
    this.setState({ isOpen: true })
  }

  close = () => {
    this.setState({ isOpen: false })
  }

  render() {
    const { isOpen } = this.state
    const { onPick } = this.props

    return (
      <Fragment>
        <Button onClick={this.open}>Pick from templates</Button>
        <ModalTransition>
          {isOpen && (
            <TemplatePickerDialog onClose={this.close} onPick={onPick} />
          )}
        </ModalTransition>
      </Fragment>
    )
  }
}
