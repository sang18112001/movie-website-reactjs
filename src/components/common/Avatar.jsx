import React from 'react';

const Avatar = ({ avatarUrl, width, height }) => {
  const styleAvatar = {
    width: width,
    height: height,
    borderRadius: '50%',
    overflow: 'hidden',
  };
  return (
    <div className="avatar-image" style={styleAvatar}>
      <img src={avatarUrl} width="100%"></img>
    </div>
  );
};

export default Avatar;
