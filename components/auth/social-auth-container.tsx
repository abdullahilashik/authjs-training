import React from 'react'
import { Button } from '../ui/button'
import { GitHubLogoIcon, InstagramLogoIcon } from '@radix-ui/react-icons'
import { handleGithubSignIn } from '@/actions/auth-action'

const SocialAuthContainer = () => {
  return (
    <div className="flex items-center gap-2 mt-5">
        <form action={handleGithubSignIn}>
            <Button className='w-full'>
                <GitHubLogoIcon />
                <span>Login with Github</span>
            </Button>
        </form>
        <Button disabled className='w-full'>
            <InstagramLogoIcon />
            <span>Login with IG</span>
        </Button>
    </div>
  )
}

export default SocialAuthContainer