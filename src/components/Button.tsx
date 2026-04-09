import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonBaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  children: React.ReactNode
  className?: string
}

type ButtonAsButton = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' | undefined }

type ButtonAsAnchor = ButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a' }

type ButtonProps = ButtonAsButton | ButtonAsAnchor

/**
 * Button — 3 variantes (primary, secondary, ghost) × 3 tamaños (sm, md, lg)
 *
 * primary   → cobre sólido, glow en hover
 * secondary → outline cobre (para fondos claros)
 * ghost     → sin borde / fondo, crema semi-opaco (para fondos oscuros)
 */
const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>((props, ref) => {
  const {
    variant = 'primary',
    size = 'md',
    isLoading = false,
    children,
    className = '',
    ...rest
  } = props

  const variantClass: Record<ButtonVariant, string> = {
    primary: 'btn btn-primary',
    secondary: 'btn btn-outline-copper',
    ghost: 'btn btn-ghost',
  }

  const sizeClass: Record<ButtonSize, string> = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg',
  }

  const classes = [
    variantClass[variant],
    sizeClass[size],
    isLoading ? 'btn--loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if ((rest as ButtonAsAnchor).as === 'a') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { as: _as, ...anchorRest } = rest as ButtonAsAnchor
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={classes}
        aria-disabled={isLoading}
        {...anchorRest}
      >
        {isLoading ? <span className="btn__spinner" aria-hidden="true" /> : null}
        {children}
      </a>
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { as: _as, ...buttonRest } = rest as ButtonAsButton & { as?: undefined }
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      disabled={isLoading || (buttonRest as ButtonHTMLAttributes<HTMLButtonElement>).disabled}
      aria-busy={isLoading}
      {...(buttonRest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {isLoading ? <span className="btn__spinner" aria-hidden="true" /> : null}
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
export type { ButtonVariant, ButtonSize, ButtonProps }
