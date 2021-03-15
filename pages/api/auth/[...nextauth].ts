import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { NextApiRequest, NextApiResponse } from 'next-auth/_utils'

const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.Okta({
      clientId: process.env.OKTA_CLIENTID!,
      clientSecret: process.env.OKTA_CLIENTSECRET!,
      domain: process.env.OKTA_DOMAIN!
    }),
    // ...add more providers here
  ]
}

export default (req: NextApiRequest, res: NextApiResponse<any>) => NextAuth(req, res, options)