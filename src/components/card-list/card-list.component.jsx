import Card from '../card/card.component'
import './card-list.styles.css'
const CardList = ({ monsters }) => {
  return (
    <div className='card-list'>{
      monsters.map(item => { 
        return (
          <Card key={item.id} item={item}/>
        )
      })
    }</div>
  )
}

export default CardList