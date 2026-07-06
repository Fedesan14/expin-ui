import * as S from './FeatureCard.styles'

type FeatureCardProps = {
  id: string
  title: string
  eyebrow: string
  description: string
  highlights: string[]
}

export function FeatureCard({
  id,
  title,
  eyebrow,
  description,
  highlights,
}: FeatureCardProps) {
  return (
    <S.Card id={id}>
      <S.Eyebrow>{eyebrow}</S.Eyebrow>
      <S.Title>{title}</S.Title>
      <S.Description>{description}</S.Description>
      <S.List>
        {highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </S.List>
    </S.Card>
  )
}
