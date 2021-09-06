import React, { Fragment, PureComponent } from 'react'
import Button from '@atlaskit/button'
import ModalDialog, { ModalFooter, ModalTransition } from '@atlaskit/modal-dialog'
import Form, { Field } from '@atlaskit/form'
import Textfield from '@atlaskit/textfield'
import Textarea from '@atlaskit/textarea'

import { localizationLoader } from '../../../hoc/localizationLoader'
import { api } from '../../../api'
import { Offset } from '../../shared/Offset'

@localizationLoader('quick_purchase_dialog')
export default class QuickPurchaseDialog extends PureComponent {
  state = { isOpen: false }

  open = () => {
    this.setState({ isOpen: true })
  }

  close = () => {
    this.setState({ isOpen: false })
  }

  onFormSubmit = (data) => {
    const { products } = this.props
    const order = { shippingInfo: data, products }

    api.post('/orders', order)
      .then(() => {
        this.close()
      })
      .catch(err => {
        console.error(err)
      })
  }

  render() {
    const { isOpen } = this.state
    const { children, localization } = this.props

    const footer = (props) => (
      <ModalFooter showKeyline={props.showKeyline}>
        <Offset vertical />
        <Button appearance="primary" type="submit">
          {localization.submit}
        </Button>
      </ModalFooter>
    )

    return (
      <Fragment>
        <Button appearance="danger" onClick={this.open}>{children}</Button>
        <ModalTransition>
          {isOpen && (
            <ModalDialog
              onClose={this.close}
              components={{
                Container: ({ children, className }) => (
                  <Form onSubmit={this.onFormSubmit}>
                    {({ formProps }) => (
                      <form {...formProps} className={className}>
                        {children}
                      </form>
                    )}
                  </Form>
                ),
                Footer: footer,
              }}
            >
              <p>{localization.title}</p>
              <Field label={localization.name} name="contact" defaultValue="" isRequired>
                {({ fieldProps }) => (
                  <Textfield {...fieldProps} />
                )}
              </Field>
              <Field label={localization.address} name="shippingAddress" defaultValue="" isRequired>
                {({ fieldProps }) => (
                  <Textarea {...fieldProps} />
                )}
              </Field>
              <Field label={localization.phone} name="phoneNumber" defaultValue="" isRequired>
                {({ fieldProps }) => (
                  <Textfield {...fieldProps} />
                )}
              </Field>
            </ModalDialog>
          )}
        </ModalTransition>
      </Fragment>
    )
  }
}
