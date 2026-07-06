import { FeatureCard } from '../../../common/components/FeatureCard'
import { Page } from '../../../common/components/Page'
import { PageHeader } from '../../../common/components/PageHeader'
import { Section } from '../../../common/components/Section'

export function EventsPage() {
  return (
    <Page>
      <PageHeader
        title="Divisor de gastos"
        subtitle="Base del modulo para crear eventos, cargar gastos compartidos y calcular balances."
      />
      <Section title="Modulo inicial">
        <FeatureCard
          id="events-page"
          eyebrow="Events"
          title="Eventos compartidos"
          description="Base del modulo para crear eventos, cargar gastos compartidos y calcular balances."
          highlights={[
            'Ruta /eventos',
            'Endpoints en events/api',
            'Tipos de dominio en events/model',
          ]}
        />
      </Section>
    </Page>
  )
}
