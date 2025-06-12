import { UserContent } from './UserContent';
import { UserCoverAndProfilePhotos } from './UserCoverAndProfilePhotos';


interface Props {
  username: string;
}

export const UserProfile = ( { username }: Props ) => {

  return (
    <div className="flex flex-col space-y-3 justify-center">

      <UserCoverAndProfilePhotos
        username={ username }
        avatarUrl="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        coverUrl="https://i.imgur.com/NJdFP2N.jpeg"
      />


      <UserContent />

    </div>
  );
}

