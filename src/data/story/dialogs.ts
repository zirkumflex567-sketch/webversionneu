import { DialogNode } from '../../store/StoryStore';
import { useStoryStore } from '../../store/StoryStore';

export const DIALOGS: Record<string, DialogNode> = {
  // MQ-01 Decision
  'mq01_decision': {
    id: 'mq01_decision',
    speaker: 'Jorik Dammwächter',
    text: 'Die Flut kommt schneller als gedacht. Wir können nicht alles retten. Die Räucherei sichert unsere Nahrung, aber in der Schule hocken die Kinder. Wo sollen wir die Barrikaden verstärken?',
    options: [
      { 
        text: 'Rettet die Räucherei! Ohne Vorräte überleben wir den Winter nicht.', 
        action: () => {
          useStoryStore.getState().setFlag('mq01_saved_smokehouse', true);
          useStoryStore.getState().updateObjective('MQ-01', 'decision', true);
        },
        nextId: 'mq01_smokehouse_outcome'
      },
      { 
        text: 'Die Schule hat Priorität. Gebäude kann man neu bauen, Seelen nicht.', 
        action: () => {
          useStoryStore.getState().setFlag('mq01_saved_school', true);
          useStoryStore.getState().updateObjective('MQ-01', 'decision', true);
        },
        nextId: 'mq01_school_outcome'
      }
    ]
  },
  'mq01_smokehouse_outcome': {
    id: 'mq01_smokehouse_outcome',
    speaker: 'Jorik Dammwächter',
    text: 'Verstanden. Die Vorräte sind sicher. Aber der Schrei aus der Schule... den werden wir so schnell nicht vergessen.',
    options: [{ text: 'Wir mussten wählen.' }]
  },
  'mq01_school_outcome': {
    id: 'mq01_school_outcome',
    speaker: 'Jorik Dammwächter',
    text: 'Die Kinder sind sicher im Keller. Aber unsere Netze und der Fisch... der Winter wird hart und hungrig.',
    options: [{ text: 'Wir werden einen Weg finden.' }]
  },
  
  // NPC Greetings
  'lyra_greeting': {
    id: 'lyra_greeting',
    speaker: 'Lyra Dorn',
    text: 'Die Schatten in der Graumarsch werden länger. Meine Klingen sind bereit, solange du den Kurs hältst. Was gibt es zu berichten?',
    options: [
      { text: 'Wie ist die Lage im Sektor?', nextId: 'lyra_sector_info' },
      { text: 'Nur auf der Durchreise.' }
    ]
  },
  'lyra_sector_info': {
    id: 'lyra_sector_info',
    speaker: 'Lyra Dorn',
    text: 'Die Schemen ziehen sich zurück, aber sie lauern. Wir haben Fackelruh gesichert, doch der Preis war hoch. Wir müssen wachsam bleiben.',
    options: [{ text: 'Verstanden.' }]
  },
  'ellin_greeting': {
    id: 'ellin_greeting',
    speaker: 'Ellin Fracht',
    text: 'Ah, unser Pilot. Der Schrott stapelt sich, aber die Moral ist... nun ja, vorhanden. Suchst du Arbeit oder nur Gesellschaft?',
    options: [
      { text: 'Gibt es neue Handelsrouten?', nextId: 'ellin_trade_info' },
      { text: 'Ich schau mich nur um.' }
    ]
  },
  'ellin_trade_info': {
    id: 'ellin_trade_info',
    speaker: 'Ellin Fracht',
    text: 'Sonnenglasweite ist immer noch ein Risiko, aber der Profit lockt. Wenn wir den Laternenhof stabilisieren, können wir die Karawanen wieder losschicken.',
    options: [{ text: 'Klingt nach einem Plan.' }]
  },
  'jorik_greeting': {
    id: 'jorik_greeting',
    speaker: 'Jorik Dammwächter',
    text: 'Ein alter Soldat wie ich sieht vieles kommen und gehen. Aber dieser Nebel... der ist anders. Er frisst die Seele der Stadt. Hast du deine Waffen poliert?',
    options: [
      { text: 'Erzähl mir von früher.', nextId: 'jorik_lore' },
      { text: 'Immer bereit.' }
    ]
  },
  'jorik_lore': {
    id: 'jorik_lore',
    speaker: 'Jorik Dammwächter',
    text: 'Früher gab es keine Laternen. Wir hatten die Sonne. Aber das ist eine Geschichte für einen Abend mit mehr Schnaps.',
    options: [{ text: 'Ein andermal vielleicht.' }]
  },
  
  // MQ-02 Dialogs
  'mq02_intro': {
    id: 'mq02_intro',
    speaker: 'Mara Esch',
    text: 'Das Feuer frisst Fackelruh. Wir haben nur Minuten. Die Schiffe am Ufer sind unsere einzige Chance. Hilf mir, den Weg freizumachen!',
    options: [
      { text: 'Ich sichere die Flanke.', nextId: 'mq02_flee' },
      { text: 'Wo sind die Kinder?', nextId: 'mq02_flee' }
    ]
  },
  'mq02_flee': {
    id: 'mq02_flee',
    speaker: 'Mara Esch',
    text: 'Schnell! Der Nebel vermischt sich mit dem Rauch. Ich sehe Schemen im Schlamm. Halt sie auf, bis das letzte Boot abgelegt hat!',
    options: [
      { 
        text: 'Ich gebe euch Deckung.', 
        action: () => {
          useStoryStore.getState().updateObjective('MQ-02', 'flee', true);
        }
      }
    ]
  },
  'mq02_arrival': {
    id: 'mq02_arrival',
    speaker: 'Mara Esch',
    text: 'Wir haben es geschafft... zumindest weg vom Feuer. Aber die Graumarsch ist grausam zu jenen ohne Licht. Wir müssen zum Laternenhof.',
    options: [
      { 
        text: 'Ich werde uns hinführen.', 
        action: () => {
          useStoryStore.getState().updateObjective('MQ-02', 'items', true);
          useStoryStore.getState().updateQuestStatus('MQ-02', 'ready_to_turn_in');
        }
      }
    ]
  },
  
  // Mira Voss & Archives
  'mira_greeting': {
    id: 'mira_greeting',
    speaker: 'Mira Voss',
    text: 'Vorsicht mit diesen Fragmenten, Pilot. Sie schwingen noch immer in der Frequenz der Glasbestie. Was kann ich für unsere Forschung tun?',
    options: [
      { text: 'Was hast du über die Sonnenglasweite herausgefunden?', nextId: 'mira_glass_plains' },
      { text: 'Nur ein kurzer Besuch.' }
    ]
  },
  'mira_glass_plains': {
    id: 'mira_glass_plains',
    speaker: 'Mira Voss',
    text: 'Es ist ein Ort der Echos. Das Glas dort speichert die Erinnerungen an das Licht, aber es bricht sie in tödliche Splitter. Ohne eine Polarisations-Linse werden wir dort blind sein.',
    options: [{ text: 'Wir werden eine finden.' }]
  },
  'archives_intro': {
    id: 'archives_intro',
    speaker: 'System-Terminal',
    text: '[ARCHIV-ZUGRIFF GEWÄHRT] ... Lade Datenfragmente aus Sektor Graumarsch ... Bitte wählen Sie einen Datensatz zur Dekomprimierung.',
    options: [
      { text: 'Lade Bericht: Die Erste Laterne', action: () => console.log('Lore reading...') },
      { text: 'Terminal schließen' }
    ]
  },

  // LYRA DORN - Expanded Dialogue Trees
  'lyra_backstory': {
    id: 'lyra_backstory',
    speaker: 'Lyra Dorn',
    text: 'Fackelruh war mein Zuhause, bevor der Nebel kam. Ich war nicht immer eine Jägerin. Mein Vater war der Schmied. Er hat mir diese Klinge gegeben, und mit ihr habe ich gelernt, was Rache bedeutet.',
    options: [
      { text: 'Rache gegen wen?', nextId: 'lyra_backstory_revenge' },
      { text: 'Das tut mir leid für dich.' }
    ]
  },
  'lyra_backstory_revenge': {
    id: 'lyra_backstory_revenge',
    speaker: 'Lyra Dorn',
    text: 'Die Schemen nahmen vieles von mir. Meine Familie. Mein Dorf. Aber sie konnten meine Entschlossenheit nicht nehmen. Jeden den ich abschieße, ist einer weniger, der unschuldige Leben gefährdet.',
    options: [
      {
        text: 'Ich verstehe. Lass mich dir helfen.',
        action: () => {
          useStoryStore.getState().addCharacterBonus('lyra_dorn', { critChancePercent: 5 });
          useStoryStore.getState().setFlag('lyra_trusted', true);
        }
      },
      { text: 'Das ist ein schweres Schicksal.' }
    ]
  },
  'lyra_skills': {
    id: 'lyra_skills',
    speaker: 'Lyra Dorn',
    text: 'Meine Schusskunst kommt aus Jahren der Praxis. Markierungen, Kritische Treffer, Überleben unter unmöglichen Bedingungen. Du fragst, wie ich es mache? Konzentration und ein steiles Herz.',
    options: [
      { text: 'Kannst du mir trainieren?', nextId: 'lyra_training' },
      { text: 'Beeindruckend.' }
    ]
  },
  'lyra_training': {
    id: 'lyra_training',
    speaker: 'Lyra Dorn',
    text: 'Gut. Wir beginnen mit Grundlagen: Positionierung, Atemkontrolle, Zielauswahl. Wenn du glaubst, du kannst mehr ertragen als Schmerz, dann komm morgen früh zurück.',
    options: [{ text: 'Ich werde da sein.' }]
  },

  // MARA ESCH - Expanded Dialogue Trees
  'mara_escape': {
    id: 'mara_escape',
    speaker: 'Mara Esch',
    text: 'Als Schifferin habe ich gelernt, dass Wasser nicht nur Wege öffnet—es versteckt auch Fluchtrouten. Die Graumarsch hat viele Kanäle, die auf keiner Karte eingezeichnet sind. Mein altes Leben war auf dem Fluss. Mein neues Leben ist hier an Land.',
    options: [
      { text: 'Erzähl mir von deinem alten Leben.', nextId: 'mara_river_story' },
      { text: 'Die Graumarsch hält wenig Geheimnisse.' }
    ]
  },
  'mara_river_story': {
    id: 'mara_river_story',
    speaker: 'Mara Esch',
    text: 'Ich bin eine Flussfährerin des Kristallstroms aufgewachsen. Wir hätten alles haben können—Wohlstand, Sicherheit. Aber dann kam der Nebel und fraß uns schneller als die Flut selbst. Jetzt helfe ich anderen zu entkommen, wo ich meine Familie nicht retten konnte.',
    options: [
      {
        text: 'Ich werde nicht zögern, wenn es zählt.',
        action: () => {
          useStoryStore.getState().addCharacterBonus('mara_esch', { moveSpeedPercent: 5 });
          useStoryStore.getState().setFlag('mara_speedboost', true);
        }
      },
      { text: 'Dein Mut ist bewundernswert.' }
    ]
  },
  'mara_routes': {
    id: 'mara_routes',
    speaker: 'Mara Esch',
    text: 'Ich kenne drei sichere Routen zum Laternenhof von hier aus. Eine durch die Sümpfe—schnell, aber gefährlich. Eine über die Hügel—langsam, aber versteckt. Und eine direkt durch die Graumarsch—schnell für mich, aber nicht für dich.',
    options: [
      { text: 'Welche nimmst du?', nextId: 'mara_choice_route' }
    ]
  },
  'mara_choice_route': {
    id: 'mara_choice_route',
    speaker: 'Mara Esch',
    text: 'Ich nehme die schnelle Route. Mit meinen Fähigkeiten kann ich Schemen ausweichen. Du solltest die versteckte nehmen, wenn du allein reist. Zusammen? Wir riskieren die schnelle Sumpfroute.',
    options: [{ text: 'Lass uns gehen.' }]
  },

  // MIRA VOSS - Expanded Dialogue Trees
  'mira_archives': {
    id: 'mira_archives',
    speaker: 'Mira Voss',
    text: 'Das Archiv ist das Herz von Laternenhof. Alle Wissen über die Welt vor dem Nebel liegt hier—eingeprägt in Kristallen, die noch immer schwingen. Ich widme mein Leben ihrer Dekomprimierung und ihrem Verständnis.',
    options: [
      { text: 'Was hast du herausgefunden?', nextId: 'mira_research' },
      { text: 'Wie kann ich helfen?' }
    ]
  },
  'mira_research': {
    id: 'mira_research',
    speaker: 'Mira Voss',
    text: 'Es gibt Hinweise auf eine "Erste Laterne"—eine künstliche Sonne, die den Nebel zurücktrieb. Sie wurde zerstört. Die Sonnenglasweite ist das, was von ihr übrig ist. Wenn wir sie rekonstruieren können, könnten wir die Welt wieder hell machen.',
    options: [
      {
        text: 'Ich werde die Teile sammeln.',
        action: () => {
          useStoryStore.getState().setFlag('mira_quest_active', true);
          useStoryStore.getState().addCharacterBonus('mira_voss', { loreAccess: true });
        }
      },
      { text: 'Das klingt unmöglich.' }
    ]
  },
  'mira_guilt': {
    id: 'mira_guilt',
    speaker: 'Mira Voss',
    text: 'Mein Vater war ein der Archive, bevor ich geboren wurde. Er suchte nach Wahrheit und fand nur Trümmer. Ich mache weiter, wo er aufgehört hat. Manchmal frage ich mich, ob er sich freuen würde oder sich sorgen würde.',
    options: [
      { text: 'Du machst gute Arbeit.' },
      { text: 'Der Schmerz der Wahrheit ist besser als die Komfort der Lüge.' }
    ]
  },

  // JORIK DAMMWÄCHTER - Expanded Dialogue Trees
  'jorik_veteran': {
    id: 'jorik_veteran',
    speaker: 'Jorik Dammwächter',
    text: 'Ich bin zu lange Soldat gewesen, um nicht zu sehen, was kommt. Der Nebel ist nicht einfach ein Wetter—es ist ein Schicksal, eine Kraft, die wir nicht verstehen. Aber ich verstehe eines: Wir müssen Stärke zeigen, damit die Jungen nicht zusammenbrechen.',
    options: [
      { text: 'Wie schaffst du es, stark zu bleiben?', nextId: 'jorik_strength' },
      { text: 'Der Wille der Veteranen ist wichtig.' }
    ]
  },
  'jorik_strength': {
    id: 'jorik_strength',
    speaker: 'Jorik Dammwächter',
    text: 'Indem ich funktioniere. Indem ich die anderen anleite, ihre Arbeit verrichte, und nicht darüber nachdenke, was ich verloren habe. Armut ist Panzerung, wenn man lange genug darauf trägt. Aber Vorsicht—es verlangt einen Preis.',
    options: [
      {
        text: 'Ich werde lernen, wie man stark ist.',
        action: () => {
          useStoryStore.getState().addCharacterBonus('jorik_dammwächter', { armor: 2 });
          useStoryStore.getState().setFlag('jorik_mentor', true);
        }
      },
      { text: 'Das ist eine schwere Last.' }
    ]
  },
  'jorik_command': {
    id: 'jorik_command',
    speaker: 'Jorik Dammwächter',
    text: 'Der Laternenhof braucht Struktur. Ich war Kommandant einer Einheit, bevor der Nebel kam. Jetzt bin ich Wächter eines Hafens. Die Arbeit ist die gleiche—Menschen schützen, Hoffnung bewahren, Befehle geben, wenn Panik kommt.',
    options: [
      { text: 'Was wirst du als nächstes tun?', nextId: 'jorik_next' }
    ]
  },
  'jorik_next': {
    id: 'jorik_next',
    speaker: 'Jorik Dammwächter',
    text: 'Wir müssen die Sumpfkathedrale verstärken. Die Schemen werden bald wieder kommen—sie tun es immer. Und wir müssen bereit sein. Kommst du?',
    options: [{ text: 'Ja, ich bin dabei.' }]
  }
};
