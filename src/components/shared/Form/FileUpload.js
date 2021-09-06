import AddIcon from '@atlaskit/icon/glyph/add'
import CrossCircleIcon from '@atlaskit/icon/glyph/cross-circle'
import React from 'react'

import { View } from '../../core/View'
import { api } from '../../../api'
import { danger, secondary } from '../../../styles/colors'
import { globalState } from '../../../hoc/globalState'
import { spacing, radius } from '../../../styles/layout'
import { styles } from '../../../hoc/styles'

@globalState
@styles({
  upload: {
    position: 'relative',
    height: 100,
    overflow: 'visible',
    borderRadius: radius.solid,
    border: `1px solid ${secondary}`,
    cursor: 'pointer',
    margin: spacing.small,
    padding: spacing.small,
  },
  removeBtn: {
    position: 'absolute',
    top: -10,
    right: -10,
  },
  productImg: {
    height: '100%',
    overflow: 'hidden',
  },
  image: {
    width: '100%'
  }
})
export class FileUpload extends React.Component {
  state = {
    uploads: this.props.uploads ? this.props.uploads.map(
      ({ filename, _id }) => ({ src: api.baseUrl + '/uploads/' + filename, _id })
    ) : []
  }

  inputBtnRef = null
  setInputBtnRef = ref => { this.inputBtnRef = ref }

  upload = file => api.postData('/uploads', file, {
    headers: {
      'Content-Type': file.type,
      'Content-Length': file.size,
      'Content-Disposition': `attachment; filename="${file.name}"`
    }
  })

  delete = fileId => api.delete('/uploads/:id', { params: { id: fileId } })

  addUpload = ({ filename, _id }, callback) => {
    const uploads = [...this.state.uploads, { src: api.baseUrl + '/uploads/' + filename, _id }]

    this.setState({ uploads }, callback)
  }

  removeUpload = id => {
    console.log(this.state.uploads, id)

    this.setState({
      uploads: this.state.uploads.filter(({ _id }) => _id !== id)
    }, () => {
      this.props.onUploadListChange(this.state.uploads)
    })
  }

  onAddUpload = e => {
    const { onUploadListChange, dispatch } = this.props

    const file = e.target.files[0]

    this.upload(file)
      .then(({ file }) => {
        this.addUpload(file, () => {
          onUploadListChange(this.state.uploads)
        })
      })
      .then(() => {
        this.inputBtnRef.value = null
      })
      .catch(err => {
        dispatch({ type: 'HTTP_ERROR', payload: err })
      })
  }

  onDeleteUpload = _id => {
    console.log(_id)
    this.delete(_id)
      .then(() => {
        this.removeUpload(_id)
      })
  }

  render() {
    const { classes } = this.props

    return (
      <View style={{ flexWrap: 'wrap' }}>
        {this.state.uploads.map(({ src, _id }) => (
          <View className={classes.upload}
                    style={{ justifyContent: 'center', alignItems: 'center', flex: '0 0 100px' }}
                    key={_id}>
            <View className={classes.removeBtn}
                  onClick={() => this.onDeleteUpload(_id)}>
              <CrossCircleIcon primaryColor={danger} />
            </View>
            <View className={classes.productImg}
                      style={{ justifyContent: 'center', alignItems: 'center' }}>
              <img src={src}
                   className={classes.image}
                   alt={src} />
            </View>
          </View>
        ))}
        <View className={classes.upload}
              onClick={() => this.inputBtnRef.click()}
              style={{ justifyContent: 'center', alignItems: 'center', flex: '0 0 100px' }}>
          <AddIcon primaryColor={secondary}
                   size="large" />
        </View>
        <input type="file"
               onChange={this.onAddUpload}
               style={{ display: 'none' }}
               ref={this.setInputBtnRef} />
      </View>
   )
  }
}
