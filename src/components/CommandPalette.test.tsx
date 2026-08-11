// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import CommandPalette from './CommandPalette'

function renderPalette(onClose = vi.fn()) {
  const utils = render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="*" element={<CommandPalette open onClose={onClose} />} />
      </Routes>
    </MemoryRouter>,
  )
  return { onClose, ...utils }
}

describe('CommandPalette', () => {
  it("affiche les modules par défaut sans montrer le contenu indexé pour la recherche (vocabulaire, sourates...)", () => {
    renderPalette()
    expect(screen.getByText('Accueil')).toBeInTheDocument()
    expect(screen.getByText('Alphabet')).toBeInTheDocument()
    // "Vocabulaire" le module est présent, mais pas un mot de vocabulaire individuel
    expect(screen.queryByText(/Vocabulaire — /)).not.toBeInTheDocument()
  })

  it('trouve un mot de vocabulaire via sa traduction française (recherche plein texte)', async () => {
    const user = userEvent.setup()
    renderPalette()
    await user.type(screen.getByPlaceholderText('Aller à… (module, page)'), 'Merci')
    expect(screen.getByText(/Vocabulaire — Merci/)).toBeInTheDocument()
  })

  it('trouve une sourate par son nom translittéré', async () => {
    const user = userEvent.setup()
    renderPalette()
    await user.type(screen.getByPlaceholderText('Aller à… (module, page)'), 'Ikhlaas')
    expect(screen.getByText(/Al-Ikhlaas/)).toBeInTheDocument()
  })

  it('trouve un nom d\'Allah par sa signification', async () => {
    const user = userEvent.setup()
    renderPalette()
    await user.type(screen.getByPlaceholderText('Aller à… (module, page)'), 'Créateur')
    expect(screen.getByText(/Nom d'Allah — /)).toBeInTheDocument()
  })

  it("n'affiche rien pour une requête sans résultat", async () => {
    const user = userEvent.setup()
    renderPalette()
    await user.type(screen.getByPlaceholderText('Aller à… (module, page)'), 'zzzzzzzz')
    expect(screen.getByText(/Aucun résultat pour/)).toBeInTheDocument()
  })

  it('ferme la palette avec Échap', async () => {
    const user = userEvent.setup()
    const { onClose } = renderPalette()
    await user.type(screen.getByPlaceholderText('Aller à… (module, page)'), '{Escape}')
    expect(onClose).toHaveBeenCalled()
  })

  it('sélectionne le premier résultat avec Entrée et ferme la palette', async () => {
    const user = userEvent.setup()
    const { onClose } = renderPalette()
    await user.type(screen.getByPlaceholderText('Aller à… (module, page)'), 'Alphabet{Enter}')
    expect(onClose).toHaveBeenCalled()
  })
})
