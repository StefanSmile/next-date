import { useId } from 'react'

import { Intro, IntroFooter } from '@/components/Intro'
import { StarField } from '@/components/StarField'

function Glow() {
  let id = useId();

  return (
    <div className="absolute inset-0 overflow-hidden bg-gray-950">
      <svg
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={`${id}-desktop`} cx="100%">
            <stop offset="0%" stopColor="rgba(56, 189, 248, 0.3)" />
            <stop offset="53.95%" stopColor="rgba(0, 71, 255, 0.09)" />
            <stop offset="100%" stopColor="rgba(10, 14, 23, 0)" />
          </radialGradient>
          <radialGradient id={`${id}-mobile`} cy="100%">
            <stop offset="0%" stopColor="rgba(56, 189, 248, 0.3)" />
            <stop offset="53.95%" stopColor="rgba(0, 71, 255, 0.09)" />
            <stop offset="100%" stopColor="rgba(10, 14, 23, 0)" />
          </radialGradient>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#${id}-desktop)`}
          className="hidden lg:block"
        />
        <rect
          width="100%"
          height="100%"
          fill={`url(#${id}-mobile)`}
          className="lg:hidden"
        />
      </svg>
      <div className="absolute inset-x-0 bottom-0 right-0 h-px bg-white mix-blend-overlay" />
    </div>
  );
}

function Invitation({ main, footer }) {
  return (
    <div className="overflow-hidden">
      <Glow />
      <div className="relative flex flex-col overflow-hidden items-center w-full h-full overflow-y-auto pl-10 pr-10">
        <div className="mx-auto max-w-lg pt-16 sm:pt-20 lg:pt-32">
          <div className="relative">
            <StarField className="-right-20 top-20" />
            {main}
          </div>
        </div>
        <div className="flex justify-center pt-6 lg:pb-6 w-full max-w-lg">
          {footer}
        </div>
      </div>
    </div>
  );
}

export function Layout({ children }) {
  return (
    <>
      <Invitation main={<Intro />} footer={<IntroFooter />} />
    </>
  )
}
