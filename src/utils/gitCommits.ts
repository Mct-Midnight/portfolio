// Module utilitaire pour extraire et analyser l'historique des commits Git du portfolio
// Permet d'alimenter la page Journal de bord pour l'épreuve E4 et le jury BTS SIO

import { execSync } from 'node:child_process';

// Définition de l'interface d'un commit typé et documenté
export interface GitCommit {
  hash: string;             // Hash court (ex: 10dab7a)
  fullHash: string;         // Hash complet SHA-1
  date: string;             // Date au format ISO
  formattedDate: string;    // Date conviviale en français (ex: 3 octobre 2026 à 19:46)
  relativeDate: string;     // Date relative (ex: Aujourd'hui, Il y a 2 jours)
  author: string;           // Auteur du commit
  rawMessage: string;       // Titre brut du commit
  type: 'feat' | 'fix' | 'chore' | 'docs' | 'style' | 'refactor' | 'autre';
  typeLabel: string;        // Libellé vulgarisé (ex: Fonctionnalité, Correctif)
  typeBadge: string;        // Classes CSS Tailwind pour le badge
  typeDot: string;          // Couleur de la puce d'état
  scope: string | null;     // Périmètre concerné (ex: ui, skills, content)
  description: string;      // Description en français claire et capitalisée
  commitUrl: string;        // Lien hypertexte direct vers GitHub
}

// Configuration des libellés et styles selon les types de commits conventionnels
const TYPE_CONFIG: Record<
  string,
  { label: string; badge: string; dot: string; canonicalType: GitCommit['type'] }
> = {
  feat: {
    label: 'Fonctionnalité',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dot: 'bg-emerald-500',
    canonicalType: 'feat',
  },
  fix: {
    label: 'Correctif',
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
    dot: 'bg-amber-500',
    canonicalType: 'fix',
  },
  chore: {
    label: 'Maintenance',
    badge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    dot: 'bg-indigo-500',
    canonicalType: 'chore',
  },
  docs: {
    label: 'Documentation',
    badge: 'bg-zinc-100 text-zinc-700 border-zinc-200',
    dot: 'bg-zinc-500',
    canonicalType: 'docs',
  },
  style: {
    label: 'Design & Style',
    badge: 'bg-purple-50 text-purple-700 border-purple-200',
    dot: 'bg-purple-500',
    canonicalType: 'style',
  },
  refactor: {
    label: 'Refactorisation',
    badge: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    dot: 'bg-cyan-500',
    canonicalType: 'refactor',
  },
};

// Formateur de date en français calé sur le fuseau horaire officiel de Paris
function formatDateFr(isoDateString: string): string {
  try {
    const d = new Date(isoDateString);
    if (isNaN(d.getTime())) return isoDateString;
    return new Intl.DateTimeFormat('fr-FR', {
      timeZone: 'Europe/Paris',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(d);
  } catch (error) {
    console.error('Erreur lors du formatage de la date :', { isoDateString, error });
    return isoDateString;
  }
}

// Calcul d'une date relative lisible de repli (ex: "À l'instant", "Il y a 3 h", "Hier")
function formatRelativeDate(isoDateString: string): string {
  try {
    const now = new Date();
    const date = new Date(isoDateString);
    const diffMs = now.getTime() - date.getTime();
    if (isNaN(diffMs) || diffMs < 0) return 'Récemment';

    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 5) return 'À l\'instant';
    if (diffMins < 60) return `Il y a ${diffMins} min`;
    if (diffHours < 24) return `Il y a ${diffHours} h`;
    if (diffDays === 1) return 'Hier';
    if (diffDays < 30) return `Il y a ${diffDays} jours`;
    const diffMonths = Math.floor(diffDays / 30);
    return `Il y a ${diffMonths} mois`;
  } catch (error) {
    console.error('Erreur lors du calcul de la date relative :', { isoDateString, error });
    return '';
  }
}

// Analyse d'un message au format Conventional Commits : type(scope): description
function parseCommitMessage(message: string): {
  type: GitCommit['type'];
  typeLabel: string;
  typeBadge: string;
  typeDot: string;
  scope: string | null;
  description: string;
} {
  // Regex pour capturer le type, le scope optionnel et la description
  const match = message.match(/^(\w+)(?:\(([^)]+)\))?!?:\s*(.+)$/);

  if (match) {
    const rawType = match[1].toLowerCase();
    const rawScope = match[2] ? match[2].trim() : null;
    const rawDesc = match[3].trim();

    // Première lettre en majuscule pour un affichage soigné
    const description = rawDesc.charAt(0).toUpperCase() + rawDesc.slice(1);

    if (TYPE_CONFIG[rawType]) {
      const cfg = TYPE_CONFIG[rawType];
      return {
        type: cfg.canonicalType,
        typeLabel: cfg.label,
        typeBadge: cfg.badge,
        typeDot: cfg.dot,
        scope: rawScope,
        description,
      };
    }

    return {
      type: 'autre',
      typeLabel: 'Évolution',
      typeBadge: 'bg-slate-100 text-slate-700 border-slate-200',
      typeDot: 'bg-slate-400',
      scope: rawScope,
      description,
    };
  }

  // Format libre (non conventionnel)
  const description = message.charAt(0).toUpperCase() + message.slice(1);
  return {
    type: 'autre',
    typeLabel: 'Évolution',
    typeBadge: 'bg-slate-100 text-slate-700 border-slate-200',
    typeDot: 'bg-slate-400',
    scope: null,
    description,
  };
}

// Récupération de l'ensemble des commits via le dépôt Git local (historique complet sans limite)
function getLocalGitCommits(): GitCommit[] {
  try {
    // Délimiteur unique pour séparer les champs en toute fiabilité
    const delimiter = '___DELIMITER___';
    // Extraction de la totalité de l'historique pour des statistiques 100% fidèles
    const command = `git log --pretty=format:%H${delimiter}%h${delimiter}%ad${delimiter}%an${delimiter}%s --date=iso-strict`;
    const output = execSync(command, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] });

    const lines = output.trim().split('\n').filter(Boolean);
    const commits: GitCommit[] = [];

    for (const line of lines) {
      const parts = line.split(delimiter);
      if (parts.length < 5) continue;

      const [fullHash, hash, dateStr, author, rawMessage] = parts;
      const parsed = parseCommitMessage(rawMessage);

      let isoDate: string;
      try {
        isoDate = new Date(dateStr.trim()).toISOString();
      } catch {
        isoDate = dateStr.trim();
      }

      commits.push({
        fullHash: fullHash.trim(),
        hash: hash.trim(),
        date: isoDate,
        formattedDate: formatDateFr(isoDate),
        relativeDate: formatRelativeDate(isoDate),
        author: author.trim(),
        rawMessage: rawMessage.trim(),
        type: parsed.type,
        typeLabel: parsed.typeLabel,
        typeBadge: parsed.typeBadge,
        typeDot: parsed.typeDot,
        scope: parsed.scope,
        description: parsed.description,
        commitUrl: `https://github.com/Mct-Midnight/portfolio/commit/${fullHash.trim()}`,
      });
    }

    return commits;
  } catch (error) {
    console.error('Erreur lors de la lecture des commits Git en local :', error);
    return [];
  }
}

// Récupération de secours via l'API GitHub si Git local n'est pas accessible
async function getRemoteGithubCommits(): Promise<GitCommit[]> {
  try {
    const headers: Record<string, string> = {
      'User-Agent': 'Portfolio-Astro-App',
      Accept: 'application/vnd.github.v3+json',
    };
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(
      'https://api.github.com/repos/Mct-Midnight/portfolio/commits?per_page=100',
      { headers }
    );

    if (!response.ok) {
      console.error('Réponse non valide de l\'API GitHub :', {
        status: response.status,
        statusText: response.statusText,
      });
      return [];
    }

    const data = await response.json();
    if (!Array.isArray(data)) return [];

    return data.map((item: any) => {
      const fullHash = item.sha;
      const hash = fullHash.substring(0, 7);
      const rawDate = item.commit?.author?.date || new Date().toISOString();
      let isoDate: string;
      try {
        isoDate = new Date(rawDate).toISOString();
      } catch {
        isoDate = rawDate;
      }
      const author = item.commit?.author?.name || 'Quentin Machu';
      const rawMessage = (item.commit?.message || '').split('\n')[0];
      const parsed = parseCommitMessage(rawMessage);

      return {
        fullHash,
        hash,
        date: isoDate,
        formattedDate: formatDateFr(isoDate),
        relativeDate: formatRelativeDate(isoDate),
        author,
        rawMessage,
        type: parsed.type,
        typeLabel: parsed.typeLabel,
        typeBadge: parsed.typeBadge,
        typeDot: parsed.typeDot,
        scope: parsed.scope,
        description: parsed.description,
        commitUrl: item.html_url || `https://github.com/Mct-Midnight/portfolio/commit/${fullHash}`,
      };
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des commits depuis l\'API GitHub :', error);
    return [];
  }
}

// Vérifie si le dépôt Git est un clone superficiel (comme sur Vercel qui clone avec une limite de 10 commits)
function isShallowRepository(): boolean {
  try {
    const isShallow = execSync('git rev-parse --is-shallow-repository', {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim();
    return isShallow === 'true';
  } catch {
    return false;
  }
}

// Fonction principale exportée : priorité au local complet, bascule automatique sur l'API GitHub sur Vercel
export async function getGitCommits(): Promise<GitCommit[]> {
  const isShallow = isShallowRepository() || process.env.VERCEL === '1' || Boolean(process.env.CI);

  // Si nous sommes sur Vercel ou dans un clone tronqué, on interroge en priorité l'API GitHub pour avoir tous les commits
  if (isShallow) {
    console.info('Environnement Vercel détecté : extraction de l\'historique complet via l\'API GitHub...');
    const remoteCommits = await getRemoteGithubCommits();
    if (remoteCommits.length > 0) {
      return remoteCommits;
    }
  }

  // Tentative en local (dépôt complet sur la machine de développement)
  const localCommits = getLocalGitCommits();
  if (localCommits.length > 0) {
    return localCommits;
  }

  // Secours via GitHub API si local a échoué
  console.info('Commits locaux indisponibles, tentative via l\'API GitHub...');
  const remoteCommits = await getRemoteGithubCommits();
  if (remoteCommits.length > 0) {
    return remoteCommits;
  }

  // Dernier recours : tableau statique pour garantir qu'aucune page ne casse
  console.warn('Aucun commit récupéré, activation du jeu de données de secours.');
  return [
    {
      fullHash: '10dab7a34b51482c38364cacfee80b940e2a74ab',
      hash: '10dab7a',
      date: '2026-10-03T17:46:16Z',
      formattedDate: '3 octobre 2026 à 19:46',
      relativeDate: 'Aujourd\'hui',
      author: 'Quentin Machu',
      rawMessage: 'fix(skills): rétablissement des icônes SVG inlinées pour Python et le bouclier JavaScript',
      type: 'fix',
      typeLabel: 'Correctif',
      typeBadge: 'bg-amber-50 text-amber-700 border-amber-200',
      typeDot: 'bg-amber-500',
      scope: 'skills',
      description: 'Rétablissement des icônes SVG inlinées pour Python et le bouclier JavaScript',
      commitUrl: 'https://github.com/Mct-Midnight/portfolio/commit/10dab7a34b51482c38364cacfee80b940e2a74ab',
    },
    {
      fullHash: 'f433038404b1ad07592bce64900456b160953955',
      hash: 'f433038',
      date: '2026-10-03T02:51:04Z',
      formattedDate: '3 octobre 2026 à 04:51',
      relativeDate: 'Aujourd\'hui',
      author: 'Quentin Machu',
      rawMessage: 'feat: initialisation et sauvegarde du portfolio',
      type: 'feat',
      typeLabel: 'Fonctionnalité',
      typeBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      typeDot: 'bg-emerald-500',
      scope: null,
      description: 'Initialisation et sauvegarde du portfolio',
      commitUrl: 'https://github.com/Mct-Midnight/portfolio/commit/f433038404b1ad07592bce64900456b160953955',
    },
  ];
}
