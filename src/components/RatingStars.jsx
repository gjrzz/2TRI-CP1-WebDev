import { useState } from 'react'
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'

function Star({ fill }) {
  if (fill === 'full') return <FaStar aria-hidden="true" />
  if (fill === 'half') return <FaStarHalfAlt aria-hidden="true" />
  return <FaRegStar aria-hidden="true" />
}

function RatingStars({ value = 0, onChange, readOnly = false, size = 'text-xl' }) {
  const [hoverValue, setHoverValue] = useState(null)
  const displayValue = hoverValue ?? value

  const handleSelect = (starValue) => {
    if (readOnly || !onChange) return
    onChange(starValue)
  }

  return (
    <div
      className={`inline-flex items-center gap-0.5 text-primary ${size}`}
      onMouseLeave={() => setHoverValue(null)}
      aria-label={readOnly ? `Nota: ${value} de 5 estrelas` : 'Avaliar de 0.5 a 5 estrelas'}
    >
      {[1, 2, 3, 4, 5].map((starIndex) => {
        const half = starIndex - 0.5
        let fill = 'empty'
        if (displayValue >= starIndex) fill = 'full'
        else if (displayValue >= half) fill = 'half'

        return (
          <span key={starIndex} className="relative inline-block leading-none">
            <Star fill={fill} />
            {!readOnly && (
              <span className="absolute inset-0 flex">
                <button
                  type="button"
                  aria-label={`${half} estrelas`}
                  className="w-1/2 h-full cursor-pointer"
                  onMouseEnter={() => setHoverValue(half)}
                  onFocus={() => setHoverValue(half)}
                  onClick={() => handleSelect(half)}
                />
                <button
                  type="button"
                  aria-label={`${starIndex} estrelas`}
                  className="w-1/2 h-full cursor-pointer"
                  onMouseEnter={() => setHoverValue(starIndex)}
                  onFocus={() => setHoverValue(starIndex)}
                  onClick={() => handleSelect(starIndex)}
                />
              </span>
            )}
          </span>
        )
      })}
    </div>
  )
}

export default RatingStars
