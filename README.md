# Quick Start Guide - Web of Trust UI

This guide will help you quickly integrate the ClaimCard component into your Next.js application.

## 1. Installation

```bash
npm install @web-of-trust/ui
```

## 2. Basic Setup

```tsx
// app/view/[id]/page.tsx

import { ClaimCard } from '@web-of-trust/ui'
import { useSession } from 'next-auth/react'
import { useParams, usePathname } from 'next/navigation'
import useGoogleDrive from '@/hooks/useGoogleDrive'

export default function ClaimPage() {
  const params = useParams()
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const { getContent, storage, fetchFileMetadata } = useGoogleDrive()
  useEffect(() => {

    const content = await getContent(fileID)

  },[])

  return (
    <ClaimCard
      content={claimDetail}
      fileID={params.id as string}
      pathname={pathname}
      session={session}
      storage={storage}
      status={status}
      fetchFileMetadata={fetchFileMetadata}
    />
  )
}
```
