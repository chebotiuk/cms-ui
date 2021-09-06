import React, { useState, useRef, Fragment } from 'react'
import Tag from '@atlaskit/tag'
import TagGroup from '@atlaskit/tag-group'
import Textfield from '@atlaskit/textfield'
import update from 'immutability-helper'

import { Button } from '../../shared/Button'
import { Offset } from '../../shared/Offset'
import { SubmittableInput } from '../../shared/Form/SubmittableInput'
import { Text } from '../../core/Text'
import { View } from '../../core/View'
import { api } from '../../../api'

export function TemplateItem({ id, name, items, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [nameEditing, setNameEditing] = useState(false)
  const [itemsToUpdate, setItemsToUpdate] = useState(items)
  const formEl = useRef(null)

  const cancelEdit = () => {
    setItemsToUpdate(items)
    setEditing(false)
  }

  const edit = () => {
    setEditing(true)
  }

  const editName = () => {
    setNameEditing(true)
  }

  const deleteTpl = () => {
    api.delete('/templates/:id', { params: { id } })
      .then(onDelete)
  }

  const submitName = value => {
    return api.put('/templates/:id', { name: value, items }, { params: { id } })
      .then(onEdit)
  }

  const cancelNameEdit = () => {
    setNameEditing(false)
  }

  const onKeyItemSubmit = (e) => {
    e.preventDefault()

    setItemsToUpdate(
      update(itemsToUpdate, { $push: [e.target.key.value] })
    )

    formEl.current.reset()
  }

  const onKeySetSubmit = () => {
    api.put('/templates/:id', { name, items: itemsToUpdate }, { params: { id } })
      .then(() => {
        setEditing(false)
        onEdit()
      })
  }

  const onKeyItemRemove = (value) => {
    const indexToRemove = items.findIndex(key => key === value)
    setItemsToUpdate(
      update(itemsToUpdate, { $splice: [[ indexToRemove, 1 ]] })
    )
  }

  return nameEditing 
    ? (
      <SubmittableInput value={name}
                        onSubmit={submitName}
                        onCancel={cancelNameEdit} />
    ) : (
      <Fragment>
        <View style={{ justifyContent: 'space-between', alignItems: 'center', flexGrow: 1 }}>
          <Text className="text">{name}</Text>
          <Offset spacing="small" />
          {editing ? (
             <View>
               <Button appearance="primary"
                       onClick={onKeySetSubmit}>
                 Submit new keyset
               </Button>
               <Offset spacing="small" />
               <Button appearance="warning"
                       onClick={cancelEdit}>
                 Cancel
               </Button>
             </View>
          ) : (
            <View>
              <Button appearance="primary"
                      onClick={editName}>
                Edit name
              </Button>
              <Offset spacing="small" />
              <Button appearance="primary"
                      onClick={edit}>
                Edit template
              </Button>
              <Offset spacing="small" />
              <Button appearance="danger"
                      onClick={deleteTpl}>
                Delete
              </Button>
            </View>
            )}
        </View>
        {editing && (
          <Fragment>
            <Offset vertical spacing="small" />
            <TagGroup>
              {itemsToUpdate.map((keyText, i) => (
                <Tag text={keyText} key={Math.random()} onAfterRemoveAction={onKeyItemRemove} />
              ))}
            </TagGroup>
            <form ref={formEl} onSubmit={onKeyItemSubmit}>
              <Textfield label="Key name" name="key" elemAfterInput={
                <View>
                  <Button type="submit">
                    Add
                  </Button>
                  <Offset spacing="small" />
                </View>
              } />
            </form>
          </Fragment>
        )}
      </Fragment>
    )
}
