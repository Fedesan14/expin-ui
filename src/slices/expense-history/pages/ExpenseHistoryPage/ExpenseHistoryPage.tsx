import { FeatureCard } from '../../../common/components/FeatureCard'
import { Page } from '../../../common/components/Page'
import { PageHeader } from '../../../common/components/PageHeader'
import { Section } from '../../../common/components/Section'

export function ExpenseHistoryPage() {
  return (
    <Page>
      <PageHeader
        title="Historial de gastos"
        subtitle="Base del modulo para registrar ingresos, egresos, categorias y subcategorias."
      />
      <Section title="Modulo inicial">
        <FeatureCard
          id="expense-history-page"
          eyebrow="Expense history"
          title="Movimientos y categorias"
          description="Base del modulo para registrar ingresos, egresos, categorias y subcategorias."
          highlights={[
            'Ruta /historial',
            'Endpoints en expense-history/api',
            'Tipos de dominio en expense-history/model',
          ]}
        />
      </Section>
    </Page>
  )
}
