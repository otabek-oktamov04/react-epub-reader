import { BrowserRouter, Route, NavLink, Routes } from 'react-router-dom'
import cx from 'classnames'

import { Basic } from './examples/Basic'
import { Persist } from './examples/Persist'
import { Styling } from './examples/Styling'
import { Paging } from './examples/Paging'
import { Selection } from './examples/Selection'
import { Scroll } from './examples/Scroll'

const App = () => {
  return (
    <BrowserRouter>
      <Persist />
    </BrowserRouter>
  )
}

export default App
