

interface ProfileBodyProps {
  slug: string;
}

export const ProfileBody = ( { slug }: ProfileBodyProps ) => {
  return (
    <div className="text-3xl text-center font-bold text-green-500 mt-10">
      Hola soy tu perfil, tu slug es: <span className="text-blue-400">{ slug }</span>
    </div>
  );
};
