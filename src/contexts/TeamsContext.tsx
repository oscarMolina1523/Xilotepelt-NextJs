import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

// Define types for teams/categories
export interface Category {
  id: string;
  name: string;
  description: string;
  image?: string;
  slug: string;
  color: string;
  backgroundImage?: string;
}

interface Player {
  id: string;
  name: string;
  position: string;
  image?: string;
}

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  date: string;
  stadium: string;
  competition: string;
  matchday: string;
  homeTeamLogo?: string;
  awayTeamLogo?: string;
  played: boolean;
}

export interface TeamStanding {
  position: string;
  teamName: string;
  teamLogo: string;
  points: number;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  form: ("W" | "D" | "L")[];
  nextMatch?: {
    opponent: string;
    opponentLogo: string;
  };
  isHomeTeam?: boolean;
}

interface TeamsContextType {
  categories: Category[];
  getTeamBySlug: (slug: string) => Category | undefined;
  getTeamPlayers: (teamId: string) => Player[];
  isLoading: boolean;
  getMatches: () => Match[];
  getStandings: () => TeamStanding[];
  getNextMatch: () => Match | null;
  getTeamPhotos: () => string[];
}

// CATEGORIES
const categoriesData: Category[] = [
  // {
  //   id: "A1",
  //   name: "Masculino - Mayores",
  //   description: "Equipo principal masculino de Xilotepelt FC",
  //   slug: "masculino-mayores",
  //   color: "from-blue-700 to-blue-500",
  //   backgroundImage: "https://i.ibb.co/9mZgcXWd/masculino-mayores.webp"
  // },
  {
    id: "B2",
    name: "Juvenil - local",
    description: "Equipo juvenil, liga local de jinotepe",
    slug: "juvenil-local",
    color: "from-pink-700 to-pink-500",
    backgroundImage: "https://i.ibb.co/TMRBmCQ8/juvenil.webp",
  },
  {
    id: "C3",
    name: "Masculino - Sub 17",
    description: "Categoría juvenil masculina sub-17",
    slug: "masculino-sub-17",
    color: "from-indigo-700 to-blue-600",
    backgroundImage: "https://i.ibb.co/7J26gZVr/masculino17.webp",
  },
  {
    id: "D4",
    name: "Femenino - Sub 17",
    description: "Categoría juvenil femenina sub-17",
    slug: "femenino-sub-17",
    color: "from-purple-700 to-pink-600",
    backgroundImage: "https://i.ibb.co/MyFsm04D/femenino17.webp",
  },
  {
    id: "E5",
    name: "Masculino - Sub 15",
    description: "Categoría juvenil masculina sub-15",
    slug: "masculino-sub-15",
    color: "from-green-700 to-emerald-500",
    backgroundImage: "https://i.ibb.co/rGjMMzMH/masculino15.webp",
  },
  {
    id: "F6",
    name: "Femenino - Sub 15",
    description: "Categoría juvenil femenina sub-15",
    slug: "femenino-sub-15",
    color: "from-yellow-600 to-pink-600",
    backgroundImage: "https://i.ibb.co/HD9kZG1k/femenino15.webp",
  },
  {
    id: "G7",
    name: "Masculino - Sub 13",
    description: "Categoría infantil masculina sub-13",
    slug: "masculino-sub-13",
    color: "from-orange-600 to-red-600",
    backgroundImage: "https://i.ibb.co/pvsxSYMh/masculino13.webp",
  },
];

// JUGADORES FIJOS POR EQUIPO
const teamPlayers: Record<string, Player[]> = {
  // A1: [
  //   { id: "A1", name: "Maycol Rosales", position: "Medio Campista", image:"https://i.ibb.co/8LCmQb1L/maycol-Rosales.webp" },
  //   { id: "A2", name: "Juan López", position: "Defensa Central" },
  //   { id: "A3", name: "Luis Ramírez", position: "Delantero Centro" },
  // ],
  B2: [
    { id: "B21", name: "Andrés Carballo", position: "" , image: "https://i.ibb.co/bjQT2rGr/andres-Carballo.jpg" },
    { id: "B22", name: "Ángel Palacios", position: "", image: "https://i.ibb.co/v4QwNyqv/angel-Palacios.jpg" },
    { id: "B23", name: "Ángel Calderón", position: "" },
    { id: "B24", name: "Anthony Sevilla", position: "", image: "https://i.ibb.co/YFRJTkcd/anthony-Sevilla.jpg" },
    { id: "B25", name: "Benjamín Áreas", position: "", image: "https://i.ibb.co/TsbfB6M/benjamin-Areas.jpg" },
    { id: "B26", name: "Dereck Carranza", position: "", image: "https://i.ibb.co/LdMHnRQL/dereck-Carranza.jpg" },
    { id: "B27", name: "Eliecer Lara", position: "", image: "https://i.ibb.co/jPy3Ts4q/eliezer-Lara.jpg" },
    { id: "B28", name: "Gabriel Espinoza", position: "", image: "https://i.ibb.co/sdsf1zZ8/gabriel-Espinoza.jpg" },
    { id: "B28", name: "Gabriel Sanchez", position: "", image: "https://i.ibb.co/p6jchZ21/gabriel-Sanchez.jpg" },
    { id: "B29", name: "Gabriel Gaitán", position: "" , image: "https://i.ibb.co/bR2kRy95/gabriel-Gaitan.jpg" },
    { id: "B30", name: "Gustavo Zuniga", position: "", image: "https://i.ibb.co/6Q7MVHX/gustavo-Zuniga.jpg" },
    { id: "B31", name: "Javier Vélez", position: "" , image: "https://i.ibb.co/GNQmWKt/alexander-Velez.jpg" },
    { id: "B32", name: "Jesús Zuniga", position: "", image: "https://i.ibb.co/23Krw4kc/jesus-Zuniga.jpg" },
    { id: "B33", name: "Jonathan Espinoza", position: "", image: "https://i.ibb.co/Y421jTnQ/jonathan-Espinoza.jpg" },
    { id: "B35", name: "Josué Hernandez", position: "" , image: "https://i.ibb.co/FLTNWQvq/jose-Espinoza.jpg" },
    { id: "B36", name: "Julio Rodríguez", position: "" , image: "https://i.ibb.co/TBFTx4QZ/julio-Rodriguez.jpg" },
    { id: "B37", name: "Junior Obando", position: "" , image: "https://i.ibb.co/wN6hDrcJ/junior-Obando.jpg" },
    { id: "B38", name: "Kevin Martínez", position: "" , image: "https://i.ibb.co/842Gwc2V/kevin-Martinez.jpg" },
    { id: "B39", name: "Donaldo Hernández", position: "", image: "https://i.ibb.co/Z6jLNB8s/donaldo-Hernandez.jpg" },
    { id: "B40", name: "Josué Hernández", position: "" },
    { id: "B41", name: "Neville Serrano", position: "" },
    { id: "B42", name: "Yefry Esteban", position: "", image: "https://i.ibb.co/0jtyFtrD/yefry-Esteban.jpg" },
    { id: "B43", name: "José Nicoya", position: "" },
    { id: "B44", name: "Ismael Cárdenas", position: "", image: "https://i.ibb.co/WWyG2XWC/ismael-Cardenas.jpg" },
    { id: "B45", name: "Santiago García", position: "", image: "https://i.ibb.co/hFw3TZqT/santiago-Garcia.jpg" },
  ],
  C3: [
    { id: "C31", name: "Bexael Vega", position: "" },
    { id: "C32", name: "Camilo Ramos", position: "" },
    { id: "C33", name: "Josthing Gutierrez", position: "" },
    { id: "C34", name: "Maykel Larios", position: "" },
    { id: "C35", name: "Mariano Gago", position: "" },
    { id: "C36", name: "Santiago Garcia", position: "" },
    { id: "C37", name: "Roger Paramo", position: "" },
    { id: "C38", name: "Yesniel Aburto", position: "" },
    { id: "C39", name: "Yahir Campos", position: "" },
    { id: "C310", name: "Jose Morales", position: "" },
    { id: "C311", name: "Franco Espinoza", position: "" },
    { id: "C312", name: "Samuel Jimenez", position: "" },
    { id: "C313", name: "Kendrus Narvaez", position: "" },
    { id: "C314", name: "Sneyjder Quintero", position: "" },
    { id: "C315", name: "Gerald Zeledon", position: "" },
    { id: "C316", name: "Camilo Garay", position: "" },
    { id: "C317", name: "Darwin Gonzalez", position: "" },
    { id: "C318", name: "Jose Espinoza", position: "" },
    { id: "C319", name: "Ronal Perez", position: "" },
    { id: "C320", name: "Alex Ortiz", position: "" },
    { id: "C321", name: "Eddy Acuña", position: "" },
    { id: "C322", name: "Jurem Cruz", position: "" },
    { id: "C323", name: "Yanier Chavez", position: "" },
  ],
  D4: [
    { id: "D41", name: "Yerlin Romero", position: "" },
    { id: "D42", name: "Thyra Cortez", position: "" },
    { id: "D43", name: "Liuva Velez", position: "" },
    { id: "D44", name: "Angeles López", position: "" },
    { id: "D45", name: "Baleska Cruz", position: "" },
    { id: "D46", name: "Lea Barreda", position: "" },
    { id: "D47", name: "Kelly Pavón", position: "" },
    { id: "D48", name: "Maria Hernández", position: "" },
    { id: "D49", name: "Emely Reyes", position: "" },
    { id: "D410", name: "Nelly Pavón", position: "" },
    { id: "D411", name: "Valeska Silva", position: "" },
    { id: "D412", name: "Maria González", position: "" },
    { id: "D413", name: "Génesis Rodrígez", position: "" },
    { id: "D414", name: "Ashly Ortiz", position: "" },
    { id: "D415", name: "Ashly Gutiérrez", position: "" },
    { id: "D416", name: "Yunely Nicaragua", position: "" },
    { id: "D417", name: "Alondra Espinoza", position: "" },
    { id: "D418", name: "Kimberling Jiménez", position: "" },
    { id: "D419", name: "Litzy Quiroz", position: "" },
  ],
  E5: [
    { id: "E52", name: "Eduardo Mena", position: "" },
    { id: "E53", name: "Amilkar Lopez", position: "" },
    { id: "E54", name: "Roger Toruño", position: "" },
    { id: "E55", name: "Dereck Gonzalez", position: "" },
    { id: "E56", name: "Reynaldo Lopez", position: "" },
    { id: "E57", name: "Luis Borge", position: "" },
    { id: "E58", name: "Steven Bermudez", position: "" },
    { id: "E59", name: "Mateo Chavez", position: "" },
    { id: "E510", name: "Jesus Zuniga", position: "" },
    { id: "E511", name: "Jostin Vado", position: "" },
    { id: "E512", name: "Cristhofer Vega", position: "" },
    { id: "E513", name: "Matthew Valerio", position: "" },
    { id: "E514", name: "Javier Lopez", position: "" },
    { id: "E515", name: "Izafrank Garcia", position: "" },
    { id: "E516", name: "Fernando Ramos", position: "" },
    { id: "E517", name: "Kenneth Medina", position: "" },
    { id: "E518", name: "Jairo Montiel", position: "" },
    { id: "E519", name: "Jostyn Garcia", position: "" },
    { id: "E520", name: "Enmanuel Hernandez", position: "" },
    { id: "E521", name: "Maycon Vanegas", position: "" },
    { id: "E522", name: "Leonel Narvaez", position: "" },
    { id: "E523", name: "Eyner Calero", position: "" },
    { id: "E524", name: "Zahid Saenz", position: "" },
    { id: "E525", name: "Steven Velasquez", position: "" },
  ],
  F6: [
    { id: "F61", name: "Noemi Aguirre", position: "" },
    { id: "F62", name: "Jancy Gutierrez", position: "" },
    { id: "F63", name: "Nathaly Jarquin", position: "" },
    { id: "F64", name: "Genesis Rocha", position: "" },
    { id: "F65", name: "Maria Pérez", position: "" },
    { id: "F66", name: "Nicole Garcia", position: "" },
    { id: "F67", name: "Aldelys Hernandez", position: "" },
    { id: "F68", name: "Claudia Cubillo", position: "" },
    { id: "F69", name: "Cheysi Arana", position: "" },
    { id: "F610", name: "Angie Cortez", position: "" },
    { id: "F611", name: "Daphne Nicaragua", position: "" },
    { id: "F612", name: "Myurell Berroteran", position: "" },
    { id: "F613", name: "Ashley Guevara", position: "" },
    { id: "F614", name: "Denisa Jiménez", position: "" },
    { id: "F615", name: "Esther Berroteran", position: "" },
    { id: "F616", name: "Nathaly Rodríguez", position: "" },
    { id: "F617", name: "Yurisma Rocha", position: "" },
    { id: "F618", name: "Gelen Hernández", position: "" },
    { id: "F619", name: "Valery Luna", position: "" },
    { id: "F620", name: "Lizbeth Chávez", position: "" },
    { id: "F621", name: "Sharon Narvaez", position: "" },
    { id: "F622", name: "Kristin Cárdenas", position: "" },
    { id: "F623", name: "Virginia Umaña", position: "" },
    { id: "F624", name: "Nara Sanchez", position: "" },
  ],
  G7: [
    { id: "G71", name: "Jose Jarquin", position: "" },
    { id: "G72", name: "Ian Castillo", position: "" },
    { id: "G73", name: "Jelsing Matus", position: "" },
    { id: "G74", name: "Jostin Rodriguez", position: "" },
    { id: "G75", name: "Julian Medrano", position: "" },
    { id: "G76", name: "Andres Garcia", position: "" },
    { id: "G77", name: "Carlos Rojas", position: "" },
    { id: "G78", name: "Eli Hernandez", position: "" },
    { id: "G79", name: "Cristhofer Bonilla", position: "" },
    { id: "G710", name: "Snaider Narvaez", position: "" },
    { id: "G711", name: "Hamssell Castro", position: "" },
    { id: "G712", name: "Neymar Baquedano", position: "" },
    { id: "G713", name: "Pablo Aburto", position: "" },
    { id: "G714", name: "Alex Hernandez", position: "" },
    { id: "G715", name: "Santiago Silva", position: "" },
    { id: "G716", name: "Rodrigo Gonzalez", position: "" },
    { id: "G717", name: "Elias Cortez", position: "" },
    { id: "G718", name: "Henry Palacios", position: "" },
    { id: "G719", name: "Caleb Cortez", position: "" },
    { id: "G720", name: "Jared Perez", position: "" },
    { id: "G721", name: "Bruno Matus", position: "" },
    { id: "G722", name: "Bagner Umaña", position: "" },
    { id: "G723", name: "Luis Mora", position: "" },
  ],
};

// RESULTADOS
const matchesData: Match[] = [
  {
    id: "match1",
    homeTeam: "Atletico Rivas",
    awayTeam: "Xilotepelt FC",
    homeScore: 2,
    awayScore: 0,
    date: "2025-04-13T15:00:00",
    stadium: "Rivas",
    competition: "II Division",
    matchday: "Jornada 14",
    homeTeamLogo: "https://i.ibb.co/zHXxvMZB/atletico-Rivas-FC.webp",
    awayTeamLogo: "/xilo-logo.webp",
    played: true,
  },
  {
    id: "match2",
    homeTeam: "Xilotepelt FC",
    awayTeam: "Tipitapa",
    homeScore: 3,
    awayScore: 0,
    date: "2024-04-15T16:00:00",
    stadium: "Rivas",
    competition: "II Division",
    matchday: "Octavos de Final / IDA",
    homeTeamLogo: "/xilo-logo.webp",
    awayTeamLogo:
      "https://diriangenfc.com/wp-content/uploads/2025/03/Picsart_25-03-30_00-01-21-080-2-400x400.jpg",
    played: true,
  },
  // {
  //   id: "match3",
  //   homeTeam: "Xilotepelt FC",
  //   awayTeam: "Managua FC",
  //   homeScore: 2,
  //   awayScore: 0,
  //   date: "2024-03-27T15:30:00",
  //   stadium: "Estadio Roy Fernando Bermúdez",
  //   competition: "Liga Primera",
  //   matchday: "Jornada 10",
  //   homeTeamLogo: "/xilo-logo.webp",
  //   awayTeamLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5UzfKVb0qMWwK9bq65JzwZ55qSLTUJcAwzA&s",
  //   played: true
  // },
  {
    id: "match4",
    homeTeam: "Tipitapa",
    awayTeam: "Xilotepelt FC",
    homeScore: 0,
    awayScore: 0,
    date: "2025-05-11T10:00:00",
    stadium: "Campo La Villa",
    competition: "II Division",
    matchday: "Octavos de Final / VUELTA",
    homeTeamLogo:
      "https://diriangenfc.com/wp-content/uploads/2025/03/Picsart_25-03-30_00-01-21-080-2-400x400.jpg",
    awayTeamLogo: "/xilo-logo.webp",
    played: false,
  },
];

// CLASIFICACIÓN
const standingsData: TeamStanding[] = [
  {
    position: "kjbkjsb1",
    teamName: "San Marcos FC",
    teamLogo: "https://i.ibb.co/nNLmDbm4/san-Marcos-FC.webp",
    points: 37,
    played: 13,
    wins: 12,
    draws: 0,
    losses: 1,
    goalsFor: 51,
    goalsAgainst: 14,
    goalDifference: 37,
    form: ["W", "W", "L", "W", "D"],
  },
  {
    position: "hvkskKHBkbG",
    teamName: "Atletico Rivas",
    teamLogo: "https://i.ibb.co/zHXxvMZB/atletico-Rivas-FC.webp",
    points: 25,
    played: 13,
    wins: 8,
    draws: 4,
    losses: 1,
    goalsFor: 37,
    goalsAgainst: 29,
    goalDifference: 8,
    form: ["L", "W", "D", "W", "W"],
  },
  {
    position: "khabcknaJGVjhh5",
    teamName: "Xilotepelt FC",
    teamLogo: "/xilo-logo.webp",
    points: 22,
    played: 13,
    wins: 6,
    draws: 3,
    losses: 4,
    goalsFor: 24,
    goalsAgainst: 23,
    goalDifference: 1,
    form: ["W", "D", "W", "W", "L"],
    isHomeTeam: true,
  },
  {
    position: "jksbvsbb51151",
    teamName: "Minsa FetSalud FC",
    teamLogo: "https://i.ibb.co/C3d01YC8/minsa-Fet-Salud.webp",
    points: 19,
    played: 13,
    wins: 6,
    draws: 6,
    losses: 1,
    goalsFor: 24,
    goalsAgainst: 24,
    goalDifference: 0,
    form: ["L", "D", "W", "L", "W"],
  },
  {
    position: "jvsshk6516516",
    teamName: "San Fernando FC",
    teamLogo: "https://i.ibb.co/MyK4NHD0/san-Fernando-FC.webp",
    points: 15,
    played: 13,
    wins: 4,
    draws: 6,
    losses: 3,
    goalsFor: 30,
    goalsAgainst: 28,
    goalDifference: 2,
    form: ["D", "L", "W", "D", "W"],
  },
  {
    position: "hkbkjsbk651651d",
    teamName: "Real Granada FC",
    teamLogo: "https://i.ibb.co/NgnHzMfg/real-Granada-FC.webp",
    points: 13,
    played: 13,
    wins: 3,
    draws: 6,
    losses: 4,
    goalsFor: 26,
    goalsAgainst: 36,
    goalDifference: -10,
    form: ["L", "W", "L", "D", "W"],
  },
  {
    position: "ksbkjsbjñnahiu545",
    teamName: "Rio San Juan",
    teamLogo: "https://i.ibb.co/XZzTGjLW/rio-San-Juan-FC.webp",
    points: 12,
    played: 13,
    wins: 3,
    draws: 7,
    losses: 3,
    goalsFor: 26,
    goalsAgainst: 38,
    goalDifference: -12,
    form: ["L", "L", "W", "L", "W"],
  },
  {
    position: "skbksjkbhVJVJVjg5",
    teamName: "ACD Real Xolotlán",
    teamLogo: "https://i.ibb.co/Pvm6QhPf/real-Xolotlan.webp",
    points: 3,
    played: 13,
    wins: 0,
    draws: 10,
    losses: 3,
    goalsFor: 11,
    goalsAgainst: 37,
    goalDifference: -26,
    form: ["L", "L", "W", "L", "L"],
  },
];

// Imágenes del equipo
const teamPhotos: string[] = [
  "https://i.ibb.co/SXyPt1Hd/futbolteam.webp",
  "https://i.ibb.co/8Qhcv9g/player.webp",
  "https://i.ibb.co/pBQhbxxQ/player2.webp",
  "https://i.ibb.co/1tz1bm6b/player3.webp",
  "https://i.ibb.co/Jw7RPzZH/player4.webp",
  "https://i.ibb.co/23spDQtX/player5.webp",
];

// CONTEXT
const TeamsContext = createContext<TeamsContextType | undefined>(undefined);

export function TeamsProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  const getTeamBySlug = useCallback((slug: string): Category | undefined => {
    return categoriesData.find((category) => category.slug === slug);
  }, []);

  const getTeamPlayers = useCallback((teamId: string): Player[] => {
    setIsLoading(true);

    const players = teamPlayers[teamId] || [];

    setTimeout(() => setIsLoading(false), 300);

    return players;
  }, []);

  const getMatches = useCallback((): Match[] => {
    return matchesData;
  }, []);

  const getStandings = useCallback((): TeamStanding[] => {
    return standingsData;
  }, []);

  const getNextMatch = useCallback((): Match | null => {
    const now = new Date();
    const futureMatches = matchesData
      .filter((match) => !match.played && new Date(match.date) > now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return futureMatches.length > 0 ? futureMatches[0] : null;
  }, []);

  const getTeamPhotos = useCallback((): string[] => {
    return teamPhotos;
  }, []);

  const value = {
    categories: categoriesData,
    getTeamBySlug,
    getTeamPlayers,
    isLoading,
    getMatches,
    getStandings,
    getNextMatch,
    getTeamPhotos,
  };

  return (
    <TeamsContext.Provider value={value}>{children}</TeamsContext.Provider>
  );
}

export function useTeams() {
  const context = useContext(TeamsContext);

  if (context === undefined) {
    throw new Error("useTeams must be used within a TeamsProvider");
  }

  return context;
}
