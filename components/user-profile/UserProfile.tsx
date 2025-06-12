import { UserCoverAndProfilePhotos } from './UserCoverAndProfilePhotos';


interface Props {
  username: string;
}

export const UserProfile = ( { username }: Props ) => {

  return (
    <div>
      <UserCoverAndProfilePhotos
        username="abc123"
        avatarUrl="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        coverUrl="https://i.imgur.com/NJdFP2N.jpeg"
      />

      {/* { username } */ }
    </div>
  );
}

