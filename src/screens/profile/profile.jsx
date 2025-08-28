import React from 'react';
import BackgroundImage from '../../assets/Background.png';

const Profile = () => {
  const containerStyle = {
    backgroundImage: `url(${BackgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: '100% 0',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  };

  return <div style={containerStyle} />;
};

export default Profile;