import {
  IoArrowDown,
  IoArrowUp,
  IoBookmarkOutline,
  IoChatbubbleOutline,
  IoChevronDown,
  IoEllipsisHorizontal,
  IoPersonCircleOutline,
  IoShareSocialOutline,
} from 'react-icons/io5';

// --- DATA STRUCTURES & MOCK DATA ---

interface User {
  name: string;
  avatarUrl?: string;
}

interface Post {
  id: string;
  author: User;
  timestamp: string;
  title: string;
  body: string;
  votes: number;
  comments: number;
}

const mockPosts: Post[] = [
  {
    id: 'post-1',
    author: { name: 'ana-dev', avatarUrl: 'https://i.pravatar.cc/40?u=ana-dev' },
    timestamp: 'hace 2 horas',
    title: 'Explorando Nuevos Paradigmas en Diseño de Interfaces',
    body: 'El diseño de interfaces ha evolucionado más allá de simples cajas y texto. Ahora se trata de crear experiencias fluidas y significativas. Este nuevo diseño intenta capturar esa esencia con más espacio, tipografía clara y una jerarquía visual intencionada.',
    votes: 1488,
    comments: 42,
  },
  {
    id: 'post-2',
    author: { name: 'carlos-creative', avatarUrl: 'https://i.pravatar.cc/40?u=carlos-creative' },
    timestamp: 'hace 5 horas',
    title: 'La importancia del feedback en el proceso iterativo',
    body: 'Recibir críticas constructivas es fundamental. Cada iteración nos acerca a un producto más pulido y centrado en el usuario. ¿Qué opinan de esta nueva dirección visual?',
    votes: 934,
    comments: 29,
  },
];

const communityDetails = {
  description: 'Un espacio para innovar en diseño y desarrollo de componentes web.',
  members: 28300,
  online: 4100,
  bannerUrl: 'https://media.sproutsocial.com/uploads/3a_facebook-cover-photo_labels@2x-1.png',
  rules: [
    { title: 'Mantén una actitud constructiva', content: 'Todas las opiniones son válidas si se presentan con respeto.' },
    { title: 'Contenido relevante', content: 'Publica sobre temas de diseño, UI/UX, y desarrollo frontend.' },
    { title: 'Sin autopromoción excesiva', content: 'Comparte tus proyectos, pero evita el spam.' },
  ],
};

const formatNumber = ( num: number ): string => {
  return new Intl.NumberFormat( 'es-ES', {
    notation: 'compact',
    maximumFractionDigits: 1,
  } ).format( num );
};


// --- SUB-COMPONENTS ---

const CommunityHeader = ( { slug }: { slug: string; } ) => (
  <div className="relative h-56 w-full mb-8 rounded-lg flex items-end p-6 sm:p-8 bg-cover bg-center text-white">
    <div className="absolute inset-0 bg-cover bg-center rounded-lg" style={ { backgroundImage: `url(${ communityDetails.bannerUrl })` } }></div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-lg"></div>
    <div className="relative z-10 w-full flex flex-col sm:flex-row justify-between sm:items-end gap-4">
      <div>
        <h1 className="text-4xl font-bold [text-shadow:1px_1px_4px_rgb(0_0_0_/_0.8)]">r/{ slug }</h1>
        <p className="mt-1 text-slate-200 [text-shadow:1px_1px_2px_rgb(0_0_0_/_0.7)]">{ communityDetails.description }</p>
      </div>
      <button className="bg-blue-600 w-full sm:w-auto text-white font-semibold py-2 px-6 rounded-full transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:ring-offset-slate-900 flex-shrink-0">
        Unirse
      </button>
    </div>
  </div>
);

const PostAuthor = ( { author, timestamp }: { author: User; timestamp: string; } ) => (
  <div className="flex items-center gap-x-3">
    <img src={ author.avatarUrl } alt={ `Avatar de ${ author.name }` } className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700" />
    <div>
      <p className="font-semibold text-slate-800 dark:text-slate-200">{ author.name }</p>
      <p className="text-xs text-slate-500 dark:text-slate-400">{ timestamp }</p>
    </div>
  </div>
);

const PostActions = ( { votes, comments }: { votes: number; comments: number; } ) => (
  <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
    <div className="flex items-center gap-x-2">
      <button className="p-2 rounded-full transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
        <IoArrowUp className="h-5 w-5" />
      </button>
      <span className="font-bold text-sm min-w-[3rem] text-center">{ formatNumber( votes ) }</span>
      <button className="p-2 rounded-full transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
        <IoArrowDown className="h-5 w-5" />
      </button>
    </div>
    <div className="flex items-center gap-x-4">
      <button className="flex items-center gap-x-2 text-sm font-medium p-2 rounded-full transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
        <IoChatbubbleOutline className="h-5 w-5" />
        <span>{ formatNumber( comments ) }</span>
      </button>
      <button className="flex items-center gap-x-2 text-sm font-medium p-2 rounded-full transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
        <IoShareSocialOutline className="h-5 w-5" />
        <span>Compartir</span>
      </button>
      <button className="p-2 rounded-full transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
        <IoBookmarkOutline className="h-5 w-5" />
      </button>
    </div>
  </div>
);

const PostCard = ( { post }: { post: Post; } ) => (
  <article className="bg-white dark:bg-slate-900 rounded-xl shadow-md p-6 transition-shadow duration-300 hover:shadow-xl">
    <PostAuthor author={ post.author } timestamp={ post.timestamp } />
    <div className="mt-4">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{ post.title }</h2>
      <p className="text-slate-600 dark:text-slate-300 mt-2">{ post.body }</p>
    </div>
    <PostActions votes={ post.votes } comments={ post.comments } />
  </article>
);

const RuleItem = ( { rule }: { rule: { title: string; content: string; }; } ) => (
  <details className="group border-b border-slate-200 dark:border-slate-800 py-3 last:border-b-0">
    <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
      <span>{ rule.title }</span>
      <IoChevronDown className="h-5 w-5 text-slate-500 transition-transform duration-300 group-open:rotate-180" />
    </summary>
    <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm">{ rule.content }</p>
  </details>
);

const CommunityInfoPanel = () => (
  <aside className="sticky top-8">
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md p-6">
      <h3 className="text-lg font-bold">Información de la Comunidad</h3>
      <div className="flex justify-around my-4">
        <div className="text-center">
          <p className="text-xl font-bold">{ formatNumber( communityDetails.members ) }</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Miembros</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold">{ formatNumber( communityDetails.online ) }</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">En Línea</p>
        </div>
      </div>
      <h4 className="font-bold mt-6 mb-2">Reglas</h4>
      <div>
        { communityDetails.rules.map( ( rule, index ) => <RuleItem key={ index } rule={ rule } /> ) }
      </div>
    </div>
  </aside>
);

const MobileCommunityInfo = () => (
  <div className="lg:hidden bg-white dark:bg-slate-900 rounded-xl shadow-md mb-6 px-4">
    <details className="group py-3">
      <summary className="flex justify-between items-center font-bold cursor-pointer list-none text-lg">
        Información de la Comunidad
        <IoChevronDown className="h-6 w-6 text-slate-500 transition-transform duration-300 group-open:rotate-180" />
      </summary>
      <div className="mt-4">
        <div className="flex justify-around my-4">
          <div className="text-center">
            <p className="text-xl font-bold">{ formatNumber( communityDetails.members ) }</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Miembros</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">{ formatNumber( communityDetails.online ) }</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">En Línea</p>
          </div>
        </div>
        <h4 className="font-bold mt-6 mb-2">Reglas</h4>
        <div>
          { communityDetails.rules.map( ( rule, index ) => <RuleItem key={ index } rule={ rule } /> ) }
        </div>
      </div>
    </details>
  </div>
);


// --- MAIN COMPONENT ---

interface Props {
  communitySlug: string;
}

export const CommunityContainer = ( { communitySlug }: Props ) => {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
      <CommunityHeader slug={ communitySlug } />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <MobileCommunityInfo />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12">
          <main className="lg:col-span-2 flex flex-col gap-6">
            { mockPosts.map( ( post ) => (
              <PostCard key={ post.id } post={ post } />
            ) ) }
          </main>
          <div className="hidden lg:block">
            <CommunityInfoPanel />
          </div>
        </div>
      </div>
    </div>
  );
};