import { beforeEach, describe, expect, it } from 'vitest'
import { useProfiles } from './profiles'
import { useProgress } from './progress'

beforeEach(() => {
  useProgress.getState().resetProgress()
  useProfiles.setState({ profiles: [], activeProfileId: null })
})

describe('ensureDefaultProfile', () => {
  it('enveloppe la progression actuelle dans un premier profil, sans perte', () => {
    useProgress.getState().addXp(42)
    useProfiles.getState().ensureDefaultProfile()

    const { profiles, activeProfileId } = useProfiles.getState()
    expect(profiles).toHaveLength(1)
    expect(profiles[0].name).toBe('Profil 1')
    expect(activeProfileId).toBe(profiles[0].id)
    expect(JSON.parse(profiles[0].snapshot).data.xp).toBe(42)
    // La progression en direct n'est pas modifiée par la migration.
    expect(useProgress.getState().xp).toBe(42)
  })

  it("ne fait rien si des profils existent déjà", () => {
    useProfiles.getState().ensureDefaultProfile()
    const firstId = useProfiles.getState().activeProfileId
    useProgress.getState().addXp(10)
    useProfiles.getState().ensureDefaultProfile()
    expect(useProfiles.getState().profiles).toHaveLength(1)
    expect(useProfiles.getState().activeProfileId).toBe(firstId)
  })
})

describe('addProfile', () => {
  it('archive la progression courante puis démarre le nouveau profil vierge', () => {
    useProfiles.getState().ensureDefaultProfile()
    useProgress.getState().addXp(100)
    useProfiles.getState().addProfile('Enfant 2')

    const { profiles, activeProfileId } = useProfiles.getState()
    expect(profiles).toHaveLength(2)

    const first = profiles.find((p) => p.name === 'Profil 1')!
    expect(JSON.parse(first.snapshot).data.xp).toBe(100)

    const second = profiles.find((p) => p.id === activeProfileId)!
    expect(second.name).toBe('Enfant 2')
    expect(useProgress.getState().xp).toBe(0) // nouveau profil, progression vierge
  })
})

describe('switchProfile', () => {
  it('sauvegarde le profil quitté et charge le profil cible', () => {
    useProfiles.getState().ensureDefaultProfile()
    const firstId = useProfiles.getState().activeProfileId!
    useProgress.getState().addXp(20)

    useProfiles.getState().addProfile('Deuxième')
    const secondId = useProfiles.getState().activeProfileId!
    useProgress.getState().addXp(5)

    useProfiles.getState().switchProfile(firstId)
    expect(useProgress.getState().xp).toBe(20)

    useProfiles.getState().switchProfile(secondId)
    expect(useProgress.getState().xp).toBe(5)
  })

  it('ne fait rien si on "bascule" vers le profil déjà actif', () => {
    useProfiles.getState().ensureDefaultProfile()
    useProgress.getState().addXp(7)
    const id = useProfiles.getState().activeProfileId!
    useProfiles.getState().switchProfile(id)
    expect(useProgress.getState().xp).toBe(7)
  })
})

describe('renameProfile', () => {
  it('renomme un profil existant', () => {
    useProfiles.getState().ensureDefaultProfile()
    const id = useProfiles.getState().activeProfileId!
    useProfiles.getState().renameProfile(id, 'Fatima')
    expect(useProfiles.getState().profiles.find((p) => p.id === id)?.name).toBe('Fatima')
  })

  it('ignore un nom vide', () => {
    useProfiles.getState().ensureDefaultProfile()
    const id = useProfiles.getState().activeProfileId!
    useProfiles.getState().renameProfile(id, '   ')
    expect(useProfiles.getState().profiles.find((p) => p.id === id)?.name).toBe('Profil 1')
  })
})

describe('deleteProfile', () => {
  it('refuse de supprimer le dernier profil restant', () => {
    useProfiles.getState().ensureDefaultProfile()
    const id = useProfiles.getState().activeProfileId!
    useProfiles.getState().deleteProfile(id)
    expect(useProfiles.getState().profiles).toHaveLength(1)
  })

  it('supprime un profil non actif sans toucher à la progression en direct', () => {
    useProfiles.getState().ensureDefaultProfile()
    useProgress.getState().addXp(9)
    useProfiles.getState().addProfile('À supprimer')
    const toDeleteId = useProfiles.getState().activeProfileId!
    const firstId = useProfiles.getState().profiles.find((p) => p.name === 'Profil 1')!.id

    useProfiles.getState().switchProfile(firstId)
    useProfiles.getState().deleteProfile(toDeleteId)

    expect(useProfiles.getState().profiles).toHaveLength(1)
    expect(useProgress.getState().xp).toBe(9)
  })

  it('en supprimant le profil actif, bascule automatiquement sur un profil restant', () => {
    useProfiles.getState().ensureDefaultProfile()
    const firstId = useProfiles.getState().activeProfileId!
    useProgress.getState().addXp(3)
    useProfiles.getState().addProfile('Deuxième')
    const secondId = useProfiles.getState().activeProfileId!

    useProfiles.getState().deleteProfile(secondId)

    expect(useProfiles.getState().profiles.map((p) => p.id)).toEqual([firstId])
    expect(useProfiles.getState().activeProfileId).toBe(firstId)
    expect(useProgress.getState().xp).toBe(3)
  })
})
