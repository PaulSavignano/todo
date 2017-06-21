import React from 'react'

import AdminCardItem from '../components/AdminCardItem'

const AdminCardList = ({ section, cards, imageSpec }) => (
  cards.length < 1 ? null  :
  <div style={{ display: 'flex', flexFlow: 'row wrap', width: '100%' }}>
    {cards.map(card => (
      <AdminCardItem
        key={card._id}
        card={card}
        section={section}
        imageSpec={imageSpec}
      />
    ))}
  </div>
)

export default AdminCardList
