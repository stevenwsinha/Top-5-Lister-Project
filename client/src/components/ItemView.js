

export default function ItemView(props){
    const {list} = props

    return (
        <div class="open-items-list">
            <div class="open-item"> 1. {list.items[0]} </div>
            <div class="open-item"> 2. {list.items[1]} </div>
            <div class="open-item"> 3. {list.items[2]} </div>
            <div class="open-item"> 4. {list.items[3]} </div>
            <div class="open-item"> 5. {list.items[4]} </div>
        </div>
    );
}