import React from 'react'
import { $tt } from '../helpers'

export default class i18nTestComponent extends React.component {
  name: string = $tt('i18n测试的文案')

  constructor (props: any) {
    super(props)
  }
}
