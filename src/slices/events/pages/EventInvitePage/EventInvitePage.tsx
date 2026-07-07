import { useEffect, useRef } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '../../../../app/store/hooks'
import { clearSession } from '../../../auth/model/authSlice'
import { Alert } from '../../../common/components/Alert'
import { LinkButton } from '../../../common/components/LinkButton'
import { Page } from '../../../common/components/Page'
import { PageHeader } from '../../../common/components/PageHeader'
import { Spinner } from '../../../common/components/Spinner'
import { useJoinEventByInviteTokenMutation } from '../../api/eventsApi'
import { getApiStatus, getEventsErrorMessage } from '../../model/apiErrors'
import * as S from '../../components/EventControls/EventControls.styles'

export function EventInvitePage() {
  const dispatch = useAppDispatch()
  const { inviteToken } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const requestedTokenRef = useRef<string | null>(null)
  const [joinEvent, joinEventState] = useJoinEventByInviteTokenMutation()

  useEffect(() => {
    if (!inviteToken || requestedTokenRef.current === inviteToken) {
      return
    }

    requestedTokenRef.current = inviteToken
    joinEvent({ inviteToken })
      .unwrap()
      .then((event) => {
        navigate(`/eventos/${event.id}`, { replace: true })
      })
      .catch((error) => {
        if (getApiStatus(error) === 401) {
          requestedTokenRef.current = null
          dispatch(clearSession())
          navigate('/login', { replace: true, state: { from: location } })
        }
      })
  }, [dispatch, inviteToken, joinEvent, location, navigate])

  if (!inviteToken) {
    return <Navigate to="/eventos" replace />
  }

  if (joinEventState.error && getApiStatus(joinEventState.error) === 404) {
    return (
      <Page maxWidth="wide">
        <PageHeader
          title="Invitacion no valida"
          actions={<LinkButton to="/eventos">Volver a eventos</LinkButton>}
        />
        <Alert tone="warning">
          No encontramos un evento asociado a esta invitacion. Puede estar vencida
          o haber sido reemplazada.
        </Alert>
      </Page>
    )
  }

  if (joinEventState.error && getApiStatus(joinEventState.error) !== 401) {
    return (
      <Page maxWidth="wide">
        <PageHeader
          title="No pudimos unirte al evento"
          actions={<LinkButton to="/eventos">Volver a eventos</LinkButton>}
        />
        <Alert tone="danger">{getEventsErrorMessage(joinEventState.error)}</Alert>
      </Page>
    )
  }

  return (
    <Page maxWidth="wide">
      <S.EmptyState>
        <Spinner />
        <S.CardTitle>Uniendote al evento...</S.CardTitle>
        <S.MutedText>Estamos validando la invitacion compartida.</S.MutedText>
      </S.EmptyState>
    </Page>
  )
}
