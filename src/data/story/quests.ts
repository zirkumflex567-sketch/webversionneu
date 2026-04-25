import { Quest, NPC } from '../../game/StoryTypes';

export const QUESTS: Quest[] = [
  // --- PROLOG: Funken im Schlamm ---
  {
    id: 'MQ-00',
    title: 'Der Abend vor dem Regen',
    description: 'Bringe Sumpföl zur Dorf-Laterne und hilf den Bewohnern von Fackelruh.',
    region: 'Graumarsch',
    type: 'main',
    requirements: [],
    rewards: [{ type: 'unlock', value: 'MQ-01', description: 'Nächste Quest' }],
    objectives: [
      { id: 'oil', description: 'Sumpföl zur Laterne bringen', isCompleted: false },
      { id: 'help', description: 'Dorfbewohnern helfen', isCompleted: false }
    ],
    status: 'available'
  },
  {
    id: 'MQ-01',
    title: 'Wenn die Laterne stirbt',
    description: 'Verteidige Fackelruh gegen die Nachtflut.',
    region: 'Graumarsch',
    type: 'main',
    requirements: ['MQ-00'],
    rewards: [
      { type: 'unlock', value: 'MQ-02', description: 'Nächste Quest' },
      { type: 'unlock', value: 'Funkenstoss', description: 'Signaturfähigkeit' },
      { type: 'unlock', value: 'Titel: Überlebende', description: 'Titel' }
    ],
    objectives: [
      { id: 'defend', description: 'Gegen Nachtflut-Schemen kämpfen', isCompleted: false },
      { id: 'decision', description: 'Entscheide: Räucherei oder Schule?', isCompleted: false }
    ],
    status: 'locked'
  },
  {
    id: 'MQ-02',
    title: 'Asche schwimmt nicht',
    description: 'Fackelruh ist verloren. Fliehe mit den Überlebenden und Mara Esch durch das brennende Moor.',
    region: 'Graumarsch',
    type: 'main',
    requirements: ['MQ-01'],
    rewards: [
      { type: 'unlock', value: 'mara', description: 'Mara Esch (Rekrutiert)' },
      { type: 'unlock', value: 'MQ-03', description: 'Nächste Quest' }
    ],
    objectives: [
      { id: 'flee', description: 'Die Evakuierung am Ufer sichern', isCompleted: false },
      { id: 'items', description: 'Alchemistische Aufzeichnungen retten', isCompleted: false }
    ],
    status: 'locked'
  },

  // --- KAPITEL 1: Die Letzten Laternen ---
  {
    id: 'MQ-03',
    title: 'Der Hof, der noch brennt',
    description: 'Ein verlassener Wehrhof im Norden könnte uns Zuflucht bieten. Wir müssen ihn säubern und die Laterne entzünden.',
    region: 'Laternenhof',
    type: 'main',
    requirements: ['MQ-02'],
    rewards: [
      { type: 'unlock', value: 'mq03_hub_rebuilt', description: 'Hub-Ausbau: Stufe 1' },
      { type: 'unlock', value: 'MQ-04', description: 'Nächste Quest' }
    ],
    objectives: [
      { id: 'clear', description: 'Wehrhof von Schemen befreien', isCompleted: false },
      { id: 'ignite', description: 'Hof-Laterne mit Sumpföl speisen', isCompleted: false }
    ],
    status: 'locked'
  },
  {
    id: 'MQ-04',
    title: 'Die Sumpfkathedrale',
    description: 'Untersuche die Archivruine und finde Mira Voss.',
    region: 'Graumarsch',
    type: 'main',
    requirements: ['MQ-03'],
    rewards: [{ type: 'unlock', value: 'Mira Voss', description: 'Begleiterin' }],
    objectives: [
      { id: 'mira', description: 'Mira Voss befreien', isCompleted: false }
    ],
    status: 'locked'
  },
  {
    id: 'MQ-05',
    title: 'Drei Dochte für eine Flamme',
    description: 'Entzünde die alten Laternenposten im Moor.',
    region: 'Graumarsch',
    type: 'main',
    requirements: ['MQ-04'],
    rewards: [{ type: 'unlock', value: 'Weltkarte Stufe 1', description: 'Karten-Upgrade' }],
    objectives: [
      { id: 'posten1', description: 'Moorposten entzünden', isCompleted: false },
      { id: 'posten2', description: 'Mühlenposten entzünden', isCompleted: false },
      { id: 'posten3', description: 'Grabposten entzünden', isCompleted: false }
    ],
    status: 'locked'
  },

  // --- KAPITEL 2: Salzschuld ---
  {
    id: 'MQ-06',
    title: 'Der Weg aus Glas',
    description: 'Die Sonnenglasweite ist ohne Schutz nicht passierbar. Sammle Linsensplitter von den Kristallbestien, um eine Polarisations-Linse zu fertigen.',
    region: 'Sonnenglasweite',
    type: 'main',
    requirements: ['MQ-05'],
    rewards: [
      { type: 'unlock', value: 'polarization_lens', description: 'Polarisations-Linse (Ausrüstung)' },
      { type: 'unlock', value: 'MQ-07', description: 'Nächste Quest' }
    ],
    objectives: [
      { id: 'shards', description: '10 Linsensplitter sammeln', isCompleted: false },
      { id: 'mira', description: 'Mira Voss die Splitter bringen', isCompleted: false }
    ],
    status: 'locked'
  },
  {
    id: 'MQ-07',
    title: 'Der Preis des Salzes',
    description: 'Navigiere durch die Schuldenauktion im Spiegelmarkt.',
    region: 'Sonnenglasweite',
    type: 'main',
    requirements: ['MQ-06'],
    rewards: [{ type: 'unlock', value: 'Tarek al-Sahir', description: 'Begleiter' }],
    objectives: [
      { id: 'auction', description: 'Tareks Schuldschein finden', isCompleted: false },
      { id: 'decision', description: 'Entscheide über Tareks Zukunft', isCompleted: false }
    ],
    status: 'locked'
  },
  {
    id: 'MQ-08',
    title: 'Brunnen, die lügen',
    description: 'Untersuche die versalzenen Brunnen von Azhar.',
    region: 'Sonnenglasweite',
    type: 'main',
    requirements: ['MQ-07'],
    rewards: [{ type: 'unlock', value: 'Trank-Upgrade', description: 'Ausrüstung' }],
    objectives: [
      { id: 'purify', description: 'Brunnen von Mondglas reinigen', isCompleted: false }
    ],
    status: 'locked'
  },
  {
    id: 'MQ-09',
    title: 'Konvoi durch die Glassenke',
    description: 'Eskortiere eine Karawane durch den Scherbensturm.',
    region: 'Sonnenglasweite',
    type: 'main',
    requirements: ['MQ-08'],
    rewards: [{ type: 'unlock', value: 'Risshirsch', description: 'Mount' }],
    objectives: [
      { id: 'escort', description: 'Karawane sicher ans Ziel bringen', isCompleted: false }
    ],
    status: 'locked'
  },

  // --- KAPITEL 3: Der Wald vergisst ---
  {
    id: 'MQ-10',
    title: 'Wo Namen wurzeln',
    description: 'Betritt den Wurzelwald und begegne Siofra.',
    region: 'Wurzelwald',
    type: 'main',
    requirements: ['MQ-09'],
    rewards: [{ type: 'unlock', value: 'Silberraunen Zugang', description: 'Regionen-Freischaltung' }],
    objectives: [
      { id: 'forest', description: 'In den Wald eindringen', isCompleted: false },
      { id: 'siofra', description: 'Siofra Nhal finden', isCompleted: false }
    ],
    status: 'locked'
  },
  {
    id: 'MQ-11',
    title: 'Ein Garten, der Namen frisst',
    description: 'Finde das namenlose Kind im Tränenbecken.',
    region: 'Wurzelwald',
    type: 'main',
    requirements: ['MQ-10'],
    rewards: [{ type: 'unlock', value: 'Siofra Nhal', description: 'Begleiterin' }],
    objectives: [
      { id: 'child', description: 'Ileth finden', isCompleted: false },
      { id: 'decision', description: 'Entscheide über Ileths Namen', isCompleted: false }
    ],
    status: 'locked'
  },
  {
    id: 'MQ-12',
    title: 'Das Lied unter der Rinde',
    description: 'Beruhige den Namenfraß im Herzbaum.',
    region: 'Wurzelwald',
    type: 'main',
    requirements: ['MQ-11'],
    rewards: [{ type: 'unlock', value: 'Kronenscherbe 1', description: 'Quest-Item' }],
    objectives: [
      { id: 'hearttree', description: 'In den Kern eindringen', isCompleted: false },
      { id: 'sereth', description: 'Sereths Stimme hören', isCompleted: false }
    ],
    status: 'locked'
  },

  // --- KAPITEL 4: Die Glocke unter der Brandung ---
  {
    id: 'MQ-13',
    title: 'Rost auf der Zunge',
    description: 'Erreiche den Sturmhafen an der Eisenbrandküste.',
    region: 'Eisenbrandküste',
    type: 'main',
    requirements: ['MQ-12'],
    rewards: [{ type: 'unlock', value: 'Werftzünfte Zugang', description: 'Regionen-Freischaltung' }],
    objectives: [
      { id: 'port', description: 'Hafen erreichen', isCompleted: false },
      { id: 'brannok', description: 'Brannok Reef begegnen', isCompleted: false }
    ],
    status: 'locked'
  },
  {
    id: 'MQ-14',
    title: 'Die Glocke unter der Brandung',
    description: 'Dringe in das Glockenriff ein und beende den Streik.',
    region: 'Eisenbrandküste',
    type: 'main',
    requirements: ['MQ-13'],
    rewards: [{ type: 'unlock', value: 'Brannok Reef', description: 'Begleiter' }],
    objectives: [
      { id: 'reef', description: 'Glockenriff stürmen', isCompleted: false },
      { id: 'decision', description: 'Arbeiter oder Munition retten?', isCompleted: false }
    ],
    status: 'locked'
  },
  {
    id: 'MQ-15',
    title: 'Eron singt nicht mehr',
    description: 'Finde Brannoks Bruder Eron im Lotsenturm.',
    region: 'Eisenbrandküste',
    type: 'main',
    requirements: ['MQ-14'],
    rewards: [{ type: 'unlock', value: 'Brannok Bindung', description: 'Vertrauen' }],
    objectives: [
      { id: 'eron', description: 'Dialog mit Eron', isCompleted: false }
    ],
    status: 'locked'
  },

  // --- KAPITEL 5: Falken ohne Himmel ---
  {
    id: 'MQ-16',
    title: 'Der Pass verlangt Blut',
    description: 'Überquere den Weißzahnpass zum Hochkamm.',
    region: 'Hochkamm',
    type: 'main',
    requirements: ['MQ-15'],
    rewards: [{ type: 'unlock', value: 'Klosterpfad Zugang', description: 'Regionen-Freischaltung' }],
    objectives: [
      { id: 'pass', description: 'Haus Falkenlicht Konvoi finden', isCompleted: false },
      { id: 'edda', description: 'Edda Falkenlicht helfen', isCompleted: false }
    ],
    status: 'locked'
  },
  {
    id: 'MQ-17',
    title: 'Falken ohne Himmel',
    description: 'Entscheide über das Schicksal des Hauses Falkenlicht.',
    region: 'Hochkamm',
    type: 'main',
    requirements: ['MQ-16'],
    rewards: [{ type: 'unlock', value: 'Edda Falkenlicht', description: 'Begleiterin' }, { type: 'unlock', value: 'Kronenscherbe 2', description: 'Quest-Item' }],
    objectives: [
      { id: 'monastery', description: 'Eidbücher im Kloster finden', isCompleted: false },
      { id: 'decision', description: 'Wer soll den Pass regieren?', isCompleted: false }
    ],
    status: 'locked'
  },

  // --- KAPITEL 6: Schacht Null ---
  {
    id: 'MQ-18',
    title: 'Der zweite Name',
    description: 'Tauche ab in den Dunkelgrund und finde Kael Nhar.',
    region: 'Dunkelgrund',
    type: 'main',
    requirements: ['MQ-17'],
    rewards: [{ type: 'unlock', value: 'Rußmarkt Zugang', description: 'Regionen-Freischaltung' }],
    objectives: [
      { id: 'alias', description: 'Einen Alias wählen', isCompleted: false },
      { id: 'kael', description: 'Kael Nhar verfolgen', isCompleted: false }
    ],
    status: 'locked'
  },
  {
    id: 'MQ-19',
    title: 'Schacht Null',
    description: 'Dringe in den tiefsten Strafschacht vor.',
    region: 'Dunkelgrund',
    type: 'main',
    requirements: ['MQ-18'],
    rewards: [{ type: 'unlock', value: 'Kael Nhar', description: 'Begleiter' }, { type: 'unlock', value: 'Kronenscherbe 3', description: 'Quest-Item' }],
    objectives: [
      { id: 'mine', description: 'Sankt Ival besiegen', isCompleted: false },
      { id: 'decision', description: 'Kael vergeben oder verurteilen?', isCompleted: false }
    ],
    status: 'locked'
  },

  // --- KAPITEL 7: Stimme im Glas ---
  {
    id: 'MQ-20',
    title: 'Drei Scherben, eine Lüge',
    description: 'Führe die Scherben im Laternenhof zusammen.',
    region: 'Laternenhof',
    type: 'main',
    requirements: ['MQ-19'],
    rewards: [{ type: 'unlock', value: 'Asterhof Zugang', description: 'Regionen-Freischaltung' }],
    objectives: [
      { id: 'twist', description: 'Ivaras Gesteändnis hören', isCompleted: false }
    ],
    status: 'locked'
  },
  {
    id: 'MQ-21',
    title: 'Der Asterhof',
    description: 'Navigiere durch die gespiegelten Erinnerungen.',
    region: 'Scherbenkrone',
    type: 'main',
    requirements: ['MQ-20'],
    rewards: [{ type: 'unlock', value: 'Archivschlüssel', description: 'Quest-Item' }],
    objectives: [
      { id: 'mirror', description: 'Die drei Wahrheiten akzeptieren', isCompleted: false }
    ],
    status: 'locked'
  },
  {
    id: 'MQ-22',
    title: 'Die Stimme im Glas',
    description: 'Stelle dich Sereths Hand im Finale.',
    region: 'Scherbenkrone',
    type: 'main',
    requirements: ['MQ-21'],
    rewards: [{ type: 'unlock', value: 'Reliktwaffe Stufe 1', description: 'Ausrüstung' }],
    objectives: [
      { id: 'sereth', description: 'Sereths Hand besiegen', isCompleted: false },
      { id: 'decision', description: 'Wähle das Ende: Lichtbann, Bindeschwur oder Verewigung', isCompleted: false }
    ],
    status: 'locked'
  }
];

export const NPCS: NPC[] = [
  { id: 'ellin', name: 'Ellin Fracht', role: 'Dorfherrin', region: 'Graumarsch', arc: 'Verlust zu Neuanfang', status: 'unknown', bonus: { stat: 'scrapMult', value: 10 } },
  { id: 'jorik', name: 'Jorik Dammwächter', role: 'Veteran', region: 'Graumarsch', arc: 'Schuld zu Sühne', status: 'unknown', bonus: { stat: 'armor', value: 2 } },
  { id: 'mara', name: 'Mara Esch', role: 'Schifferin', region: 'Graumarsch', arc: 'Trauer zu Mut', status: 'unknown', bonus: { stat: 'speedMult', value: 5 } },
  { id: 'lyra', name: 'Lyra Dorn', role: 'Jägerin', region: 'Graumarsch', arc: 'Rache zu Verantwortung', status: 'recruited', bonus: { stat: 'critChance', value: 5 } },
  { id: 'mira', name: 'Mira Voss', role: 'Archivgelehrte', region: 'Graumarsch', arc: 'Zynismus zu Einsatz', status: 'unknown', bonus: { stat: 'techMult', value: 10 } },
  { id: 'tarek', name: 'Tarek al-Sahir', role: 'Karawanensohn', region: 'Sonnenglasweite', arc: 'Flucht zu Bindung', status: 'unknown', bonus: { stat: 'pickupRadius', value: 15 } },
  { id: 'siofra', name: 'Siofra Nhal', role: 'Wurzelchor-Kind', region: 'Wurzelwald', arc: 'Kollektiv zu eigener Stimme', status: 'unknown', bonus: { stat: 'statusChance', value: 10 } },
  { id: 'brannok', name: 'Brannok Reef', role: 'Ex-Freibeuter', region: 'Eisenbrandküste', arc: 'Wut zu Loyalität', status: 'unknown', bonus: { stat: 'damageBonus', value: 5 } },
  { id: 'edda', name: 'Edda Falkenlicht', role: 'entehrte Adlige', region: 'Hochkamm', arc: 'Pflicht zu Gerechtigkeit', status: 'unknown', bonus: { stat: 'armor', value: 3 } },
  { id: 'kael', name: 'Kael Nhar', role: 'Schachtflüchtling', region: 'Dunkelgrund', arc: 'Selbstschutz zu Wiedergutmachung', status: 'unknown', bonus: { stat: 'lifesteal', value: 2 } }
];
