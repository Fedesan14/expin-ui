import { FeatureCard } from '../../../common/components/FeatureCard'

export function EventsPage() {
  return (
    <FeatureCard
      id="events-page"
      eyebrow="Events"
      title="Divisor de gastos"
      description="Base del modulo para crear eventos, cargar gastos compartidos y calcular balances."
      highlights={[
        'Ruta /eventos',
        'Endpoints en events/api',
        'Tipos de dominio en events/model',
      ]}
    />
  )
}
