import { FeatureCard } from '../../components/FeatureCard'
import * as S from './HomePage.styles'

export function HomePage() {
  return (
    <>
      <S.Intro>
        <S.Kicker>SuperApp financiera</S.Kicker>
        <S.Title>Una base modular para construir Expin por funcionalidades.</S.Title>
        <S.Summary>
          RTK Query centraliza el estado remoto y el cliente HTTP, mientras
          cada modulo crece dentro de su propio slice vertical.
        </S.Summary>
      </S.Intro>

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
          title="Identidad y sesión"
          description="Slice preparado para login, usuario actual y crecimiento de permisos."
          highlights={['Login por API', 'Sesion de usuario', 'Contratos tipados']}
        />
      </S.FeatureGrid>
    </>
  )
}
