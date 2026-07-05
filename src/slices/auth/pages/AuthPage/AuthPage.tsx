import { FeatureCard } from '../../../common/components/FeatureCard'

export function AuthPage() {
  return (
    <FeatureCard
      id="auth-page"
      eyebrow="Auth"
      title="Identidad y sesion"
      description="Base del modulo para login, usuario actual y futuras reglas de permisos."
      highlights={[
        'Ruta /auth',
        'Endpoints en auth/api',
        'Tipos de dominio en auth/model',
      ]}
    />
  )
}
