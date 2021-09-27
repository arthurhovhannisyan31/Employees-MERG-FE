import React, { forwardRef, useMemo, FC, CSSProperties } from 'react'
import { createPortal } from 'react-dom'

interface IPortalProps {
  selector?: string
  className?: string
  style?: CSSProperties
  [key: string]: unknown
}

const Portal: FC<IPortalProps> = forwardRef<HTMLDivElement, IPortalProps>(
  ({ children, selector = '', className = '', style, ...props }, _ref) => {
    const mountNode: HTMLElement = useMemo(
      () => document.querySelector(selector) || document.body,
      [selector],
    )
    const container: JSX.Element = useMemo(
      () => (
        <div ref={_ref} className={className} style={style} {...props}>
          {children}
        </div>
      ),
      [className, children, _ref, props, style],
    )

    return createPortal(container, mountNode)
  },
)

export default Portal
