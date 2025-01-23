import React from 'react'

interface Props {
  avatar: string,
}

const avatar = "/logo192.png"

const Avatar = ({avatar}: Props) => {
  return (
    <div><img className="w-8 h-8 rounded-full" src={avatar} alt="avatar"/></div>
  )
}

export default Avatar