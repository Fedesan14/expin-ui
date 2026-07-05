import { FeatureCard } from '../../../common/components/FeatureCard'

export function ExpenseHistoryPage() {
  return (
    <FeatureCard
      id="expense-history-page"
      eyebrow="Expense history"
      title="Historial de gastos"
      description="Base del modulo para registrar ingresos, egresos, categorias y subcategorias."
      highlights={[
        'Ruta /historial',
        'Endpoints en expense-history/api',
        'Tipos de dominio en expense-history/model',
      ]}
    />
  )
}
