import { useNavigate } from 'react-router-dom'
import { Alert } from '../../../common/components/Alert'
import { Button } from '../../../common/components/Button'
import { FloatingActionButton } from '../../../common/components/FloatingActionButton'
import { LinkButton } from '../../../common/components/LinkButton'
import { Page } from '../../../common/components/Page'
import { Section } from '../../../common/components/Section'
import { Spinner } from '../../../common/components/Spinner'
import { useGetEventsQuery } from '../../api/eventsApi'
import { getEventsErrorMessage } from '../../model/apiErrors'
import { formatDateRange } from '../../model/formatters'
import type { EventSummaryResponse } from '../../model/types'
import * as S from '../../components/EventControls/EventControls.styles'

function EventCard({ event }: { event: EventSummaryResponse }) {
  const participantCount = event.participantsCount
  const participantLabel =
    participantCount === 1
      ? '1 participante'
      : `${participantCount} participantes`

  return (
    <S.EventCardLayout>
      <S.EventCardBody>
        <S.CardHeader>
          <S.CardTitle>{event.title}</S.CardTitle>
          {event.description ? (
            <S.MutedText>{event.description}</S.MutedText>
          ) : null}
        </S.CardHeader>
        <S.Meta>
          <S.Pill>{formatDateRange(event.startDate, event.endDate)}</S.Pill>
          <S.Pill>{participantLabel}</S.Pill>
        </S.Meta>
      </S.EventCardBody>
      <S.CardActions aria-label={`Acciones para ${event.title}`}>
        <S.CardActionLink to={`/eventos/${event.id}`}>Abrir</S.CardActionLink>
        <S.CardActionLink to={`/eventos/${event.id}/editar`}>
          Editar
        </S.CardActionLink>
      </S.CardActions>
    </S.EventCardLayout>
  )
}

export function EventsPage() {
  const navigate = useNavigate()
  const { data: events = [], error, isFetching, isLoading, refetch } =
    useGetEventsQuery()

  return (
    <Page maxWidth="wide">
      {error ? (
        <Alert tone="danger" title="No pudimos cargar tus eventos">
          {getEventsErrorMessage(error)}
        </Alert>
      ) : null}

      <Section
        title="Tus eventos"
        description="Gestiona eventos compartidos y sus gastos."
        action={
          <Button
            disabled={isFetching}
            size="sm"
            type="button"
            variant="secondary"
            onClick={() => refetch()}
          >
            Actualizar
          </Button>
        }
      >
        {isLoading ? (
          <S.EmptyState>
            <Spinner />
            <S.MutedText>Cargando eventos...</S.MutedText>
          </S.EmptyState>
        ) : null}

        {!isLoading && events.length === 0 ? (
          <S.EmptyState>
            <S.CardTitle>Todavia no tienes eventos</S.CardTitle>
            <S.MutedText>
              Crea un evento para registrar participantes y dividir gastos.
            </S.MutedText>
            <LinkButton to="/eventos/nuevo">Crear primer evento</LinkButton>
          </S.EmptyState>
        ) : null}

        {events.length > 0 ? (
          <S.CardGrid>
            {events.map((event) => <EventCard key={event.id} event={event} />)}
          </S.CardGrid>
        ) : null}
      </Section>

      <FloatingActionButton
        extended
        icon={<span aria-hidden="true">+</span>}
        label="Crear evento"
        type="button"
        onClick={() => navigate('/eventos/nuevo')}
      />
    </Page>
  )
}
