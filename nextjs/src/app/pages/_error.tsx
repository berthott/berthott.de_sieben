// pages/_error.js
import getConfig from 'next/config'

const { serverRuntimeConfig } = getConfig()

function Error({ statusCode }: { statusCode: number }) {
    return (
        <p>
            {statusCode
                ? `An error ${statusCode} occurred on server`
                : 'An error occurred on client'}
        </p>
    )
}
Error.getInitialProps = ({ req, res, err }: { req: any, res: any, err: any}) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    // Only require Rollbar and report error if we're on the server
    if (!process.browser) {
        console.log('Reporting error to Rollbar...')
        const Rollbar = require('rollbar')
        const rollbar = new Rollbar(process.env.ROLLBAR_SERVER_TOKEN)
        rollbar.error(err, req, (rollbarError: any) => {
            if (rollbarError) {
                console.error('Rollbar error reporting failed:')
                console.error(rollbarError)
                return
            }
            console.log('Reported error to Rollbar')
        })
    }
    return { statusCode }
}

export default Error