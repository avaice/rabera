import { Helmet } from 'react-helmet-async'
import useSWR from 'swr'
import { fetcher } from '../../lib/fetcher'

export const Demo = () => {
  const { data, error, isLoading } = useSWR('/api/hello', fetcher)

  return (
    <>
      <Helmet>
        <title>Demo</title>
      </Helmet>
      <div>
        <h1 className={'font-bold text-3xl '}>Demo</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <p>{data.status}</p>
        )}
      </div>
    </>
  )
}
