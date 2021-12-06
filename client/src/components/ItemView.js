import { useContext } from 'react'
import { GlobalStoreContext } from '../store'

export default function ItemView(props){
    const { store } = useContext(GlobalStoreContext);
    const {list} = props

    let item_text = [list.items[0], list.items[1], list.items[2], list.items[3], list.items[4]]
    let item_subscripts = ["", "", "", "", ""];
   
    if(store.loadType === 'community'){
        for(let i = 0; i < 5; i++){
            item_text[i] = list.items[i][0]
            item_subscripts[i] = "Votes: " + list.items[i][1]
        }
    }

    return (
        <div className="open-items-list">
            <div className="open-item"> 1. {item_text[0]} </div>
            <div className="open-item-subscript"> {item_subscripts[0]} </div>
            <div className="open-item"> 2. {item_text[1]} </div>
            <div className="open-item-subscript"> {item_subscripts[1]}  </div>
            <div className="open-item"> 3. {item_text[2]} </div>
            <div className="open-item-subscript"> {item_subscripts[2]}  </div>
            <div className="open-item"> 4. {item_text[3]} </div>
            <div className="open-item-subscript">  {item_subscripts[3]} </div>
            <div className="open-item"> 5. {item_text[4]} </div>
            <div className="open-item-subscript">  {item_subscripts[4]} </div>
        </div>
    );
}