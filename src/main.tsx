import { render } from 'preact'
import { App } from './app.tsx'
import './index.css'

const app = document.getElementById('app')

if (!app) {
	throw new Error('No app element found')
}

render(<App />, app)
