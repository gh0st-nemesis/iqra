import type { Prophet } from '../types'

// Récits courts et non-exhaustifs, basés sur les grandes lignes largement admises des récits
// coraniques des 25 prophètes cités nommément dans le Coran (ordre traditionnel), suivis d'Al-Mahdi
// à titre de complément — une figure attendue mentionnée dans la Sunna, mais qui n'est pas un prophète.
// Aucune illustration : par respect de la tradition islamique, les prophètes ne sont jamais représentés
// visuellement dans cette application.
export const prophets: Prophet[] = [
  {
    id: 'p-adam',
    order: 1,
    name: 'Adam',
    arabicName: 'آدَمُ',
    summary:
      "Adam (paix sur lui) est le premier être humain, créé directement par Allah. Il a vécu au Paradis avec son épouse Hawwa (Ève), avant d'en être fait descendre sur Terre après avoir désobéi à Allah en s'approchant de l'arbre interdit — une faute dont il s'est repenti et qu'Allah lui a pardonnée.",
    lesson: "Se tromper fait partie de la vie ; ce qui compte, c'est de se repentir sincèrement, comme l'a fait Adam.",
    vocab: [
      { arabic: 'آدَمُ', transliteration: 'Ādam', meaning: 'Adam' },
      { arabic: 'جَنَّةٌ', transliteration: 'Janna', meaning: 'Paradis, jardin' },
      { arabic: 'تَوْبَةٌ', transliteration: 'Tawba', meaning: 'Repentir' },
    ],
  },
  {
    id: 'p-idris',
    order: 2,
    name: 'Idris',
    arabicName: 'إِدْرِيسُ',
    summary:
      "Idris (paix sur lui) est décrit dans le Coran comme un homme véridique et un prophète, élevé par Allah à un haut rang. La tradition le présente comme un homme de grande sagesse, parmi les premiers à écrire avec un calame.",
    lesson: "La droiture et la recherche du savoir élèvent une personne aux yeux d'Allah.",
    vocab: [
      { arabic: 'إِدْرِيسُ', transliteration: 'Idrīs', meaning: 'Idris' },
      { arabic: 'قَلَمٌ', transliteration: 'Qalam', meaning: 'Calame, plume' },
      { arabic: 'حِكْمَةٌ', transliteration: 'Ḥikma', meaning: 'Sagesse' },
    ],
  },
  {
    id: 'p-nuh',
    order: 3,
    name: 'Noé',
    arabicName: 'نُوحٌ',
    summary:
      "Nûh (paix sur lui) a appelé son peuple à n'adorer qu'Allah pendant très longtemps, mais presque personne ne l'a écouté. Sur ordre d'Allah, il a construit une grande arche ; lorsque le déluge est arrivé, seuls lui, les croyants avec lui et un couple de chaque espèce animale ont été sauvés.",
    lesson: "La patience face au refus des autres : Nûh a continué à transmettre son message pendant des siècles sans se décourager.",
    vocab: [
      { arabic: 'نُوحٌ', transliteration: 'Nūḥ', meaning: 'Noé' },
      { arabic: 'سَفِينَةٌ', transliteration: 'Safīna', meaning: 'Bateau, arche' },
      { arabic: 'صَبْرٌ', transliteration: 'Ṣabr', meaning: 'Patience' },
    ],
  },
  {
    id: 'p-hud',
    order: 4,
    name: 'Hûd',
    arabicName: 'هُودٌ',
    summary:
      "Hûd (paix sur lui) a été envoyé au peuple de 'Âd, un peuple puissant mais devenu arrogant et idolâtre. Il les a avertis pendant longtemps ; devant leur refus obstiné, Allah les a anéantis par un vent violent, tandis que Hûd et les croyants étaient sauvés.",
    lesson: "L'orgueil et le refus d'écouter l'avertissement mènent à sa propre perte, quelle que soit sa puissance.",
    vocab: [
      { arabic: 'هُودٌ', transliteration: 'Hūd', meaning: 'Hûd' },
      { arabic: 'رِيحٌ', transliteration: 'Rīḥ', meaning: 'Vent' },
      { arabic: 'كِبْرٌ', transliteration: 'Kibr', meaning: 'Orgueil' },
    ],
  },
  {
    id: 'p-salih',
    order: 5,
    name: 'Sâlih',
    arabicName: 'صَالِحٌ',
    summary:
      "Sâlih (paix sur lui) a été envoyé au peuple de Thamûd. Allah lui a donné une chamelle comme signe miraculeux ; le peuple l'a tuée par défi malgré les avertissements, et a été anéanti par un cri terrible peu après.",
    lesson: "Respecter les signes qu'Allah place devant nous plutôt que de les défier par orgueil.",
    vocab: [
      { arabic: 'صَالِحٌ', transliteration: 'Ṣāliḥ', meaning: 'Sâlih' },
      { arabic: 'نَاقَةٌ', transliteration: 'Nāqa', meaning: 'Chamelle' },
      { arabic: 'عَذَابٌ', transliteration: 'ʿAdhāb', meaning: 'Châtiment' },
    ],
  },
  {
    id: 'p-ibrahim',
    order: 6,
    name: 'Abraham',
    arabicName: 'إِبْرَاهِيمُ',
    summary:
      "Ibrahim (paix sur lui) a grandi dans un peuple qui adorait des idoles ; il a cherché seul la vérité et a reconnu Allah comme seul Créateur. Il a notamment brisé les idoles de son peuple pour leur montrer qu'elles ne pouvaient se défendre elles-mêmes, et a plus tard reconstruit la Kaaba à La Mecque avec son fils Isma'il.",
    lesson: "Chercher la vérité par soi-même et rester ferme dans sa foi, même seul face à tous les autres.",
    vocab: [
      { arabic: 'إِبْرَاهِيمُ', transliteration: 'Ibrāhīm', meaning: 'Abraham' },
      { arabic: 'صَنَمٌ', transliteration: 'Ṣanam', meaning: 'Idole' },
      { arabic: 'الْكَعْبَةُ', transliteration: 'Al-Kaʿba', meaning: 'La Kaaba' },
    ],
  },
  {
    id: 'p-lut',
    order: 7,
    name: 'Loth',
    arabicName: 'لُوطٌ',
    summary:
      "Lût (paix sur lui), neveu d'Ibrahim, a été envoyé à un peuple qui commettait des actes immoraux jamais vus auparavant. Malgré ses avertissements répétés, le peuple a persisté ; lui et sa famille (sauf son épouse) ont été sauvés avant que la cité ne soit détruite.",
    lesson: "Rester attaché à la droiture même lorsqu'on est entouré par le mal et le refus général.",
    vocab: [
      { arabic: 'لُوطٌ', transliteration: 'Lūṭ', meaning: 'Loth' },
      { arabic: 'قَوْمٌ', transliteration: 'Qawm', meaning: 'Peuple' },
      { arabic: 'إِنْذَارٌ', transliteration: 'Indhār', meaning: 'Avertissement' },
    ],
  },
  {
    id: 'p-ismail',
    order: 8,
    name: "Ismaël",
    arabicName: 'إِسْمَاعِيلُ',
    summary:
      "Isma'il (paix sur lui), fils d'Ibrahim et Hajar, a accepté sans hésiter d'être sacrifié sur ordre d'Allah lorsque son père le lui a annoncé en songe — Allah a alors remplacé le sacrifice par un bélier. Il a ensuite aidé son père à rebâtir la Kaaba et est l'ancêtre du prophète Muhammad.",
    lesson: "L'obéissance totale et confiante envers Allah, même dans l'épreuve la plus difficile.",
    vocab: [
      { arabic: 'إِسْمَاعِيلُ', transliteration: 'Ismāʿīl', meaning: 'Ismaël' },
      { arabic: 'كَبْشٌ', transliteration: 'Kabsh', meaning: 'Bélier' },
      { arabic: 'طَاعَةٌ', transliteration: 'Ṭāʿa', meaning: 'Obéissance' },
    ],
  },
  {
    id: 'p-ishaq',
    order: 9,
    name: 'Isaac',
    arabicName: 'إِسْحَاقُ',
    summary:
      "Ishaq (paix sur lui), fils d'Ibrahim et Sarah, a été annoncé à ses parents comme une bonne nouvelle alors qu'ils ne s'y attendaient plus. Il a poursuivi la mission de son père et est devenu le père de Ya'qub.",
    lesson: "Allah répond aux invocations sincères, même lorsque tout semble impossible aux yeux des hommes.",
    vocab: [
      { arabic: 'إِسْحَاقُ', transliteration: 'Isḥāq', meaning: 'Isaac' },
      { arabic: 'بِشَارَةٌ', transliteration: 'Bishāra', meaning: 'Bonne nouvelle' },
      { arabic: 'نَسْلٌ', transliteration: 'Nasl', meaning: 'Descendance' },
    ],
  },
  {
    id: 'p-yaqub',
    order: 10,
    name: 'Jacob',
    arabicName: 'يَعْقُوبُ',
    summary:
      "Ya'qub (paix sur lui), fils d'Ishaq et père de Yusuf, a traversé une immense tristesse après la disparition de son fils bien-aimé, pleurant pendant des années sans jamais désespérer de la miséricorde d'Allah — jusqu'à leurs retrouvailles.",
    lesson: "Garder l'espoir en Allah même dans la peine la plus profonde et la plus longue.",
    vocab: [
      { arabic: 'يَعْقُوبُ', transliteration: 'Yaʿqūb', meaning: 'Jacob' },
      { arabic: 'حُزْنٌ', transliteration: 'Ḥuzn', meaning: 'Tristesse' },
      { arabic: 'رَجَاءٌ', transliteration: 'Rajāʾ', meaning: 'Espoir' },
    ],
  },
  {
    id: 'p-yusuf',
    order: 11,
    name: 'Joseph',
    arabicName: 'يُوسُفُ',
    summary:
      "Yusuf (paix sur lui), fils de Ya'qub, a été jalousé par ses frères qui l'ont jeté dans un puits puis vendu comme esclave en Égypte. Après bien des épreuves — dont plusieurs années de prison injuste — Allah lui a donné une position d'autorité qui lui a permis de sauver son peuple de la famine et de pardonner à ses frères.",
    lesson: "Le pardon : malgré ce qu'ils lui avaient fait, Yusuf a pardonné à ses frères plutôt que de se venger.",
    vocab: [
      { arabic: 'يُوسُفُ', transliteration: 'Yūsuf', meaning: 'Joseph' },
      { arabic: 'بِئْرٌ', transliteration: 'Biʾr', meaning: 'Puits' },
      { arabic: 'عَفْوٌ', transliteration: 'ʿAfw', meaning: 'Pardon' },
    ],
  },
  {
    id: 'p-ayyub',
    order: 12,
    name: 'Job',
    arabicName: 'أَيُّوبُ',
    summary:
      "Ayyub (paix sur lui) a perdu sa santé, ses biens et ses proches, mais a enduré ces épreuves avec une patience exceptionnelle sans jamais cesser de louer Allah. Il a fini par être guéri et tout lui a été rendu, en récompense de sa patience.",
    lesson: "La patience dans l'épreuve, aussi longue et difficile soit-elle, est toujours récompensée par Allah.",
    vocab: [
      { arabic: 'أَيُّوبُ', transliteration: 'Ayyūb', meaning: 'Job' },
      { arabic: 'بَلَاءٌ', transliteration: 'Balāʾ', meaning: 'Épreuve' },
      { arabic: 'شِفَاءٌ', transliteration: 'Shifāʾ', meaning: 'Guérison' },
    ],
  },
  {
    id: 'p-shuayb',
    order: 13,
    name: "Chu'ayb",
    arabicName: 'شُعَيْبٌ',
    summary:
      "Shu'ayb (paix sur lui) a été envoyé au peuple de Madyan, connu pour fausser les mesures et les poids dans le commerce. Il les a appelés à l'honnêteté et à l'équité dans leurs transactions autant qu'à l'adoration d'Allah Seul.",
    lesson: "L'honnêteté dans les échanges avec autrui fait partie intégrante de la foi.",
    vocab: [
      { arabic: 'شُعَيْبٌ', transliteration: 'Shuʿayb', meaning: "Chu'ayb" },
      { arabic: 'مِيزَانٌ', transliteration: 'Mīzān', meaning: 'Balance' },
      { arabic: 'عَدْلٌ', transliteration: 'ʿAdl', meaning: 'Justice, équité' },
    ],
  },
  {
    id: 'p-musa',
    order: 14,
    name: 'Moïse',
    arabicName: 'مُوسَى',
    summary:
      "Musa (paix sur lui) a grandi à la cour de Pharaon avant d'être appelé par Allah, au Mont Sinaï, à ramener les Enfants d'Israël vers la vérité et à s'opposer à l'injustice de Pharaon. Allah lui a donné plusieurs signes, dont la séparation de la mer, pour sauver son peuple.",
    lesson: "S'opposer à l'injustice avec courage, même face à un tyran puissant, en s'appuyant sur Allah.",
    vocab: [
      { arabic: 'مُوسَى', transliteration: 'Mūsā', meaning: 'Moïse' },
      { arabic: 'فِرْعَوْنُ', transliteration: 'Firʿawn', meaning: 'Pharaon' },
      { arabic: 'عَصًا', transliteration: 'ʿAṣā', meaning: 'Bâton' },
    ],
  },
  {
    id: 'p-harun',
    order: 15,
    name: 'Aaron',
    arabicName: 'هَارُونُ',
    summary:
      "Harun (paix sur lui), frère aîné de Musa, a été envoyé avec lui auprès de Pharaon pour l'aider grâce à son éloquence. Il a soutenu et secondé Musa tout au long de sa mission auprès des Enfants d'Israël.",
    lesson: "S'entraider entre croyants pour porter ensemble une mission difficile.",
    vocab: [
      { arabic: 'هَارُونُ', transliteration: 'Hārūn', meaning: 'Aaron' },
      { arabic: 'فَصَاحَةٌ', transliteration: 'Faṣāḥa', meaning: 'Éloquence' },
      { arabic: 'وَزِيرٌ', transliteration: 'Wazīr', meaning: 'Assistant, soutien' },
    ],
  },
  {
    id: 'p-dhul-kifl',
    order: 16,
    name: 'Dhûl-Kifl',
    arabicName: 'ذُو الْكِفْلِ',
    summary:
      "Dhûl-Kifl (paix sur lui) est cité dans le Coran parmi les hommes patients et vertueux. La tradition retient de lui un grand attachement à tenir ses engagements et à accomplir ce qu'il avait promis.",
    lesson: "Tenir parole et honorer ses engagements, quoi qu'il en coûte.",
    vocab: [
      { arabic: 'ذُو الْكِفْلِ', transliteration: 'Dhū l-Kifl', meaning: 'Dhûl-Kifl' },
      { arabic: 'وَعْدٌ', transliteration: 'Waʿd', meaning: 'Promesse' },
      { arabic: 'وَفَاءٌ', transliteration: 'Wafāʾ', meaning: 'Fidélité à sa parole' },
    ],
  },
  {
    id: 'p-dawud',
    order: 17,
    name: 'David',
    arabicName: 'دَاوُودُ',
    summary:
      "Dawud (paix sur lui) a reçu le Zabûr (les Psaumes) et une voix si belle que même les montagnes et les oiseaux répétaient ses louanges avec lui. Allah a aussi adouci le fer entre ses mains pour qu'il en fasse des cottes de mailles, et il jugeait entre les gens avec sagesse.",
    lesson: "Mettre les dons qu'Allah nous a donnés — voix, talent, savoir-faire — au service du bien.",
    vocab: [
      { arabic: 'دَاوُودُ', transliteration: 'Dāwūd', meaning: 'David' },
      { arabic: 'زَبُورٌ', transliteration: 'Zabūr', meaning: 'Le Zabûr (Psaumes)' },
      { arabic: 'حَدِيدٌ', transliteration: 'Ḥadīd', meaning: 'Fer' },
    ],
  },
  {
    id: 'p-sulayman',
    order: 18,
    name: 'Salomon',
    arabicName: 'سُلَيْمَانُ',
    summary:
      "Sulayman (paix sur lui), fils de Dawud, a reçu un règne unique : le vent, les djinns et la compréhension du langage des animaux lui étaient soumis. Malgré son immense pouvoir, il restait humble et reconnaissant envers Allah pour chaque faveur reçue.",
    lesson: "Rester humble et reconnaissant, même lorsqu'Allah nous accorde énormément.",
    vocab: [
      { arabic: 'سُلَيْمَانُ', transliteration: 'Sulaymān', meaning: 'Salomon' },
      { arabic: 'هُدْهُدٌ', transliteration: 'Hudhud', meaning: 'Huppe (oiseau messager)' },
      { arabic: 'مُلْكٌ', transliteration: 'Mulk', meaning: 'Royaume, pouvoir' },
    ],
  },
  {
    id: 'p-ilyas',
    order: 19,
    name: 'Élie',
    arabicName: 'إِلْيَاسُ',
    summary:
      "Ilyas (paix sur lui) a été envoyé à un peuple qui adorait une idole nommée Ba'l au lieu d'Allah. Il les a appelés avec insistance à revenir à l'adoration exclusive du Créateur.",
    lesson: "Rappeler sans relâche l'essentiel — l'unicité d'Allah — même quand peu de gens écoutent.",
    vocab: [
      { arabic: 'إِلْيَاسُ', transliteration: 'Ilyās', meaning: 'Élie' },
      { arabic: 'بَعْلٌ', transliteration: 'Baʿl', meaning: "Ba'l (l'idole de son peuple)" },
      { arabic: 'تَوْحِيدٌ', transliteration: 'Tawḥīd', meaning: "Unicité d'Allah" },
    ],
  },
  {
    id: 'p-alyasa',
    order: 20,
    name: 'Élisée',
    arabicName: 'الْيَسَعُ',
    summary:
      "Al-Yasa' (paix sur lui) a poursuivi la mission d'Ilyas auprès de son peuple, les guidant avec patience et constance vers l'adoration d'Allah Seul.",
    lesson: "Poursuivre avec constance une mission de bien, même après ceux qui l'ont commencée.",
    vocab: [
      { arabic: 'الْيَسَعُ', transliteration: 'Al-Yasaʿ', meaning: 'Élisée' },
      { arabic: 'خَلَفٌ', transliteration: 'Khalaf', meaning: 'Successeur' },
      { arabic: 'هِدَايَةٌ', transliteration: 'Hidāya', meaning: 'Guidance' },
    ],
  },
  {
    id: 'p-yunus',
    order: 21,
    name: 'Jonas',
    arabicName: 'يُونُسُ',
    summary:
      "Yunus (paix sur lui) a quitté son peuple par découragement avant qu'Allah ne le lui permette, et a été avalé par un grand poisson. Dans son ventre, il a imploré Allah avec sincérité, qui l'a délivré ; son peuple, resté seul, a fini par croire tout entier.",
    lesson: "Se tourner vers Allah dans les moments les plus sombres — Il répond à qui L'invoque sincèrement.",
    vocab: [
      { arabic: 'يُونُسُ', transliteration: 'Yūnus', meaning: 'Jonas' },
      { arabic: 'حُوتٌ', transliteration: 'Ḥūt', meaning: 'Grand poisson, baleine' },
      { arabic: 'دُعَاءٌ', transliteration: 'Duʿāʾ', meaning: 'Invocation' },
    ],
  },
  {
    id: 'p-zakariya',
    order: 22,
    name: 'Zacharie',
    arabicName: 'زَكَرِيَّا',
    summary:
      "Zakariya (paix sur lui) a invoqué Allah en secret pour avoir un enfant malgré son grand âge et la stérilité de son épouse. Allah a exaucé son invocation en lui donnant Yahya.",
    lesson: "Ne jamais désespérer d'obtenir une réponse à ses invocations, même quand tout semble impossible.",
    vocab: [
      { arabic: 'زَكَرِيَّا', transliteration: 'Zakariyyā', meaning: 'Zacharie' },
      { arabic: 'كِبَرٌ', transliteration: 'Kibar', meaning: 'Grand âge' },
      { arabic: 'إِجَابَةٌ', transliteration: 'Ijāba', meaning: "Réponse (à l'invocation)" },
    ],
  },
  {
    id: 'p-yahya',
    order: 23,
    name: 'Jean',
    arabicName: 'يَحْيَى',
    summary:
      "Yahya (paix sur lui), fils de Zakariya, a reçu la sagesse et la piété dès son enfance. Le Coran le décrit comme doux envers ses parents, jamais tyrannique ni désobéissant.",
    lesson: "La piété et la bonté peuvent s'exprimer dès le plus jeune âge.",
    vocab: [
      { arabic: 'يَحْيَى', transliteration: 'Yaḥyā', meaning: 'Jean' },
      { arabic: 'طُهْرٌ', transliteration: 'Ṭuhr', meaning: 'Pureté' },
      { arabic: 'بِرٌّ', transliteration: 'Birr', meaning: 'Piété, bonté (envers les parents)' },
    ],
  },
  {
    id: 'p-isa',
    order: 24,
    name: 'Jésus',
    arabicName: 'عِيسَى',
    summary:
      "'Îsa (paix sur lui), fils de Maryam, est né par un miracle d'Allah sans intervention d'un père. Il a appelé les Enfants d'Israël à adorer Allah Seul et a accompli, avec la permission d'Allah, des miracles comme guérir des malades. Il occupe une place immense en islam, sans pour autant être considéré comme divin.",
    lesson: "La droiture et la sincérité dans l'adoration d'Allah, même face à un entourage hostile.",
    vocab: [
      { arabic: 'عِيسَى', transliteration: 'ʿĪsā', meaning: 'Jésus' },
      { arabic: 'مَرْيَمُ', transliteration: 'Maryam', meaning: 'Marie' },
      { arabic: 'مُعْجِزَةٌ', transliteration: 'Muʿjiza', meaning: 'Miracle' },
    ],
  },
  {
    id: 'p-muhammad',
    order: 25,
    name: 'Muhammad',
    arabicName: 'مُحَمَّدٌ ﷺ',
    summary:
      "Muhammad (paix et bénédiction sur lui) est né à La Mecque et a reçu la révélation du Coran par l'ange Jibril à partir de l'âge de 40 ans. Il a appelé les gens à n'adorer qu'Allah, a fait preuve d'une grande douceur et d'une grande honnêteté toute sa vie, et est le dernier prophète envoyé à l'humanité.",
    lesson: "L'honnêteté et la douceur envers tous : on le surnommait déjà « le digne de confiance » avant même de devenir prophète.",
    vocab: [
      { arabic: 'مُحَمَّدٌ', transliteration: 'Muḥammad', meaning: 'Muhammad' },
      { arabic: 'وَحْيٌ', transliteration: 'Waḥy', meaning: 'Révélation' },
      { arabic: 'أَمَانَةٌ', transliteration: 'Amāna', meaning: 'Honnêteté, fidélité' },
    ],
  },
  {
    id: 'p-mahdi',
    order: 26,
    name: 'Al-Mahdi (bonus — pas un prophète)',
    arabicName: 'الْمَهْدِيُّ',
    summary:
      "Al-Mahdi n'est pas un prophète : il s'agit d'un guide attendu, mentionné dans la Sunna (et non dans le Coran), qui apparaîtra avant la fin des temps pour remplir la Terre de justice après qu'elle aura été remplie d'injustice — aux côtés du retour d''Îsa (paix sur lui). Sa date et son identité ne sont connues que d'Allah ; l'islam met en garde contre toute tentative de les deviner ou de suivre quiconque prétend l'être.",
    lesson: "Se préparer par de bonnes œuvres plutôt que de chercher à percer les mystères que seul Allah connaît.",
    vocab: [
      { arabic: 'الْمَهْدِيُّ', transliteration: 'Al-Mahdī', meaning: 'Al-Mahdi (le bien-guidé)' },
      { arabic: 'عَدْلٌ', transliteration: 'ʿAdl', meaning: 'Justice' },
      { arabic: 'انْتِظَارٌ', transliteration: 'Intiẓār', meaning: 'Attente' },
    ],
  },
]
