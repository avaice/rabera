import { Suspense } from 'preact/compat'
import { HelmetProvider } from 'react-helmet-async'
import { Route, Switch } from 'wouter-preact'
import { lazyImport } from './lib/lazyImport'

const { Index } = lazyImport(() => import('./routes/index'), 'Index')
const { Demo } = lazyImport(() => import('./routes/demo'), 'Demo')
const { NotFound } = lazyImport(() => import('./routes/not-found'), 'NotFound')
const { Label } = lazyImport(() => import('./routes/label'), 'Label')

export function App() {
  return (
    <>
      <HelmetProvider>
        <Suspense fallback={null}>
          <Switch>
            <Route path="/" component={Index} />
            <Route path="/demo" component={Demo} />
            <Route path="/label" component={Label} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </HelmetProvider>
    </>
  )
}
