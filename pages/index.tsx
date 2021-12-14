import Link from 'next/link'
import Image from 'next/image'
import { signIn, signOut, useSession } from 'next-auth/client'

import Logo from '@img/Logo.svg'
import oilIllustration from '@img/oil-ilustration.svg'
import oilSectionBanner from '@img/pexels-cottonbro-seccion-aceite.jpg'
import rozadaySectionBanner from '@img/pexels-cottonbro-rozaday-section.jpg'
import rozavihtSectionBanner from '@img/pexels-ganta-guywatching.jpg'

const index = () => {
  const [session, loading] = useSession()

  if (loading) {
    return <p>Loading...</p>
  }
  return (
    <>
    {!session && (
      <>
        Not signed in <br />
        <button onClick={signIn}>Sign in</button>
      </>
    )}
    {session && (
      <>
        Signed in as {session.user.name} <br />
        <button onClick={signOut}>Sign out</button>
      </>
    )}
    <div>
      <Link href="/private">
        <a>Go to private page</a>
      </Link>
    </div>
  </>
  )
}

export default index;