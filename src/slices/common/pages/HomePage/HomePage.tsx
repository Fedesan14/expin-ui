import { FeatureCard } from '../../components/FeatureCard'
import { Page } from '../../components/Page'
import { PageHeader } from '../../components/PageHeader'
import { Section } from '../../components/Section'
import * as S from './HomePage.styles'

export function HomePage() {
  return (
    <Page>
      <PageHeader
        title="Una base modular para construir Expin por funcionalidades."
        subtitle="RTK Query centraliza el estado remoto y el cliente HTTP, mientras cada modulo crece dentro de su propio slice vertical."
      />

      <Section title="SuperApp financiera">
        <S.FeatureGrid aria-label="Modulos iniciales de Expin">
          <FeatureCard
            id="historial"
            eyebrow="Expense history"
            title="Historial de gastos"
            description="Registro de ingresos y egresos con categorias y subcategorias."
            highlights={[
              'Movimientos monetarios',
              'Categorias anidadas',
              'Reportes futuros',
            ]}
          />
          <FeatureCard
            id="eventos"
            eyebrow="Events"
            title="Divisor de gastos"
            description="Eventos compartidos donde cada gasto puede dividirse entre participantes."
            highlights={[
              'Eventos con integrantes',
              'Gastos compartidos',
              'Balances por usuario',
            ]}
          />
          <FeatureCard
            id="auth"
            eyebrow="Auth"
            title="Identidad y sesion"
            description="Slice preparado para login, usuario actual y crecimiento de permisos."
            highlights={['Login por API', 'Sesion de usuario', 'Contratos tipados']}
          />
        </S.FeatureGrid>
      </Section>
    </Page>
  )
}
