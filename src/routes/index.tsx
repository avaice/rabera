import { Helmet } from 'react-helmet-async'
import { Link } from 'wouter-preact'

export const Index = () => {
  return (
    <>
      <Helmet>
        <title>Awesome Frontend</title>
      </Helmet>
      <div>
        <h1 className={'font-bold text-3xl'}>Index</h1>
        <p>Home page</p>
        <Link href="/demo">Demo</Link>
      </div>
    </>
  )
}
