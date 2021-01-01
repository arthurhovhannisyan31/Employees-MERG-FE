// deps
import React from 'react'
import ReactDOM from 'react-dom'

interface IPortalProps {
  selector?: string
  className?: string
  style?: React.CSSProperties
  [key: string]: unknown
}

const Portal: React.FC<IPortalProps> = React.forwardRef<HTMLDivElement, IPortalProps>(({
  children, selector = '', className = '', style, ...props
}, _ref) => {
  const mountNode: HTMLElement = React.useMemo(
    () => document.querySelector(selector) || document.body,
    [selector],
  )
  const container: JSX.Element = React.useMemo(
    () => (
      <div ref={_ref} className={className} style={style} {...props}>
        {children}
      </div>
    ), [className, children, _ref, props, style],
  );

  return ReactDOM.createPortal(container, mountNode)
})

export default Portal
