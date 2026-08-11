// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import McqQuiz, { type McqQuestion } from './McqQuiz'

const questions: McqQuestion[] = [
  { id: 'q1', prompt: 'أ', promptIsArabic: true, choices: ['alif', 'bā', 'tā', 'thā'], correctChoice: 'alif' },
  { id: 'q2', prompt: 'ب', promptIsArabic: true, choices: ['alif', 'bā', 'tā', 'thā'], correctChoice: 'bā' },
]

describe('McqQuiz', () => {
  it('affiche la première question et le total', () => {
    render(<McqQuiz questions={questions} onFinish={vi.fn()} />)
    expect(screen.getByText('Question 1 / 2')).toBeInTheDocument()
    expect(screen.getByText('أ')).toBeInTheDocument()
  })

  it('marque la bonne réponse comme correcte et appelle onCorrectAnswer', async () => {
    const user = userEvent.setup()
    const onCorrectAnswer = vi.fn()
    render(<McqQuiz questions={questions} onFinish={vi.fn()} onCorrectAnswer={onCorrectAnswer} />)

    await user.click(screen.getByRole('button', { name: 'alif' }))

    expect(screen.getByText('Bonne réponse !')).toBeInTheDocument()
    expect(onCorrectAnswer).toHaveBeenCalledWith('q1')
  })

  it('signale une mauvaise réponse et appelle onWrongAnswer sans incrémenter le score', async () => {
    const user = userEvent.setup()
    const onWrongAnswer = vi.fn()
    render(<McqQuiz questions={questions} onFinish={vi.fn()} onWrongAnswer={onWrongAnswer} />)

    await user.click(screen.getByRole('button', { name: 'bā' }))

    expect(screen.getByText(/La bonne réponse était/)).toBeInTheDocument()
    expect(onWrongAnswer).toHaveBeenCalledWith('q1')
    expect(screen.getByText('Score : 0')).toBeInTheDocument()
  })

  it('ignore les clics supplémentaires une fois une réponse choisie', async () => {
    const user = userEvent.setup()
    const onCorrectAnswer = vi.fn()
    render(<McqQuiz questions={questions} onFinish={vi.fn()} onCorrectAnswer={onCorrectAnswer} />)

    await user.click(screen.getByRole('button', { name: 'alif' }))
    await user.click(screen.getByRole('button', { name: 'bā' }))

    expect(onCorrectAnswer).toHaveBeenCalledTimes(1)
  })

  it('avance à la question suivante puis termine avec le bon score', async () => {
    const user = userEvent.setup()
    const onFinish = vi.fn()
    render(<McqQuiz questions={questions} onFinish={onFinish} />)

    await user.click(screen.getByRole('button', { name: 'alif' }))
    await user.click(screen.getByRole('button', { name: 'Suivant' }))

    expect(screen.getByText('Question 2 / 2')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'bā' }))
    await user.click(screen.getByRole('button', { name: 'Terminer' }))

    expect(onFinish).toHaveBeenCalledWith(2, 2)
  })
})
